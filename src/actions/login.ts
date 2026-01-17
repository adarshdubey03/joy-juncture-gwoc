"use server";
import { revalidatePath } from "next/cache";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { sendVerificationSMS } from "@/lib/sms";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { checkRateLimit } from "@/lib/rate-limit";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    let email: string, password: string;

    try {
        // 1. IP Rate Limiting for Login
        // TODO: Use real IP in production (e.g., req.headers.get("x-forwarded-for"))
        const ip = "127.0.0.1";
        // Allow 5 attempts per 15 minutes (900 seconds)
        const isAllowed = await checkRateLimit(ip, "LOGIN_ATTEMPT", 5, 900);

        if (!isAllowed) {
            return { error: "Too many login attempts. Please try again later." };
        }

        const validatedFields = LoginSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        }

        email = validatedFields.data.email;
        password = validatedFields.data.password;

        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { phoneNumber: email }
                ]
            }
        });

        if (!existingUser || !existingUser.password) {
            return { error: "Invalid credentials!" }
        }

        if (!existingUser.emailVerified && !existingUser.phoneVerified) {
            // If NEITHER is verified
            if (!existingUser.emailVerified) {
                const verificationToken = await generateVerificationToken(existingUser.email, "email");
                await sendVerificationEmail(verificationToken.email!, verificationToken.token);
                return { success: "Email not verified. Sent new code!" };
            }

            // If logged in via phone but phone not verified?
            if (existingUser.phoneNumber === email && !existingUser.phoneVerified) {
                const verificationToken = await generateVerificationToken(existingUser.phoneNumber, "phone");
                await sendVerificationSMS(verificationToken.phone!, verificationToken.token);
                return { success: "Phone not verified. Sent new code!" };
            }
        }
    } catch (error) {
        console.error("LOGIN_DB_ERROR", error);
        return { error: "Something went wrong!" };
    }


    try {
        // Clear cache to ensure Navbar updates
        revalidatePath("/", "layout");

        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return { success: "Login successful!" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    console.log(`[LOGIN] CredentialsSignin error for ${email}`);
                    return { error: "Invalid credentials!" };
                default:
                    console.error("[LOGIN] AuthError:", error);
                    return { error: "Something went wrong!" };
            }
        }
        // NextJS redirects throw errors, so we must rethrow
        throw error;
    }
};