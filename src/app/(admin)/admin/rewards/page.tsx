import { Suspense } from "react";
import { getRewardStats, getTransactions } from "@/actions/admin/reward-actions";
import { RewardStatsCards } from "@/components/admin/rewards/reward-stats";
import { TransactionTable } from "@/components/admin/rewards/transaction-table";
import { PointAdjustmentDialog } from "@/components/admin/rewards/point-adjustment-dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default async function RewardsPage({
    searchParams,
}: {
    searchParams: { page?: string; search?: string };
}) {
    const page = Number(searchParams.page) || 1;
    const search = searchParams.search || "";

    const stats = await getRewardStats();
    const { transactions, pagination } = await getTransactions({ page, limit: 20, search });

    return (
        <div className="space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#2E2A24]">Gamification & Rewards</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="hidden md:flex">
                        <Download className="mr-2 h-4 w-4" /> Export Log
                    </Button>
                    <PointAdjustmentDialog />
                </div>
            </div>

            {/* Stats Overview */}
            <RewardStatsCards stats={stats} />

            {/* Transactions Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#2E2A24]">Transaction History</h3>
                </div>

                <Suspense fallback={<div>Loading transactions...</div>}>
                    <TransactionTable transactions={transactions} />
                </Suspense>
            </div>
        </div>
    );
}
