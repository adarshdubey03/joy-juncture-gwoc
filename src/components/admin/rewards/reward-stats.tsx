"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, CreditCard, ArrowRightLeft, Wallet } from "lucide-react";
import { RewardStats } from "@/actions/admin/reward-actions";

export function RewardStatsCards({ stats }: { stats: RewardStats }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-3xl border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Outstanding</CardTitle>
                    <Wallet className="h-4 w-4 text-[#F4A300]" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#2E2A24]">{stats.totalOutstanding.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Points in user wallets</p>
                </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Issued</CardTitle>
                    <Coins className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#2E2A24]">{stats.totalPointsIssued.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Lifetime points distributed</p>
                </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Redeemed</CardTitle>
                    <CreditCard className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#2E2A24]">{stats.totalPointsRedeemed.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Lifetime points used</p>
                </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Avg Wallet Balance</CardTitle>
                    <ArrowRightLeft className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-[#2E2A24]">{Math.round(stats.averageWalletBalance).toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Points per user</p>
                </CardContent>
            </Card>
        </div>
    );
}
