"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { getOrders, OrderFilters as BackendFilters } from "@/actions/admin/order-actions";
import { OrdersToolbar, OrderFiltersState } from "@/components/admin/orders/orders-toolbar";
import { OrderStatsCards } from "@/components/admin/orders/order-stats-cards";
import { OrderStatusBadge } from "@/components/admin/orders/order-status-badge";
import { Loader2, ArrowUpDown } from "lucide-react";

function OrdersContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const [ordersData, setOrdersData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Initialize filters from URL params
    const [filters, setFilters] = useState<OrderFiltersState>({
        search: searchParams.get("search") || "",
        status: (searchParams.get("status")?.split(",").filter(Boolean) || []) as any[],
        paymentStatus: searchParams.get("paymentStatus")?.split(",").filter(Boolean) || [],
        paymentMethod: searchParams.get("paymentMethod")?.split(",").filter(Boolean) || [],
        dateFrom: searchParams.get("dateFrom") ? new Date(searchParams.get("dateFrom")!) : undefined,
        dateTo: searchParams.get("dateTo") ? new Date(searchParams.get("dateTo")!) : undefined,
        amountMin: searchParams.get("amountMin") ? Number(searchParams.get("amountMin")) : undefined,
        amountMax: searchParams.get("amountMax") ? Number(searchParams.get("amountMax")) : undefined,
    });

    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
    const [sortBy, setSortBy] = useState<"createdAt" | "totalAmount">("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    // Fetch orders whenever filters change
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const backendFilters: BackendFilters = {
                search: filters.search,
                status: filters.status as any[],
                paymentStatus: filters.paymentStatus,
                paymentMethod: filters.paymentMethod,
                dateFrom: filters.dateFrom,
                dateTo: filters.dateTo,
                amountMin: filters.amountMin,
                amountMax: filters.amountMax,
                page: currentPage,
                limit: 15,
                sortBy,
                sortOrder,
            };

            const data = await getOrders(backendFilters);
            setOrdersData(data);
            setLoading(false);
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchOrders();
        }, filters.search ? 300 : 0);

        return () => clearTimeout(timeoutId);
    }, [filters, currentPage, sortBy, sortOrder]);

    // Update URL params when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (filters.search) params.set("search", filters.search);
        if (filters.status.length > 0) params.set("status", filters.status.join(","));
        if (filters.paymentStatus.length > 0) params.set("paymentStatus", filters.paymentStatus.join(","));
        if (filters.paymentMethod.length > 0) params.set("paymentMethod", filters.paymentMethod.join(","));
        if (filters.dateFrom) params.set("dateFrom", filters.dateFrom.toISOString());
        if (filters.dateTo) params.set("dateTo", filters.dateTo.toISOString());
        if (filters.amountMin !== undefined) params.set("amountMin", filters.amountMin.toString());
        if (filters.amountMax !== undefined) params.set("amountMax", filters.amountMax.toString());
        if (currentPage > 1) params.set("page", currentPage.toString());

        router.replace(`/admin/orders?${params.toString()}`, { scroll: false });
    }, [filters, currentPage, router]);

    const toggleSort = (field: "createdAt" | "totalAmount") => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("desc");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            </div>

            {/* Stats Cards */}
            {ordersData?.stats && <OrderStatsCards stats={ordersData.stats} />}

            {/* Toolbar */}
            <OrdersToolbar
                filters={filters}
                onFiltersChange={setFilters}
                totalResults={ordersData?.pagination.total || 0}
            />

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="-ml-3 h-8"
                                                onClick={() => toggleSort("createdAt")}
                                            >
                                                Date
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="-ml-3 h-8"
                                                onClick={() => toggleSort("totalAmount")}
                                            >
                                                Total
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!ordersData?.orders || ordersData.orders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={8} className="text-center h-64 text-muted-foreground">
                                                No orders found. Try adjusting your filters.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        ordersData.orders.map((order: any) => (
                                            <TableRow key={order.id} className="hover:bg-muted/50">
                                                <TableCell className="font-mono text-xs font-medium">
                                                    #{order.id.substring(0, 8)}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{order.user.name || "Guest"}</div>
                                                        <div className="text-xs text-muted-foreground">{order.user.email}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {format(new Date(order.createdAt), "MMM d, yyyy")}
                                                    <div className="text-xs text-muted-foreground">
                                                        {format(new Date(order.createdAt), "h:mm a")}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm">{order.items.length} items</span>
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {formatCurrency(Number(order.totalAmount))}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div className="font-medium">{order.paymentMethod || "N/A"}</div>
                                                        <div className="text-xs text-muted-foreground">{order.paymentStatus || "PENDING"}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <OrderStatusBadge status={order.status} />
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

                            {/* Pagination */}
                            {ordersData?.pagination && ordersData.pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {((currentPage - 1) * 15) + 1} to{" "}
                                        {Math.min(currentPage * 15, ordersData.pagination.total)} of{" "}
                                        {ordersData.pagination.total} orders
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Previous
                                        </Button>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: Math.min(5, ordersData.pagination.totalPages) }, (_, i) => {
                                                const pageNum = i + 1;
                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        variant={currentPage === pageNum ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setCurrentPage(pageNum)}
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                );
                                            })}
                                            {ordersData.pagination.totalPages > 5 && (
                                                <span className="px-2 text-muted-foreground">...</span>
                                            )}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={currentPage === ordersData.pagination.totalPages}
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function OrdersPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        }>
            <OrdersContent />
        </Suspense>
    );
}
