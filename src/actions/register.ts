"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

import { sendVerificationSMS } from "@/lib/sms";

import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/ip";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    try {
        // 1. IP Rate Limiting
        const ip = await getClientIp();
        const isAllowed = await checkRateLimit(ip, "REGISTER_ATTEMPT", 50, 3600); // 50 attempts per hour per IP
        if (!isAllowed) return { error: "Too many registration attempts. Please try again later." };

        const validatedFields = RegisterSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        }

        const { email, password, name, phoneNumber } = validatedFields.data;

        // Check if email already exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "Email already in use!" };
        }

        // Check if phone already exists
        const existingPhone = await db.user.findUnique({
            where: { phoneNumber },
        });

        if (existingPhone) {
            return { error: "Phone number already exist. Please log in." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                name,
                email,
                phoneNumber,
                password: hashedPassword,
            },
        });

        const emailToken = await generateVerificationToken(email, "email");
        const phoneToken = await generateVerificationToken(phoneNumber, "phone");

        await sendVerificationEmail(emailToken.email!, emailToken.token);
        await sendVerificationSMS(phoneToken.phone!, phoneToken.token);

        return { success: "Confirmation codes sent!", redirect: true };
    } catch (error) {
        console.error("REGISTER_ERROR", error);
        return { error: `Something went wrong: ${(error as Error).message}` };
    }
};