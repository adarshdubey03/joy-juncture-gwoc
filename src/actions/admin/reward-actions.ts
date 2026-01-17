"use server";

import { db } from "@/lib/db";
import { PointTransactionReason, Prisma } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export interface RewardStats {
    totalPointsIssued: number;
    totalPointsRedeemed: number;
    totalOutstanding: number;
    averageWalletBalance: number;
}

export interface TransactionFilter {
    search?: string;
    type?: PointTransactionReason[];
    userId?: string;
    page: number;
    limit: number;
}

export async function getRewardStats(): Promise<RewardStats> {
    try {
        // Calculate total outstanding points (sum of all wallets)
        const walletSum = await db.wallet.aggregate({
            _sum: {
                balance: true,
            },
        });

        // Calculate total points redeemd
        const redeemedSum = await db.pointTransaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                reason: PointTransactionReason.REDEMPTION,
            },
        });

        // Calculate total points issued (bonus, purchase, etc - excluding redemptions/refunds for simplicity or strictly positive flows)
        // For a simpler "Issued", we can sum positive transactions
        const issuedSum = await db.pointTransaction.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                amount: {
                    gt: 0,
                },
            },
        });

        const userCount = await db.wallet.count();

        const totalOutstanding = Number(walletSum._sum.balance) || 0;

        return {
            totalPointsIssued: Number(issuedSum._sum.amount) || 0,
            totalPointsRedeemed: Math.abs(Number(redeemedSum._sum.amount) || 0),
            totalOutstanding,
            averageWalletBalance: userCount > 0 ? totalOutstanding / userCount : 0,
        };
    } catch (error) {
        console.error("Error fetching reward stats:", error);
        // Return zeros if error
        return {
            totalPointsIssued: 0,
            totalPointsRedeemed: 0,
            totalOutstanding: 0,
            averageWalletBalance: 0,
        };
    }
}

export async function getTransactions(filter: TransactionFilter) {
    try {
        const where: Prisma.PointTransactionWhereInput = {};

        if (filter.search) {
            where.OR = [
                {
                    user: {
                        OR: [
                            { name: { contains: filter.search, mode: "insensitive" } },
                            { email: { contains: filter.search, mode: "insensitive" } },
                        ],
                    },
                },
                { description: { contains: filter.search, mode: "insensitive" } },
            ];
        }

        if (filter.type && filter.type.length > 0) {
            where.reason = {
                in: filter.type,
            };
        }

        if (filter.userId) {
            where.userId = filter.userId;
        }

        const [transactionsRaw, total] = await Promise.all([
            db.pointTransaction.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                    actor: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: (filter.page - 1) * filter.limit,
                take: filter.limit,
            }),
            db.pointTransaction.count({ where }),
        ]);

        const transactions = transactionsRaw.map((tx) => ({
            ...tx,
            amount: Number(tx.amount),
        }));

        return {
            transactions,
            pagination: {
                total,
                pages: Math.ceil(total / filter.limit),
                page: filter.page,
                limit: filter.limit,
            },
        };
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return {
            transactions: [],
            pagination: { total: 0, pages: 0, page: 1, limit: filter.limit }
        };
    }
}

export async function adjustUserPoints(
    userId: string,
    amount: number,
    reason: PointTransactionReason,
    description: string,
    adminId?: string
) {
    try {
        // Ensure wallet exists
        let wallet = await db.wallet.findUnique({
            where: { userId },
        });

        if (!wallet) {
            wallet = await db.wallet.create({
                data: { userId, balance: 0 },
            });
        }

        const balance = Number(wallet.balance);
        const newBalance = balance + amount;

        if (newBalance < 0) {
            return { success: false, error: "User does not have enough points for this deduction." };
        }

        // Transactional update
        await db.$transaction([
            db.wallet.update({
                where: { userId },
                data: { balance: { increment: amount } },
            }),
            db.pointTransaction.create({
                data: {
                    userId,
                    amount,
                    reason,
                    description,
                    actorId: adminId, // The admin performing the action
                },
            }),
        ]);

        revalidatePath("/admin/rewards");
        revalidatePath(`/admin/customers/${userId}`); // Revalidate customer profile if it exists

        return { success: true };
    } catch (error) {
        console.error("Error adjusting points:", error);
        return { success: false, error: "Failed to adjust points." };
    }
}
