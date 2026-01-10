import { db } from "@/lib/db";

export const checkRateLimit = async (ip: string, action: string, limit: number, durationSeconds: number) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationSeconds * 1000);

    const record = await db.rateLimit.findUnique({
        where: { ip_action: { ip, action } },
    });

    if (record) {
        if (now > record.expiresAt) {
            // Expired, reset
            await db.rateLimit.update({
                where: { id: record.id },
                data: { count: 1, expiresAt }
            });
            return true;
        }

        if (record.count >= limit) {
            return false;
        }

        await db.rateLimit.update({
            where: { id: record.id },
            data: { count: record.count + 1 }
        });
        return true;
    } else {
        await db.rateLimit.create({
            data: { ip, action, count: 1, expiresAt }
        });
        return true;
    }
};
