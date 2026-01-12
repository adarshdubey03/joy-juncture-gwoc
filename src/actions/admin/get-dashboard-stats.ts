"use server";

import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { OrderStatus, EnquiryStatus } from "@/generated/prisma";

export async function getDashboardStats() {
    try {
        // 1. Total Revenue (Sum of COMPLETED orders)
        // If no orders, aggregate might return null, handle safely.
        const revenueAgg = await db.order.aggregate({
            _sum: {
                totalAmount: true,
            },
            where: {
                status: OrderStatus.DELIVERED
            }
        });
        const totalRevenue = revenueAgg._sum.totalAmount ? Number(revenueAgg._sum.totalAmount) : 0;

        // 2. Active Users (Total count for now, since we don't track 'lastLogin' strictly yet except failed/lockout)
        // Could infer 'Active' from orders or just total users. Let's use Total Users.
        const activeUsers = await db.user.count();

        // 3. Sales Count (Total Completed Orders)
        const salesCount = await db.order.count({
            where: { status: OrderStatus.DELIVERED }
        });

        // 4. Recent Sales (Feed)
        const recentSalesRaw = await db.order.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            where: { status: OrderStatus.DELIVERED },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    }
                }
            }
        });


        // Format recent sales
        const recentSales = recentSalesRaw.map(order => ({
            id: order.id,
            name: order.user.name || "Unknown",
            email: order.user.email,
            amount: formatCurrency(Number(order.totalAmount)),
            image: order.user.image,
        }));

        // 5. Points Distributed (Total points given out, excluding redemptions)
        const pointsDistributedAgg = await db.pointTransaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                // Assuming positive amounts are distributed, or reason is NOT REDEMPTION
                amount: { gt: 0 }
            }
        });
        const pointsDistributed = pointsDistributedAgg._sum.amount ? Number(pointsDistributedAgg._sum.amount) : 0;

        // 6. Upcoming Events (Start time in future)
        const upcomingEventsCount = await db.event.count({
            where: {
                startTime: { gt: new Date() }
            }
        });

        // 7. Pending Actions (New Enquiries)
        // 7. Pending Actions (New Enquiries)
        const pendingEnquiriesCount = await db.experienceEnquiry.count({
            where: { status: EnquiryStatus.NEW }
        });

        // 8. Recent Activities (Merge Orders and Registrations might be too complex for simple feed, stick to Orders+Registrations separate or just Orders for now to match "Recent Activity Feed")
        // Let's stick to Recent Orders for the main feed, maybe add Recent Registrations if UI asks.

        return {
            totalRevenue: formatCurrency(totalRevenue),
            activeUsers: activeUsers.toString(),
            salesCount: salesCount.toString(),
            recentSales,
            pointsDistributed: pointsDistributed.toString(),
            upcomingEventsCount: upcomingEventsCount.toString(),
            pendingEnquiriesCount: pendingEnquiriesCount.toString(),
        };

    } catch (error) {
        console.error("[ADMIN_STATS_ERROR]", error);
        return {
            totalRevenue: "₹0",
            activeUsers: "0",
            salesCount: "0",
            recentSales: [],
            pointsDistributed: "0",
            upcomingEventsCount: "0",
            pendingEnquiriesCount: "0",
        };
    }
}
