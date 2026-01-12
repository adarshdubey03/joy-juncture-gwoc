"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache"; // Removed redirect from here, will handle in client/page
import { PointTransactionReason } from "@/generated/prisma";

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
            isActive: true // Ensure they are active too
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
        const result = await db.$transaction(async (tx) => {

            // A. Create Order with COMPLETED status
            const order = await tx.order.create({
                data: {
                    userId,
                    subtotal: totalAmount,
                    totalAmount: totalAmount,
                    taxAmount: 0,
                    shippingCost: 0,

                    // Mark as completed immediately for demo
                    status: "DELIVERED",
                    paymentStatus: "PAID",
                    paymentMethod: "COD",
                    paidAt: new Date(),
                    actualDelivery: new Date(),

                    // Dummy Shipping Data (Required by Schema)
                    shippingName: session.user?.name || "Valued Customer",
                    shippingPhone: "9999999999",
                    shippingStreet: " Joy Juncture Lane",
                    shippingCity: "Happiness City",
                    shippingState: "Delhi",
                    shippingPostalCode: "110001",
                    shippingCountry: "India",

                    items: {
                        create: cartItems.map((item) => ({
                            productId: item.id,
                            productName: item.name,
                            productImage: item.image, // Save snapshot of image
                            unitPrice: item.price,
                            quantity: item.quantity,
                            subtotal: item.price * item.quantity
                        }))
                    }
                }
            });

            // B. Gamification: Calculate Points (1 point per ₹10)
            const pointsEarned = Math.floor(totalAmount / 10);

            // C. Update Wallet & Create Transaction
            if (pointsEarned > 0) {
                // Upsert wallet to ensure it exists
                await tx.wallet.upsert({
                    where: { userId },
                    create: { userId, balance: pointsEarned },
                    update: { balance: { increment: pointsEarned } }
                });

                // Create Point Transaction
                await tx.pointTransaction.create({
                    data: {
                        userId,
                        amount: pointsEarned,
                        reason: PointTransactionReason.PRODUCT_PURCHASE,
                        orderId: order.id,
                        description: `Earned for Order #${order.id.slice(-6).toUpperCase()}`
                    }
                });
            }

            return { orderId: order.id, pointsEarned };
        });

        revalidatePath("/profile");
        revalidatePath("/shop");

        return { success: true, orderId: result.orderId, pointsEarned: result.pointsEarned };

    } catch (error: unknown) {
        console.error("PLACE_ORDER_ERROR", error);
        const message = error instanceof Error ? error.message : "Failed to place order";
        return { error: message || "Failed to place order. Please try again." };
    }
}
