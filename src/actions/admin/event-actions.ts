"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { UserRole, EventType } from "@/generated/prisma";
import { EventSchema } from "@/schemas";
import * as z from "zod";

const serializeEvent = (event: any) => {
    if (!event) return null;
    return {
        ...event,
        pointReward: event.pointReward ? Number(event.pointReward) : null,
        ticketPrice: event.ticketPrice ? Number(event.ticketPrice) : null,
        earlyBirdPrice: event.earlyBirdPrice ? Number(event.earlyBirdPrice) : null,
        // Also handle potential nested decimals if any, but main ones are these
    };
};

// Get all events with filters
export async function getEvents() {
    try {
        const events = await db.event.findMany({
            orderBy: { startTime: "desc" },
            include: {
                registrations: {
                    select: {
                        id: true,
                    }
                },
                createdBy: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            }
        });

        const serialized = events.map(serializeEvent);

        return { success: true, data: serialized };
    } catch (error) {
        console.error("GET_EVENTS_ERROR", error);
        return { success: false, error: "Failed to fetch events" };
    }
}

export async function getEvent(id: string) {
    try {
        const event = await db.event.findUnique({
            where: { id },
            include: {
                registrations: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                phoneNumber: true,
                            }
                        }
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });
        return { success: true, data: serializeEvent(event) };
    } catch (error) {
        console.error("GET_EVENT_ERROR", error);
        return { success: false, error: "Failed to fetch event" };
    }
}

export async function createEvent(values: z.infer<typeof EventSchema>) {
    const validatedFields = EventSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    const data = validatedFields.data;
    let slug = data.slug;
    if (!slug) {
        slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    try {
        const event = await db.event.create({
            data: {
                ...data,
                slug,
                createdById: session?.user?.id,
            },
        });

        revalidatePath("/admin/events");
        return { success: "Event created!", data: serializeEvent(event) };
    } catch (error) {
        console.error("CREATE_EVENT_ERROR", error);
        return { error: "Failed to create event" };
    }
}

export async function updateEvent(id: string, values: z.infer<typeof EventSchema>) {
    const validatedFields = EventSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    try {
        const event = await db.event.update({
            where: { id },
            data: validatedFields.data,
        });

        revalidatePath("/admin/events");
        revalidatePath(`/admin/events/${id}`);
        return { success: "Event updated!", data: serializeEvent(event) };
    } catch (error) {
        console.error("UPDATE_EVENT_ERROR", error);
        return { error: "Failed to update event" };
    }
}

export async function deleteEvent(id: string) {
    try {
        await db.event.delete({ where: { id } });
        revalidatePath("/admin/events");
        return { success: "Event deleted!" };
    } catch (error) {
        console.error("DELETE_EVENT_ERROR", error);
        return { error: "Failed to delete event" };
    }
}

export async function toggleEventStatus(id: string) {
    try {
        const event = await db.event.findUnique({ where: { id } });
        if (!event) return { error: "Event not found" };

        await db.event.update({
            where: { id },
            data: { isActive: !event.isActive }
        });

        revalidatePath("/admin/events");
        return { success: "Status updated!" };
    } catch (error) {
        console.error("UPDATE_EVENT_STATUS_ERROR", error);
        return { error: "Failed to update status" };
    }
}