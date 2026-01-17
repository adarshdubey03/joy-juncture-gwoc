"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PointTransactionReason } from "@/generated/prisma";
import { EventType } from "@/generated/prisma";
import Razorpay from "razorpay";
import crypto from "crypto";
import { sendTicketEmail } from "@/lib/mail";
import { sendTicketSMS } from "@/lib/sms";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function registerForEvent(eventId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const userId = session.user.id;

    try {
        const event = await db.event.findUnique({
            where: { id: eventId },
            include: { registrations: true } // Need to count
        });
        if (!event) return { error: "Event not found" };

        // 1. Status Check
        if (!event.isActive || event.isCancelled) {
            return { error: "Event is cancelled or inactive" };
        }
        if (!event.isRegistrationOpen) {
            return { error: "Registration is currently closed" };
        }

        // 2. Capacity Check
        if (event.capacity && event.registrations.length >= event.capacity) {
            return { error: "Event is full" };
        }

        const existing = await db.eventRegistration.findUnique({
            where: {
                userId_eventId: { userId, eventId }
            }
        });

        if (existing) {
            if (existing.paymentStatus === "PAID") return { error: "Already registered" };
            // If PENDING, might want to allow re-payment, but for now block
            return { error: "Registration pending payment" };
        }

        // 2. Paid Event Flow
        if (event.ticketPrice && Number(event.ticketPrice) > 0) {
            if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
                console.error("Razorpay keys missing");
                return { error: "Payment configuration missing" };
            }

            const options = {
                amount: Math.round(Number(event.ticketPrice) * 100), // paise
                currency: "INR",
                receipt: `rcpt_${userId.slice(-4)}_${Date.now()}`,
                notes: {
                    userId,
                    eventId,
                    type: "EVENT_REGISTRATION"
                }
            };

            const order = await instance.orders.create(options);

            // Create Pending Registration
            await db.eventRegistration.create({
                data: {
                    userId,
                    eventId,
                    paymentStatus: "PENDING",
                    ticketPrice: Number(event.ticketPrice), // Store expected price
                    razorpayOrderId: order.id,
                    // No ticket code yet
                }
            });

            return {
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                key: process.env.RAZORPAY_KEY_ID
            };
        }

        // 3. Free Event Flow
        const ticketCode = `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        await db.eventRegistration.create({
            data: {
                userId,
                eventId,
                paymentStatus: "PAID",
                ticketPrice: 0,
                ticketCode,
                // No payment details for free event
            }
        });

        revalidatePath("/profile");
        revalidatePath(`/events/${event.slug}`);
        return { success: "Registration successful", ticketCode };

    } catch (error) {
        console.error("EVENT_REGISTRATION_ERROR", error);
        return { error: "Failed to register" };
    }
}

export async function verifyEventPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
) {
    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return { error: "Invalid payment signature" };
        }

        const registration = await db.eventRegistration.findFirst({
            where: { razorpayOrderId: razorpay_order_id },
            include: { event: true, user: true }
        });

        if (!registration) return { error: "Registration not found" };

        const ticketCode = `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        await db.eventRegistration.update({
            where: { id: registration.id },
            data: {
                paymentStatus: "PAID",
                razorpayPaymentId: razorpay_payment_id,
                paymentSignature: razorpay_signature,
                ticketCode,
            }
        });

        // Send Notifications
        try {
            if (registration.user.email) {
                await sendTicketEmail(registration.user.email, registration.user.name || "Gamer", registration.event, ticketCode);
            }
            if (registration.user.phoneNumber) {
                await sendTicketSMS(registration.user.phoneNumber, registration.event.title, ticketCode);
            }
        } catch (e) {
            console.error("NOTIFICATION_ERROR", e);
        }

        revalidatePath("/profile");
        revalidatePath(`/events/${registration.event.slug}`);
        return { success: true, ticketCode };

    } catch (error) {
        console.error("VERIFY_PAYMENT_ERROR", error);
        return { error: "Payment verification failed" };
    }
}

// 3. Get Upcoming Events (Public)
export async function getUpcomingEvents() {
    try {
        console.log("DEBUG: Fetching events. Server Time:", new Date().toISOString());

        const events = await db.event.findMany({
            where: {
                isActive: true,
                // startTime: {
                //     gte: new Date(),
                // },
            },
            orderBy: {
                startTime: "asc",
            },
        });

        console.log("DEBUG: Found events:", events.length);

        const serializedEvents = events.map(event => ({
            ...event,
            pointReward: event.pointReward ? Number(event.pointReward) : null,
            ticketPrice: event.ticketPrice ? Number(event.ticketPrice) : null,
            earlyBirdPrice: event.earlyBirdPrice ? Number(event.earlyBirdPrice) : null,
        }));

        return { success: true, data: serializedEvents };
    } catch (error) {
        console.error("GET_UPCOMING_EVENTS_ERROR", error);
        return { error: "Failed to fetch events", data: [] };
    }
}
