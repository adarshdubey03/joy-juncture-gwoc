"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PointTransactionReason } from "@/generated/prisma";
import { EventType } from "@/generated/prisma";

export async function registerForEvent(eventId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const userId = session.user.id;

    try {
        const event = await db.event.findUnique({ where: { id: eventId } });
        if (!event) return { error: "Event not found" };

        const existing = await db.eventRegistration.findUnique({
            where: {
                userId_eventId: { userId, eventId }
            }
        });

        if (existing) return { error: "Already registered" };

        // Simple registration for now (skipping payment for free events)
        await db.eventRegistration.create({
            data: {
                userId,
                eventId,
                paymentStatus: "PAID", // Assume free or paid instantly for now
                ticketPrice: event.ticketPrice || 0,
            }
        });

        revalidatePath("/profile");
        revalidatePath(`/events/${event.slug}`);
        return { success: "Registration successful" };

    } catch (error) {
        console.error("EVENT_REGISTRATION_ERROR", error);
        return { error: "Failed to register" };
    }
}

// Admin Action: Mark Attendance & Award Points
export async function markEventAttendance(registrationId: string) {
    // Ideally check for Admin role here
    const session = await auth();
    // if (!session?.user?.role === "ADMIN") ...

    try {
        return await db.$transaction(async (tx) => {
            // 1. Get Registration with Event details
            const registration = await tx.eventRegistration.findUnique({
                where: { id: registrationId },
                include: { event: true }
            });

            if (!registration) return { error: "Registration not found" };
            if (registration.attended) return { error: "Already marked as attended" };

            // 2. Mark as Attended
            await tx.eventRegistration.update({
                where: { id: registrationId },
                data: {
                    attended: true,
                    attendedAt: new Date()
                }
            });

            // 3. Create EventAttendance Record
            const attendance = await tx.eventAttendance.create({
                data: { registrationId }
            });

            // 4. Calculate Points Reward
            // Logic: 
            // - If event has specific `pointReward`, use that.
            // - Else if it's a paid event, give 10% of ticket price.
            // - Else default to 50 points.

            let pointsToAward = 50;
            if (registration.event.pointReward) {
                pointsToAward = Number(registration.event.pointReward);
            } else if (Number(registration.event.ticketPrice) > 0) {
                pointsToAward = Math.floor(Number(registration.event.ticketPrice) * 0.10);
            }

            if (pointsToAward > 0) {
                // 5. Update Wallet
                await tx.wallet.upsert({
                    where: { userId: registration.userId },
                    create: { userId: registration.userId, balance: pointsToAward },
                    update: { balance: { increment: pointsToAward } }
                });

                // 6. Create Point Transaction
                await tx.pointTransaction.create({
                    data: {
                        userId: registration.userId,
                        amount: pointsToAward,
                        reason: PointTransactionReason.EVENT_ATTENDANCE,
                        eventAttendanceId: attendance.id,
                        description: `Attended ${registration.event.title}`
                    }
                });
            }

            return { success: true, pointsAwarded: pointsToAward };
        });

    } catch (error) {
        console.error("MARK_ATTENDANCE_ERROR", error);
        return { error: "Failed to mark attendance" };
    }
}
