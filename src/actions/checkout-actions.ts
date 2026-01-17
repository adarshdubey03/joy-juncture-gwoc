"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PointTransactionReason } from "@/generated/prisma";
import Razorpay from "razorpay";
import crypto from "crypto";

interface CartItemInput {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export async function placeOrder(cartItems: CartItemInput[], totalAmount: number) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "You must be logged in to place an order" };
    }

    const userId = session.user.id;

    // Validate Products Exist
    const productIds = cartItems.map((item) => item.id);
    const validProducts = await db.product.findMany({
        where: {
            id: { in: productIds },
            isActive: true
        },
        select: { id: true, name: true }
    });

    if (validProducts.length !== productIds.length) {
        const validIds = new Set(validProducts.map(p => p.id));
        const invalidItems = cartItems.filter((item) => !validIds.has(item.id));
        const invalidNames = invalidItems.map((item) => item.name).join(", ");
        return { error: `Some items are no longer available: ${invalidNames}. Please remove them from your cart.` };
    }

    try {
        // 1. Create Razorpay Instance
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // 2. Create Razorpay Order
        const payment_capture = 1;
        const currency = "INR";
        const options = {
            amount: Math.round(totalAmount * 100), // Amount in paise
            currency,
            receipt: `order_${Date.now()}`,
            payment_capture,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        if (!razorpayOrder) return { error: "Failed to create Razorpay order" };

        // 3. Create Database Order (PENDING)
        const order = await db.order.create({
            data: {
                userId,
                subtotal: totalAmount,
                totalAmount: totalAmount,
                taxAmount: 0,
                shippingCost: 0,

                status: "PENDING",
                paymentStatus: "PENDING",
                paymentMethod: "UPI",
                razorpayOrderId: razorpayOrder.id as string,

                // Dummy Shipping Data (Snapshot)
                shippingName: session.user?.name || "Valued Customer",
                shippingPhone: (session.user as any)?.phoneNumber || "9999999999",
                shippingStreet: " Joy Juncture Lane",
                shippingCity: "Happiness City",
                shippingState: "Delhi",
                shippingPostalCode: "110001",
                shippingCountry: "India",

                items: {
                    create: cartItems.map((item) => ({
                        productId: item.id,
                        productName: item.name,
                        productImage: item.image,
                        unitPrice: item.price,
                        quantity: item.quantity,
                        subtotal: item.price * item.quantity
                    }))
                }
            }
        });

        return {
            success: true,
            orderId: order.id,
            razorpayOrderId: razorpayOrder.id,
            amount: options.amount,
            currency: options.currency,
            key: process.env.RAZORPAY_KEY_ID
        };

    } catch (error: unknown) {
        console.error("PLACE_ORDER_ERROR", error);
        const message = error instanceof Error ? error.message : "Failed to place order";
        return { error: message || "Failed to place order. Please try again." };
    }
}

export async function verifyOrderPayment(
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

        // Find Order
        const order = await db.order.findFirst({
            where: { razorpayOrderId: razorpay_order_id },
            include: { user: true }
        });

        if (!order) return { error: "Order not found" };

        // Update Order Status & Add Points (Transaction)
        const result = await db.$transaction(async (tx) => {
            // 1. Update Order
            const updatedOrder = await tx.order.update({
                where: { id: order.id },
                data: {
                    // status: "PROCESSING", // Kept as PENDING (Order Placed)
                    paymentStatus: "PAID",
                    razorpayPaymentId: razorpay_payment_id,
                    paymentSignature: razorpay_signature,
                    paidAt: new Date(),
                }
            });

            // 2. Gamification: Calculate Points (1 point per ₹10)
            const pointsEarned = Math.floor(Number(order.totalAmount) / 10);

            if (pointsEarned > 0) {
                await tx.wallet.upsert({
                    where: { userId: order.userId },
                    create: { userId: order.userId, balance: pointsEarned },
                    update: { balance: { increment: pointsEarned } }
                });

                await tx.pointTransaction.create({
                    data: {
                        userId: order.userId,
                        amount: pointsEarned,
                        reason: PointTransactionReason.PRODUCT_PURCHASE,
                        orderId: order.id,
                        description: `Earned for Order #${order.id.slice(-6).toUpperCase()}`
                    }
                });
            }
            return { success: true, pointsEarned };
        });

        revalidatePath("/profile");
        revalidatePath("/shop");
        return result;

    } catch (error) {
        console.error("VERIFY_ORDER_ERROR", error);
        return { error: "Payment verification failed" };
    }
}
