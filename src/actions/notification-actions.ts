"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { sendEventUpdateEmail } from "@/lib/mail";
import { sendEventUpdateSMS } from "@/lib/sms";
import { UserRole } from "@/generated/prisma";

export async function notifyAttendees(eventId: string, message: string) {
    const session = await auth();
    // Only Admin or above can notify
    if (!session?.user?.id || session.user.role === "USER") {
        return { error: "Unauthorized" };
    }

    try {
        const event = await db.event.findUnique({
            where: { id: eventId },
            include: {
                registrations: {
                    include: {
                        user: true
                    }
                }
            }
        });

        if (!event) return { error: "Event not found" };

        const attendees = event.registrations.map(r => r.user);
        let count = 0;

        // Send in background (fire and forget for now, or batch)
        // For Vercel serverless, better to await or use a queue. We'll await for simplicity.
        const promises = attendees.map(async (user) => {
            if (user.email) {
                await sendEventUpdateEmail(user.email, user.name || "User", event.title, message);
            }
            if (user.phoneNumber) {
                await sendEventUpdateSMS(user.phoneNumber, event.title, message);
            }
            if (user.email || user.phoneNumber) count++;
        });

        await Promise.all(promises);

        return { success: `Notified ${count} attendees` };

    } catch (error) {
        console.error("NOTIFY_ATTENDEES_ERROR", error);
        return { error: "Failed to notify attendees" };
    }
}
