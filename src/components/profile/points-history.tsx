import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface PointTransaction {
    id: string;
    amount: number; // Decimal in DB, but passed as number here for display
    reason: string;
    createdAt: Date;
    description?: string | null;
}

interface PointsHistoryProps {
    transactions: PointTransaction[];
}

export function PointsHistory({ transactions }: PointsHistoryProps) {
    if (transactions.length === 0) {
        return (
            <div className="text-center py-8 bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200">
                <p className="text-neutral-500 font-medium italic">
                    No transactions yet. Start earning points!
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-neutral-100">
                        <TableHead className="w-[120px] text-neutral-400 font-bold uppercase tracking-wider text-[11px]">Date</TableHead>
                        <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-[11px]">Activity</TableHead>
                        <TableHead className="text-right text-neutral-400 font-bold uppercase tracking-wider text-[11px]">Points</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((tx) => {
                        const isPositive = tx.amount > 0;
                        return (
                            <TableRow key={tx.id} className="hover:bg-neutral-50 border-neutral-100 group">
                                <TableCell className="font-semibold text-xs text-neutral-500">
                                    {format(new Date(tx.createdAt), "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-sm text-neutral-900 capitalize group-hover:text-black transition-colors">
                                            {tx.reason.replace(/_/g, " ").toLowerCase()}
                                        </span>
                                        {tx.description && (
                                            <span className="text-xs text-neutral-400 max-w-[200px] truncate">
                                                {tx.description}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className={`flex items-center justify-end gap-1 font-black ${isPositive ? "text-green-600 bg-green-50 px-2 py-1 rounded-lg inline-flex" : "text-red-500"}`}>
                                        {isPositive ? "+" : ""}{tx.amount}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
