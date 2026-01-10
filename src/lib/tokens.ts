import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// ... existing exports ...

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: { token }
        });
        return passwordResetToken;
    } catch {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email }
        });
        return passwordResetToken;
    } catch {
        return null;
    }
}

export const getPasswordResetTokenByPhone = async (phone: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { phone }
        });
        return passwordResetToken;
    } catch {
        return null;
    }
}

export const generatePasswordResetToken = async (identifier: string, type: "email" | "phone" = "email") => {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    // Expiry: 10 minutes (600 seconds)
    const expires = new Date(new Date().getTime() + 600 * 1000);

    if (type === "email") {
        const existingToken = await getPasswordResetTokenByEmail(identifier);

        if (existingToken) {
            // Rate Limit: 60 seconds
            const now = new Date();
            const createdAt = (existingToken as any).createdAt ? new Date((existingToken as any).createdAt) : null;
            if (createdAt) {
                const timeDiff = now.getTime() - createdAt.getTime();
                if (timeDiff < 60 * 1000) {
                    return { rateLimit: true };
                }
            }
            await db.passwordResetToken.delete({ where: { id: existingToken.id } });
        }

        const passwordResetToken = await db.passwordResetToken.create({
            data: {
                email: identifier,
                token,
                expires
            }
        });
        return passwordResetToken;
    } else {
        const existingToken = await getPasswordResetTokenByPhone(identifier);

        if (existingToken) {
            // Rate Limit: 60 seconds
            const now = new Date();
            const createdAt = (existingToken as any).createdAt ? new Date((existingToken as any).createdAt) : null;
            if (createdAt) {
                const timeDiff = now.getTime() - createdAt.getTime();
                if (timeDiff < 60 * 1000) {
                    return { rateLimit: true };
                }
            }
            await db.passwordResetToken.delete({ where: { id: existingToken.id } });
        }

        const passwordResetToken = await db.passwordResetToken.create({
            data: {
                phone: identifier,
                token,
                expires
            }
        });
        return passwordResetToken;
    }
}



export const getVerificationTokenByToken = async (
    token: string
) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token }
        });

        return verificationToken;
    } catch {
        return null;
    }
}

export const getVerificationTokenByEmail = async (
    email: string
) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email }
        });

        return verificationToken;
    } catch {
        return null;
    }
}

export const getVerificationTokenByPhone = async (
    phone: string
) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { phone }
        });

        return verificationToken;
    } catch {
        return null;
    }
}

// Now generic for email or phone
export const generateVerificationToken = async (identifier: string, type: "email" | "phone" = "email") => {
    // For phone OTA, we might want numeric 6-digit code instead of UUID?
    // User requested "enter otp", implying 6 digits usually. uuid is too long to type.
    // Let's use 6 digit random number for both or just phone?
    // Let's use 6 digit for phone, uuid for link (email). 
    // BUT user said "enter otp to verify email as well". So email should also be OTP?
    // "after registering page should show a way to enter otp to verify email as well as phone number"
    // So YES, EMAIL OTP too.

    // const token = uuidv4(); 

    // Generate 6 digit OTP
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    if (type === "email") {
        const existingToken = await getVerificationTokenByEmail(identifier);
        if (existingToken) {
            await db.verificationToken.delete({ where: { id: existingToken.id } });
        }
        const verificationToken = await db.verificationToken.create({
            data: {
                email: identifier,
                token,
                expires,
            }
        });
        return verificationToken;
    } else {
        const existingToken = await getVerificationTokenByPhone(identifier);
        if (existingToken) {
            await db.verificationToken.delete({ where: { id: existingToken.id } });
        }
        const verificationToken = await db.verificationToken.create({
            data: {
                phone: identifier,
                token,
                expires,
            }
        });
        return verificationToken;
    }
};
