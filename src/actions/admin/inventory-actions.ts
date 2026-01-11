"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function reserveInventory(orderId: string) {
    const session = await auth();
    const userId = session?.user?.id || "system";

    try {
        const order = await db.order.findUnique({
            where: { id: orderId },
            include: { items: true }
        });

        if (!order) return { error: "Order not found" };
        if (order.inventoryReservedAt) return { error: "Inventory already reserved" };

        await db.$transaction(async (tx) => {
            // 1. Mark order as reserved
            await tx.order.update({
                where: { id: orderId },
                data: {
                    inventoryReservedAt: new Date(),
                    inventoryReleasedAt: null
                }
            });

            // 2. Adjust stock for each item
            for (const item of order.items) {
                const product = await tx.product.findUnique({ where: { id: item.productId } });
                if (!product) continue; // Should not happen ideally

                const newStock = product.stockQuantity - item.quantity;

                // Construct reason
                const reason = `Order Reservation #${orderId.slice(-6)}`;

                // Update Product
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stockQuantity: newStock }
                });

                // Create Log
                await tx.inventoryLog.create({
                    data: {
                        productId: item.productId,
                        change: -item.quantity,
                        newStock: newStock,
                        reason: reason,
                        userId: userId
                    }
                });
            }
        });

        return { success: "Inventory reserved successfully" };
    } catch (error) {
        console.error("RESERVE_INVENTORY_ERROR", error);
        return { error: "Failed to reserve inventory" };
    }
}

export async function releaseInventory(orderId: string) {
    const session = await auth();
    const userId = session?.user?.id || "system";

    try {
        const order = await db.order.findUnique({
            where: { id: orderId },
            include: { items: true }
        });

        if (!order) return { error: "Order not found" };
        if (order.inventoryReleasedAt) return { error: "Inventory already released" };
        if (!order.inventoryReservedAt) return { error: "Inventory was never reserved" };

        await db.$transaction(async (tx) => {
            // 1. Mark order as released
            await tx.order.update({
                where: { id: orderId },
                data: {
                    inventoryReleasedAt: new Date(),
                    inventoryReservedAt: null
                }
            });

            // 2. Return stock for each item
            for (const item of order.items) {
                const product = await tx.product.findUnique({ where: { id: item.productId } });
                if (!product) continue;

                const newStock = product.stockQuantity + item.quantity;
                const reason = `Order Release #${orderId.slice(-6)}`;

                // Update Product
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stockQuantity: newStock }
                });

                // Create Log
                await tx.inventoryLog.create({
                    data: {
                        productId: item.productId,
                        change: item.quantity,
                        newStock: newStock,
                        reason: reason,
                        userId: userId
                    }
                });
            }
        });

        return { success: "Inventory released successfully" };
    } catch (error) {
        console.error("RELEASE_INVENTORY_ERROR", error);
        return { error: "Failed to release inventory" };
    }
}
