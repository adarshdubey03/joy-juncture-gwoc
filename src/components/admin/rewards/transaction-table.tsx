"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { PointTransactionReason } from "@/generated/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Transaction {
    id: string;
    amount: number | string;
    reason: PointTransactionReason;
    description: string | null;
    createdAt: Date | string;
    user: {
        name: string | null;
        image: string | null;
    };
    actor: {
        name: string | null;
    } | null;
}

interface TransactionTableProps {
    transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {

    const getReasonBadge = (reason: PointTransactionReason) => {
        switch (reason) {
            case "PRODUCT_PURCHASE":
            case "EVENT_ATTENDANCE":
            case "PUZZLE_COMPLETION":
                return <Badge variant="default" className="bg-green-100 text-green-800 border-none">Earned</Badge>;
            case "REDEMPTION":
                return <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-none">Redeemed</Badge>;
            case "REFUND":
                return <Badge variant="destructive" className="bg-red-100 text-red-800 border-none">Refund</Badge>;
            case "BONUS":
                return <Badge className="bg-purple-100 text-purple-800 border-none">Bonus</Badge>;
            default:
                return <Badge variant="outline">Adjustment</Badge>;
        }
    };

    return (
        <div className="rounded-3xl border-none shadow-xl bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                        <TableHead className="w-[180px]">Date</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Admin</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                No transactions found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        transactions.map((tx) => (
                            <TableRow key={tx.id} className="hover:bg-gray-50/50 border-gray-100">
                                <TableCell className="font-mono text-xs text-muted-foreground">
                                    {format(new Date(tx.createdAt), "MMM d, yyyy HH:mm")}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={tx.user.image || ""} />
                                            <AvatarFallback className="text-[10px]">{tx.user.name?.[0] || "?"}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium text-[#2E2A24]">{tx.user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {getReasonBadge(tx.reason)}
                                        <span className="text-xs text-muted-foreground capitalize">{tx.reason.replace(/_/g, " ").toLowerCase()}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={`font-bold ${Number(tx.amount) > 0 ? "text-green-600" : "text-red-600"}`}>
                                        {Number(tx.amount) > 0 ? "+" : ""}{Number(tx.amount)}
                                    </span>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate text-sm text-gray-500">
                                    {tx.description || "-"}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">
                                    {tx.actor?.name || "System"}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
