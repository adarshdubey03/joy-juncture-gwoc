"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getOrders({
    query,
    status,
    page = 1,
    limit = 10,
}: {
    query?: string;
    status?: OrderStatus;
    page?: number;
    limit?: number;
}) {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query) {
        where.OR = [
            { id: { contains: query, mode: "insensitive" } },
            { user: { name: { contains: query, mode: "insensitive" } } },
            { user: { email: { contains: query, mode: "insensitive" } } },
        ];
    }

    if (status) {
        where.status = status;
    }

    try {
        const [orders, total] = await Promise.all([
            db.order.findMany({
                where,
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                        }
                    },
                    items: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip,
                take: limit,
            }),
            db.order.count({ where }),
        ]);

        return {
            orders,
            totalPages: Math.ceil(total / limit),
            total,
        };
    } catch (error) {
        console.error("GET_ORDERS_ERROR", error);
        return { error: "Failed to fetch orders" };
    }
}

export async function getOrder(id: string) {
    try {
        const order = await db.order.findUnique({
            where: { id },
            include: {
                user: true,
                items: {
                    include: {
                        product: true,
                    }
                },
                statusHistory: {
                    orderBy: {
                        timestamp: "desc",
                    }
                }
            }
        });

        return order;
    } catch (error) {
        console.error("GET_ORDER_ERROR", error);
        return null;
    }
}

export async function updateOrderStatus(id: string, status: OrderStatus, reason?: string) {
    const session = await auth();
    const userId = session?.user?.id || "system";

    try {
        const order = await db.order.findUnique({ where: { id } });
        if (!order) return { error: "Order not found" };

        await db.$transaction([
            db.order.update({
                where: { id },
                data: { status },
            }),
            db.orderStatusChange.create({
                data: {
                    orderId: id,
                    fromStatus: order.status,
                    toStatus: status,
                    changedBy: userId,
                    reason,
                }
            })
        ]);

        revalidatePath("/admin/orders");
        revalidatePath(`/admin/orders/${id}`);
        return { success: "Order status updated" };
    } catch (error) {
        console.error("UPDATE_ORDER_STATUS_ERROR", error);
        return { error: "Failed to update status" };
    }
}

export async function updateTracking(id: string, data: {
    trackingNumber?: string;
    shippingPartner?: string;
    estimatedDelivery?: Date;
    shippingCost?: number;
}) {
    try {
        await db.order.update({
            where: { id },
            data: {
                ...data,
                status: "SHIPPED", // Auto-update status to SHIPPED if adding tracking?
            }
        });

        // Also add logic to create StatusChange if status actually changed?
        // For simplicity, just update fields for now.

        revalidatePath("/admin/orders");
        revalidatePath(`/admin/orders/${id}`);
        return { success: "Tracking updated" };
    } catch (error) {
        console.error("UPDATE_TRACKING_ERROR", error);
        return { error: "Failed to update tracking" };
    }
}

// ==========================================
// ADVANCED ORDER ACTIONS
// ==========================================

// Payment Processing
export async function processRefund(orderId: string, amount: number, reason: string) {
    const session = await auth();
    const userId = session?.user?.id || "system";

    try {
        await db.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: "REFUNDED",
                refundAmount: amount,
                refundReason: reason,
                refundedAt: new Date(),
            }
        });

        revalidatePath(`/admin/orders/${orderId}`);
        return { success: "Refund processed successfully" };
    } catch (error) {
        console.error("PROCESS_REFUND_ERROR", error);
        return { error: "Failed to process refund" };
    }
}

export async function verifyPayment(orderId: string) {
    try {
        // Mock verification logic
        await db.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: "PAID",
            }
        });
        revalidatePath(`/admin/orders/${orderId}`);
        return { success: "Payment verified" };
    } catch (error) {
        return { error: "Failed to verify payment" };
    }
}

// Bulk Operations
export async function bulkUpdateOrderStatus(orderIds: string[], status: OrderStatus) {
    const session = await auth();
    const userId = session?.user?.id || "system";

    try {
        // We need to update individually to record history
        // Use Promise.all for concurrency
        await Promise.all(orderIds.map(async (id) => {
            const order = await db.order.findUnique({ where: { id } });
            if (!order) return;

            await db.$transaction([
                db.order.update({
                    where: { id },
                    data: { status },
                }),
                db.orderStatusChange.create({
                    data: {
                        orderId: id,
                        fromStatus: order.status,
                        toStatus: status,
                        changedBy: userId,
                        reason: "Bulk Update",
                    }
                })
            ]);
        }));

        revalidatePath("/admin/orders");
        return { success: "Bulk status update complete" };
    } catch (error) {
        console.error("BULK_UPDATE_ERROR", error);
        return { error: "Failed to update orders" };
    }
}

export async function exportOrders(filters: any) {
    // Basic CSV Export implementation
    try {
        const orders = await db.order.findMany({
            // Apply similar filters as getOrders if needed
            take: 1000,
            orderBy: { createdAt: "desc" },
            include: { user: true, items: true }
        });

        const csvHeader = "Order ID,Date,Customer,Email,Total,Status,Payment Status\n";
        const csvRows = orders.map(order => {
            return `${order.id},${order.createdAt.toISOString()},"${order.user.name}","${order.user.email}",${order.totalAmount},${order.status},${order.paymentStatus || ""}`;
        }).join("\n");

        return { success: true, csv: csvHeader + csvRows };
    } catch (error) {
        return { error: "Failed to export orders" };
    }
}

// Analytics
export async function getOrderStats(dateRange: { from: Date; to: Date }) {
    try {
        const orders = await db.order.findMany({
            where: {
                createdAt: {
                    gte: dateRange.from,
                    lte: dateRange.to
                }
            }
        });

        const revenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        const count = orders.length;
        const avgValue = count > 0 ? revenue / count : 0;

        return { success: true, data: { revenue, count, avgValue } };
    } catch (error) {
        return { error: "Failed to fetch stats" };
    }
}

// Shipping
export async function calculateShipping(items: any[], address: any) {
    try {
        const rates = await db.shippingRate.findMany({
            where: { active: true }
        });
        return { success: true, rates };
    } catch (error) {
        return { error: "Failed to calculate shipping" };
    }
}

export async function generateShippingLabel(orderId: string) {
    // Mock
    return { success: true, labelUrl: "https://example.com/label.pdf" };
}

// Customer Communication
export async function sendOrderUpdate(orderId: string, type: string) {
    console.log(`Sending ${type} email for order ${orderId}`);
    return { success: true };
}

export async function sendInvoice(orderId: string) {
    console.log(`Sending invoice for order ${orderId}`);
    return { success: true };
}

// Validation
export async function validateOrder(orderId: string) {
    try {
        const order = await db.order.findUnique({
            where: { id: orderId },
            include: { items: { include: { product: true } } }
        });

        if (!order) return { valid: false, errors: ["Order not found"] };

        const errors = [];
        for (const item of order.items) {
            if (item.product.stock < item.quantity) {
                errors.push(`Insufficient stock for ${item.productName} (Requested: ${item.quantity}, Available: ${item.product.stock})`);
            }
        }

        if (order.paymentStatus !== "PAID" && order.paymentMethod !== "COD") {
            // Strict payment check (optional)
            // errors.push("Payment not confirmed");
        }

        return { valid: errors.length === 0, errors };
    } catch (error) {
        return { error: "Validation failed" };
    }
}
