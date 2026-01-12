"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail, getUserByPhone } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { sendVerificationSMS } from "@/lib/sms";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    try {
        const validatedFields = ResetSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid input!" };
        }

        const { email } = validatedFields.data;
        // Basic detection: if it contains @ it is email, else phone
        const isEmail = email.includes("@");

        if (isEmail) {
            const existingUser = await getUserByEmail(email);

            // Prevent Account Enumeration: Return success even if user not found
            if (!existingUser) {
                return { success: "Reset email sent!" };
            }

            const passwordResetToken = await generatePasswordResetToken(email, "email");
            if (!passwordResetToken) return { error: "Something went wrong!" };
            if ('rateLimit' in passwordResetToken) {
                return { error: "Please wait before resending." };
            }

            await sendPasswordResetEmail(passwordResetToken.email!, passwordResetToken.token);
            return { success: "Reset email sent!" };
        } else {
            // Assume phone
            // Normalize phone if needed, but for now rely on what user typed matches DB or rigorous check later
            const existingUser = await getUserByPhone(email); // Reusing 'email' field variable which holds input

            // Prevent Account Enumeration
            if (!existingUser) {
                return { success: "OTP sent to phone!" };
            }

            const passwordResetToken = await generatePasswordResetToken(email, "phone");
            if (!passwordResetToken) return { error: "Something went wrong!" };
            if ('rateLimit' in passwordResetToken) {
                return { error: "Please wait before resending." };
            }

            await sendVerificationSMS(passwordResetToken.phone!, passwordResetToken.token);
            return { success: "OTP sent to phone!" };
        }
    } catch (error) {
        console.error("RESET_ERROR", error);
        return { error: "Something went wrong!" };
    }
}
