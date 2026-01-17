import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { sendTicketEmail } from "@/lib/mail";
import { sendTicketSMS } from "@/lib/sms";

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
            console.error("RAZORPAY_WEBHOOK_SECRET is not set");
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
        }

        const event = JSON.parse(body);

        if (event.event === "payment.captured" || event.event === "order.paid") {
            const payment = event.payload.payment.entity;
            const orderId = payment.order_id;
            // Notes usually come in `payment.notes`, but can be nested or missing depending on how it was created
            // Since we store orderId in DB, we can lookup by that

            // 1. Try to find by Order ID first
            let registration = await db.eventRegistration.findFirst({
                where: { razorpayOrderId: orderId },
                include: { user: true, event: true }
            });

            if (registration) {
                if (registration.paymentStatus !== "PAID") {
                    const ticketCode = `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

                    await db.eventRegistration.update({
                        where: { id: registration.id },
                        data: {
                            paymentStatus: "PAID",
                            razorpayPaymentId: payment.id,
                            ticketCode,
                            // TicketPrice is already set during creation
                        }
                    });

                    // Send Notifications
                    if (registration.user.email) {
                        await sendTicketEmail(registration.user.email, registration.user.name || "User", registration.event, ticketCode);
                    }
                    if (registration.user.phoneNumber) {
                        await sendTicketSMS(registration.user.phoneNumber, registration.event.title, ticketCode);
                    }
                }
                return NextResponse.json({ status: "ok" });
            }

            // Fallback: Check if we have userId/eventId in notes (Legacy/Direct)
            const notes = payment.notes;
            const userId = notes?.userId;
            const eventId = notes?.eventId;

            if (userId && eventId) {
                // ... (Existing logic for creating new if not exists, but we are moving away from this)
                // Leaving existing logic for backward compatibility or direct webhook hits without pre-creation

                // Check if already registered
                const existing = await db.eventRegistration.findUnique({
                    where: { userId_eventId: { userId, eventId } }
                });

                if (!existing) {
                    const ticketCode = `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

                    const newReg = await db.eventRegistration.create({
                        data: {
                            userId,
                            eventId,
                            paymentStatus: "PAID",
                            ticketPrice: payment.amount / 100,
                            razorpayOrderId: orderId,
                            razorpayPaymentId: payment.id,
                            ticketCode,
                        },
                        include: { user: true, event: true }
                    });
                    if (newReg.user.email) {
                        await sendTicketEmail(newReg.user.email, newReg.user.name || "User", newReg.event, ticketCode);
                    }
                }
            }
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("WEBHOOK_ERROR", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
