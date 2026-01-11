"use client";

import { Users, UserCheck, CalendarClock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CustomerStats {
    totalCustomers: number;
    verifiedCustomers: number;
    activeThisMonth: number;
    totalPoints: number;
}

interface CustomerStatsCardsProps {
    stats: CustomerStats;
}

export function CustomerStatsCards({ stats }: CustomerStatsCardsProps) {
    const verificationRate = stats.totalCustomers > 0
        ? ((stats.verifiedCustomers / stats.totalCustomers) * 100).toFixed(1)
        : "0";

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Customers */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Customers
                            </p>
                            <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Verified Customers */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Verified
                            </p>
                            <p className="text-2xl font-bold">{stats.verifiedCustomers}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {verificationRate}% verified
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Active This Month */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                New This Month
                            </p>
                            <p className="text-2xl font-bold">{stats.activeThisMonth}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                            <CalendarClock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Total Points */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Points
                            </p>
                            <p className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                            <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
