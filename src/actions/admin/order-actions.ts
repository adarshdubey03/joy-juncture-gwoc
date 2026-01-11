"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// Advanced filter types
export type OrderFilters = {
    search?: string;
    status?: OrderStatus[];
    paymentStatus?: string[];
    paymentMethod?: string[];
    dateFrom?: Date;
    dateTo?: Date;
    amountMin?: number;
    amountMax?: number;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'totalAmount' | 'status';
    sortOrder?: 'asc' | 'desc';
};

export type OrdersResponse = {
    orders: any[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    stats: {
        totalOrders: number;
        totalRevenue: number;
        averageOrderValue: number;
        statusBreakdown: Record<string, number>;
    };
    error?: string;
};

export async function getOrders(filters: OrderFilters = {}): Promise<OrdersResponse> {
    const {
        search,
        status,
        paymentStatus,
        paymentMethod,
        dateFrom,
        dateTo,
        amountMin,
        amountMax,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc'
    } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    // Search across multiple fields
    if (search) {
        where.OR = [
            { id: { contains: search, mode: "insensitive" } },
            { user: { name: { contains: search, mode: "insensitive" } } },
            { user: { email: { contains: search, mode: "insensitive" } } },
            { shippingName: { contains: search, mode: "insensitive" } },
            { trackingNumber: { contains: search, mode: "insensitive" } },
        ];
    }

    // Multi-status filter
    if (status && status.length > 0) {
        where.status = { in: status };
    }

    // Payment filters
    if (paymentStatus && paymentStatus.length > 0) {
        where.paymentStatus = { in: paymentStatus };
    }

    if (paymentMethod && paymentMethod.length > 0) {
        where.paymentMethod = { in: paymentMethod };
    }

    // Date range filter
    if (dateFrom || dateTo) {
        where.createdAt = {};
        if (dateFrom) {
            where.createdAt.gte = dateFrom;
        }
        if (dateTo) {
            // Add 1 day to include the entire end date
            const endDate = new Date(dateTo);
            endDate.setHours(23, 59, 59, 999);
            where.createdAt.lte = endDate;
        }
    }

    // Amount range filter
    if (amountMin !== undefined || amountMax !== undefined) {
        where.totalAmount = {};
        if (amountMin !== undefined) {
            where.totalAmount.gte = amountMin;
        }
        if (amountMax !== undefined) {
            where.totalAmount.lte = amountMax;
        }
    }

    try {
        // Parallel queries for performance
        const [ordersRaw, total, stats, statusCounts] = await Promise.all([
            // Get filtered orders
            db.order.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phoneNumber: true,
                        }
                    },
                    items: {
                        select: {
                            id: true,
                            productName: true,
                            quantity: true,
                            unitPrice: true,
                        }
                    },
                },
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip,
                take: limit,
            }),

            // Get total count
            db.order.count({ where }),

            // Get analytics
            db.order.aggregate({
                where,
                _count: true,
                _sum: {
                    totalAmount: true,
                },
                _avg: {
                    totalAmount: true,
                },
            }),

            // Calculate status breakdown concurrently
            db.order.groupBy({
                by: ['status'],
                where,
                _count: true,
            })
        ]);

        // Serialize Decimal to Number for client safety
        const orders = ordersRaw.map(order => ({
            ...order,
            subtotal: Number(order.subtotal),
            discount: Number(order.discount),
            taxAmount: Number(order.taxAmount),
            shippingCost: Number(order.shippingCost),
            totalAmount: Number(order.totalAmount),
            refundAmount: order.refundAmount ? Number(order.refundAmount) : null,
            items: order.items.map(item => ({
                ...item,
                unitPrice: Number(item.unitPrice),
            }))
        }));

        const statusBreakdown = statusCounts.reduce((acc, item) => {
            acc[item.status] = item._count;
            return acc;
        }, {} as Record<string, number>);

        return {
            orders,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            stats: {
                totalOrders: stats._count || 0,
                totalRevenue: stats._sum.totalAmount ? Number(stats._sum.totalAmount) : 0,
                averageOrderValue: stats._avg.totalAmount ? Number(stats._avg.totalAmount) : 0,
                statusBreakdown,
            },
        };
    } catch (error) {
        console.error("GET_ORDERS_ERROR", error);
        return {
            orders: [],
            pagination: { total: 0, page, limit, totalPages: 0 },
            stats: { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0, statusBreakdown: {} },
            error: "Failed to fetch orders"
        };
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
                    },
                    include: {
                        changedBy: true
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
                    changedById: userId,
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
                status: OrderStatus.SHIPPED, // Auto-update status to SHIPPED if adding tracking
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
                        changedById: userId,
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

        const revenue = orders.reduce((acc, order) => acc + Number(order.totalAmount), 0);
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
            where: { isActive: true }
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
            if (item.product.stockQuantity < item.quantity) {
                errors.push(`Insufficient stock for ${item.productName} (Requested: ${item.quantity}, Available: ${item.product.stockQuantity})`);
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
