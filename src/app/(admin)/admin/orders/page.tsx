
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getOrders } from "@/actions/admin/order-actions";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OrderStatus } from "@/generated/prisma/client";
import { format } from "date-fns";

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; status?: string; page?: string }>
}) {
    const params = await searchParams;
    const query = params.query;
    const status = params.status as OrderStatus | undefined;
    const page = Number(params.page) || 1;

    const { orders, total, totalPages, error } = await getOrders({ query, status, page });

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case "PENDING": return "secondary";
            case "PROCESSING": return "default"; // blueish
            case "SHIPPED": return "default"; // or different color if available
            case "DELIVERED": return "outline"; // green? default variants limited
            case "CANCELLED": return "destructive";
            case "REFUNDED": return "destructive";
            default: return "secondary";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                {/* <Button asChild>
                    <Link href="/admin/orders/new">
                        <Plus className="mr-2 h-4 w-4" /> Create Order
                    </Link>
                </Button> */}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!orders || orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium text-xs">
                                            {order.id.substring(0, 8)}...
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{order.user.name || "Guest"}</div>
                                            <div className="text-xs text-muted-foreground">{order.user.email}</div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(order.createdAt), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            {order.items.length} items
                                        </TableCell>
                                        <TableCell>
                                            {formatCurrency(order.totalAmount)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusColor(order.status)}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/admin/orders/${order.id}`}>View</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
