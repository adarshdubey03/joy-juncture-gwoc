"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createReview(eventId: string, rating: number, comment: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        // Verify user attended the event (optional: or just registered)
        const registration = await db.eventRegistration.findUnique({
            where: {
                userId_eventId: {
                    userId: session.user.id,
                    eventId
                }
            }
        });

        if (!registration) {
            return { error: "You must be registered for this event to leave a review." };
        }

        /* Optional: Check if event is actually past
        const event = await db.event.findUnique({ where: { id: eventId } });
        if (event && event.endTime && new Date(event.endTime) > new Date()) {
             // return { error: "You can only review past events." };
        }
        */

        await db.eventReview.create({
            data: {
                userId: session.user.id,
                eventId,
                rating,
                comment,
            }
        });

        revalidatePath(`/events/${eventId}`); // Or revalidate relevant paths
        return { success: "Review submitted!" };

    } catch (error) {
        console.error("Review error:", error);
        return { error: "Failed to submit review." };
    }
}

export async function getEventReviews(eventId: string) {
    try {
        const reviews = await db.eventReview.findMany({
            where: {
                eventId,
                isPublic: true // Filtering only public
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return { data: reviews };
    } catch (error) {
        return { error: "Failed to fetch reviews" };
    }
}
