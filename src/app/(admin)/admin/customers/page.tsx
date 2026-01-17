"use client";

import { useEffect, useState, Suspense } from "react";
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
import { getCustomers, CustomerFilters as BackendFilters } from "@/actions/admin/customer-actions";
import { CustomersToolbar, CustomerFiltersState } from "@/components/admin/customers/customers-toolbar";
import { CustomerStatsCards } from "@/components/admin/customers/customer-stats-cards";
import { CustomerStatusBadge } from "@/components/admin/customers/customer-status-badge";
import { getUserRoleLabel } from "@/lib/customer-constants";
import { Loader2, ArrowUpDown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function CustomersContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [customersData, setCustomersData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Initialize filters from URL params
    const [filters, setFilters] = useState<CustomerFiltersState>({
        search: searchParams.get("search") || "",
        role: (searchParams.get("role")?.split(",").filter(Boolean) || []) as any[],
        verified: searchParams.get("verified") ? searchParams.get("verified") === "true" : undefined,
        dateFrom: searchParams.get("dateFrom") ? new Date(searchParams.get("dateFrom")!) : undefined,
        dateTo: searchParams.get("dateTo") ? new Date(searchParams.get("dateTo")!) : undefined,
    });

    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
    const [sortBy, setSortBy] = useState<"createdAt" | "name" | "email">("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    // Fetch customers whenever filters change
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const backendFilters: BackendFilters = {
                    search: filters.search,
                    role: filters.role as any[],
                    verified: filters.verified,
                    dateFrom: filters.dateFrom,
                    dateTo: filters.dateTo,
                    page: currentPage,
                    limit: 15,
                    sortBy,
                    sortOrder,
                };

                const data = await getCustomers(backendFilters);
                if (!data) {
                    console.log("No data found");
                }
                setCustomersData(data);
            }
            catch (error) {
                console.log("Error fetching customers", error);
            }
            setLoading(false);
        };

        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchCustomers();
        }, filters.search ? 300 : 0);

        return () => clearTimeout(timeoutId);
    }, [filters, currentPage, sortBy, sortOrder]);

    // Update URL params when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (filters.search) params.set("search", filters.search);
        if (filters.role.length > 0) params.set("role", filters.role.join(","));
        if (filters.verified !== undefined) params.set("verified", filters.verified.toString());
        if (filters.dateFrom) params.set("dateFrom", filters.dateFrom.toISOString());
        if (filters.dateTo) params.set("dateTo", filters.dateTo.toISOString());
        if (currentPage > 1) params.set("page", currentPage.toString());

        router.replace(`/admin/customers?${params.toString()}`, { scroll: false });
    }, [filters, currentPage, router]);

    const toggleSort = (field: "createdAt" | "name" | "email") => {
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
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
            </div>

            {/* Stats Cards */}
            {customersData?.stats && <CustomerStatsCards stats={customersData.stats} />}

            {/* Toolbar */}
            <CustomersToolbar
                filters={filters}
                onFiltersChange={setFilters}
                totalResults={customersData?.pagination.total || 0}
            />

            {/* Customers Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Customers</CardTitle>
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
                                        <TableHead>Customer ID</TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="-ml-3 h-8"
                                                onClick={() => toggleSort("name")}
                                            >
                                                Name
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="-ml-3 h-8"
                                                onClick={() => toggleSort("email")}
                                            >
                                                Email
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="-ml-3 h-8"
                                                onClick={() => toggleSort("createdAt")}
                                            >
                                                Registered
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Orders</TableHead>
                                        <TableHead>Total Spent</TableHead>
                                        <TableHead>Points</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!customersData?.customers || customersData.customers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={10} className="text-center h-64 text-muted-foreground">
                                                No customers found. Try adjusting your filters.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        customersData.customers.map((customer: any) => (
                                            <TableRow key={customer.id} className="hover:bg-muted/50">
                                                <TableCell className="font-mono text-xs font-medium">
                                                    #{customer.id.substring(0, 8)}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{customer.name || "N/A"}</div>
                                                        <Badge variant="outline" className="text-xs mt-1">
                                                            {getUserRoleLabel(customer.role)}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {customer.email}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {customer.phoneNumber || "N/A"}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {format(new Date(customer.createdAt), "MMM d, yyyy")}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm font-medium">{customer.orderCount}</span>
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {formatCurrency(customer.totalSpent)}
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm font-medium">{Number(customer.points).toLocaleString()}</span>
                                                </TableCell>
                                                <TableCell>
                                                    <CustomerStatusBadge
                                                        emailVerified={customer.emailVerified}
                                                        isActive={customer.isActive}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={`/admin/customers/${customer.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {customersData?.pagination && customersData.pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {((currentPage - 1) * 15) + 1} to{" "}
                                        {Math.min(currentPage * 15, customersData.pagination.total)} of{" "}
                                        {customersData.pagination.total} customers
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
                                            {Array.from({ length: Math.min(5, customersData.pagination.totalPages) }, (_, i) => {
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
                                            {customersData.pagination.totalPages > 5 && (
                                                <span className="px-2 text-muted-foreground">...</span>
                                            )}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={currentPage === customersData.pagination.totalPages}
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

export default function CustomersPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        }>
            <CustomersContent />
        </Suspense>
    );
}
