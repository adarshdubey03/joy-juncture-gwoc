"use server";

import { db } from "@/lib/db";
import { UserRole } from "@/generated/prisma";
import { auth } from "@/auth";

// Filter types
export type CustomerFilters = {
    search?: string;
    role?: UserRole[];
    verified?: boolean;
    active?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
    pointsMin?: number;
    pointsMax?: number;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'name' | 'email';
    sortOrder?: 'asc' | 'desc';
};

export type CustomersResponse = {
    customers: any[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    stats: {
        totalCustomers: number;
        verifiedCustomers: number;
        activeThisMonth: number;
        totalPoints: number;
    };
    error?: string;
};

// Authorization check
async function checkAdminAuth() {
    const session = await auth();
    if (
        !session?.user ||
        (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.SUPER_ADMIN)
    ) {
        throw new Error("Unauthorized access");
    }
    return session.user;
}

export async function getCustomers(filters: CustomerFilters = {}): Promise<CustomersResponse> {
    try {
        // Check authorization
        await checkAdminAuth();

        const {
            search,
            role,
            verified,
            active,
            dateFrom,
            dateTo,
            pointsMin,
            pointsMax,
            page = 1,
            limit = 15,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = filters;

        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = {};

        // Search
        if (search) {
            where.OR = [
                { id: { contains: search, mode: "insensitive" } },
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { phoneNumber: { contains: search, mode: "insensitive" } },
            ];
        }

        // Role filter
        if (role && role.length > 0) {
            where.role = { in: role };
        }

        // Verified filter
        if (verified !== undefined) {
            if (verified) {
                where.emailVerified = { not: null };
            } else {
                where.emailVerified = null;
            }
        }

        // Active customers filter (based on having orders)
        if (active !== undefined) {
            where.orders = active ? { some: {} } : { none: {} };
        }

        // Date range
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) {
                where.createdAt.gte = dateFrom;
            }
            if (dateTo) {
                const endDate = new Date(dateTo);
                endDate.setHours(23, 59, 59, 999);
                where.createdAt.lte = endDate;
            }
        }

        // Points range filter (based on total received points)
        if (pointsMin !== undefined || pointsMax !== undefined) {
            // Optimize: Use DB-level aggregation with HAVING clause instead of fetching all users
            const groupedPoints = await db.pointTransaction.groupBy({
                by: ["userId"],
                _sum: {
                    amount: true
                },
                having: {
                    amount: {
                        _sum: {
                            gte: pointsMin,
                            lte: pointsMax
                        }
                    }
                }
            });

            const allowedIds = groupedPoints.map(p => p.userId);

            // If we have other id filters (like from search), ensuring we intersect
            if (where.id) {
                // If existing id filter is complex, this might overwrite. 
                // Checks if where.id is just string or filter object.
                // For simplicity in this common case, we'll try to use AND if already exists, else set it.
                // However, standard prisma 'in' optimization is easiest:
                const existingIds = where.id.in;
                if (existingIds) {
                    where.id = { in: allowedIds.filter(id => existingIds.includes(id)) };
                } else {
                    where.id = { in: allowedIds };
                }
            } else {
                where.id = { in: allowedIds };
            }
        }

        try {
            // Parallel queries
            const [customers, total, activeThisMonth] = await Promise.all([
                // Get customers
                db.user.findMany({
                    where,
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phoneNumber: true,
                        emailVerified: true,
                        phoneVerified: true,
                        role: true,
                        createdAt: true,
                        _count: {
                            select: {
                                orders: true,
                            }
                        },
                        orders: {
                            // Limit payload size - maybe we don't need to fetch ALL orders if just calculating total spent?
                            // But for exact calculation we do. Let's keep it but be aware.
                            select: {
                                totalAmount: true,
                            }
                        },
                        receivedPoints: {
                            select: {
                                amount: true,
                            }
                        }
                    },
                    orderBy: {
                        [sortBy]: sortOrder,
                    },
                    skip,
                    take: limit,
                }),

                // Total count (used for pagination AND stats)
                db.user.count({ where }),

                // Active this month
                db.user.count({
                    where: {
                        ...where,
                        createdAt: {
                            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                        }
                    }
                })
            ]);

            // Calculate verified count
            const verifiedCount = await db.user.count({
                where: {
                    ...where,
                    emailVerified: { not: null }
                }
            });

            // Calculate total points - optimization: only sum if needed or cached?
            // For now, let's keep it simply but avoid full table scan if where matches nothing
            const pointsResult = await db.pointTransaction.aggregate({
                _sum: {
                    amount: true,
                }
                // Note: ideally we'd filter this too, but summing points for filtered users is complex without a join.
                // We'll leave this as "Global Total Points" for now as per likely UI intent.
            });

            // Transform customers to include computed fields
            const customersWithSpent = customers.map((customer: any) => ({
                ...customer,
                orderCount: customer._count.orders,
                totalSpent: customer.orders.reduce((sum: number, order: any) => sum + Number(order.totalAmount), 0),
                points: customer.receivedPoints.reduce((sum: number, point: any) => sum + Number(point.amount), 0),
                isActive: true, // Default to true since schema doesn't have this field
                _count: undefined, // Remove after using
                orders: undefined, // Remove raw orders
                receivedPoints: undefined, // Remove raw points
            }));

            return {
                customers: customersWithSpent,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
                stats: {
                    totalCustomers: total,
                    verifiedCustomers: verifiedCount,
                    activeThisMonth,
                    totalPoints: Number(pointsResult._sum.amount || 0),
                },
            };
        } catch (error) {
            console.error("GET_CUSTOMERS_ERROR", error);
            return {
                customers: [],
                pagination: { total: 0, page, limit, totalPages: 0 },
                stats: { totalCustomers: 0, verifiedCustomers: 0, activeThisMonth: 0, totalPoints: 0 },
                error: "Failed to fetch customers"
            };
        }
    } catch (authError) {
        return {
            customers: [],
            pagination: { total: 0, page: 1, limit: 15, totalPages: 0 },
            stats: { totalCustomers: 0, verifiedCustomers: 0, activeThisMonth: 0, totalPoints: 0 },
            error: "Unauthorized"
        };
    }
}

export async function getCustomer(id: string) {
    try {
        await checkAdminAuth();

        const customer = await db.user.findUnique({
            where: { id },
            include: {
                orders: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        createdAt: true,
                        status: true,
                        totalAmount: true,
                    }
                },
                wallet: true,
                receivedPoints: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        return customer;
    } catch (error) {
        console.error("GET_CUSTOMER_ERROR", error);
        return null;
    }
}
