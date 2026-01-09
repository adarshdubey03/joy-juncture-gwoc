"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/lib/tokens";

export const verify = async (token: string, type: "email" | "phone") => {
    // Determine which token we are looking for.
    // Since our DB schema has separate verification tokens but we used `getVerificationTokenByToken` which checks the global `token` field (unique),
    // we can just find the token.

    // However, our `generateVerificationToken` logic created a token with either `email` or `phone` set.
    // The `token` string itself is unique.

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    // Validate type match
    if (type === "email" && !existingToken.email) {
        return { error: "Invalid token type (expected email token)" };
    }
    if (type === "phone" && !existingToken.phone) {
        return { error: "Invalid token type (expected phone token)" };
    }

    const unverifiedField = type === "email" ? "email" : "phoneNumber";
    const identifier = type === "email" ? existingToken.email : existingToken.phone;

    if (!identifier) return { error: "Invalid token data" };

    const existingUser = await db.user.findFirst({
        where: { [unverifiedField]: identifier }
    });

    if (!existingUser) {
        return { error: "User does not exist!" };
    }

    // Update User
    if (type === "email") {
        await db.user.update({
            where: { id: existingUser.id },
            data: {
                emailVerified: new Date(),
                email: existingToken.email!, // updates email if changed (usual next-auth flow)
            }
        });
    } else {
        await db.user.update({
            where: { id: existingUser.id },
            data: {
                phoneVerified: new Date(),
                phoneNumber: existingToken.phone!,
            }
        });
    }

    await db.verificationToken.delete({
        where: { id: existingToken.id }
    });

    return { success: `${type === "email" ? "Email" : "Phone"} verified!` };
};
