"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db"
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { sendVerificationSMS } from "@/lib/sms";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { email: email },
                { phoneNumber: email } // 'email' field in schema holds identifier
            ]
        }
    });

    if (!existingUser || !existingUser.password) {
        return { error: "Invalid credentials!" }
    }

    if (!existingUser.emailVerified && !existingUser.phoneVerified) {
        // If NEITHER is verified, we should probably prompt verification.
        // User said "verify both... independentaly".
        // If existingUser.emailVerified is false, send email token?
        // If existingUser.phoneVerified is false, send phone token?

        // For now, let's keep it simple: strict verification required for at least one?
        // Or strict for email? 
        // "after this otp verification , user should login imidiately"

        if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email, "email");
            await sendVerificationEmail(verificationToken.email!, verificationToken.token);
            return { success: "Email not verified. Sent new code!" };
        }

        // If logged in via phone but phone not verified?
        if (existingUser.phoneNumber === email && !existingUser.phoneVerified) {
            // Logic to send phone OTP
            const verificationToken = await generateVerificationToken(existingUser.phoneNumber, "phone");
            await sendVerificationSMS(verificationToken.phone!, verificationToken.token);
            return { success: "Phone not verified. Sent new code!" };
        }
    }


    try {

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        console.log(`[LOGIN] Expected redirect did not throw (unlikely for signIn)`);
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