"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCustomerDetails(userId: string) {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            include: {
                wallet: true,
                orders: {
                    select: {
                        id: true,
                        totalAmount: true, // Fixed from 'total'
                        status: true,
                        createdAt: true,
                        paymentStatus: true,
                        _count: { select: { items: true } } // Added count
                    },
                    orderBy: { createdAt: "desc" },
                    take: 5,
                },
                eventRegistrations: {
                    include: {
                        event: {
                            select: {
                                title: true,
                                startTime: true,
                                image: true,
                            }
                        }
                    },
                    orderBy: { registeredAt: "desc" },
                    take: 5,
                },
                receivedPoints: {
                    select: {
                        id: true,
                        amount: true,
                        reason: true,
                        description: true,
                        createdAt: true,
                        actor: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
        });

        if (!user) {
            return null;
        }

        // Aggregate Stats
        const orderStats = await db.order.aggregate({
            _count: { id: true },
            _sum: { totalAmount: true }, // Fixed from 'total'
            where: { userId },
        });

        return {
            ...user,
            totalSpent: Number(orderStats._sum.totalAmount) || 0,
            totalOrders: orderStats._count.id || 0,
            orders: user.orders.map(o => ({
                ...o,
                total: o.totalAmount, // Map back to 'total' for frontend compatibility if needed, or update frontend
                itemCount: o._count.items
            })),
            recentTransactions: user.receivedPoints.map(tx => ({
                id: tx.id,
                amount: Number(tx.amount),
                reason: tx.reason,
                description: tx.description,
                createdAt: tx.createdAt,
                user: { name: user.name, image: user.image },
                actor: tx.actor
            }))
        };
    } catch (error) {
        console.error("Error fetching customer details:", error);
        return null;
    }
}
