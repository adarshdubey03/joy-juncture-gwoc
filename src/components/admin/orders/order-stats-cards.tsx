"use client";

import { TrendingUp, TrendingDown, DollarSign, Package, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface OrderStats {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    statusBreakdown: Record<string, number>;
}

interface OrderStatsCardsProps {
    stats: OrderStats;
}

export function OrderStatsCards({ stats }: OrderStatsCardsProps) {
    const pendingOrders = stats.statusBreakdown.PENDING || 0;
    const delivered = stats.statusBreakdown.DELIVERED || 0;

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Orders */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Orders
                            </p>
                            <p className="text-2xl font-bold">{stats.totalOrders}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Total Revenue */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Revenue
                            </p>
                            <p className="text-2xl font-bold">
                                {formatCurrency(stats.totalRevenue)}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Average Order Value */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Avg. Order Value
                            </p>
                            <p className="text-2xl font-bold">
                                {formatCurrency(stats.averageOrderValue)}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pending Orders */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Pending Orders
                            </p>
                            <p className="text-2xl font-bold">{pendingOrders}</p>
                            {delivered > 0 && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    {delivered} delivered
                                </p>
                            )}
                        </div>
                        <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
