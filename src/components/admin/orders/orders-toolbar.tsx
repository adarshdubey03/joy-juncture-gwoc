"use client";

import { useState } from "react";
import { Search, X, Filter, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    ORDER_STATUS_OPTIONS,
    PAYMENT_STATUS_OPTIONS,
    PAYMENT_METHOD_OPTIONS,
    DATE_RANGE_PRESETS,
} from "@/lib/order-constants";
import { OrderStatus } from "@/generated/prisma";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export interface OrderFiltersState {
    search: string;
    status: OrderStatus[];
    paymentStatus: string[];
    paymentMethod: string[];
    dateFrom?: Date;
    dateTo?: Date;
    amountMin?: number;
    amountMax?: number;
}

interface OrdersToolbarProps {
    filters: OrderFiltersState;
    onFiltersChange: (filters: OrderFiltersState) => void;
    totalResults: number;
}

export function OrdersToolbar({
    filters,
    onFiltersChange,
    totalResults,
}: OrdersToolbarProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const activeFiltersCount = [
        filters.status.length > 0,
        filters.paymentStatus.length > 0,
        filters.paymentMethod.length > 0,
        filters.dateFrom || filters.dateTo,
        filters.amountMin !== undefined || filters.amountMax !== undefined,
    ].filter(Boolean).length;

    const handleClearFilters = () => {
        onFiltersChange({
            search: "",
            status: [],
            paymentStatus: [],
            paymentMethod: [],
            dateFrom: undefined,
            dateTo: undefined,
            amountMin: undefined,
            amountMax: undefined,
        });
    };

    const toggleStatus = (status: OrderStatus) => {
        const newStatus = filters.status.includes(status)
            ? filters.status.filter((s) => s !== status)
            : [...filters.status, status];
        onFiltersChange({ ...filters, status: newStatus });
    };

    const togglePaymentStatus = (status: string) => {
        const newPaymentStatus = filters.paymentStatus.includes(status)
            ? filters.paymentStatus.filter((s) => s !== status)
            : [...filters.paymentStatus, status];
        onFiltersChange({ ...filters, paymentStatus: newPaymentStatus });
    };

    const applyDatePreset = (preset: typeof DATE_RANGE_PRESETS[number]) => {
        const { from, to } = preset.getValue();
        onFiltersChange({ ...filters, dateFrom: from, dateTo: to });
        setShowDatePicker(false);
    };

    return (
        <div className="space-y-4">
            {/* Search and Quick Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search orders, customers..."
                        value={filters.search}
                        onChange={(e) =>
                            onFiltersChange({ ...filters, search: e.target.value })
                        }
                        className="pl-10 pr-10"
                    />
                    {filters.search && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
                            onClick={() => onFiltersChange({ ...filters, search: "" })}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Filter Button */}
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge variant="secondary" className="ml-2 px-1.5 py-0">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96" align="end">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">Filters</h4>
                                    {activeFiltersCount > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleClearFilters}
                                        >
                                            Clear all
                                        </Button>
                                    )}
                                </div>

                                {/* Order Status */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Order Status
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {ORDER_STATUS_OPTIONS.map((option) => (
                                            <Badge
                                                key={option.value}
                                                variant={
                                                    filters.status.includes(option.value as OrderStatus)
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() => toggleStatus(option.value as OrderStatus)}
                                            >
                                                {option.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Status */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Payment Status
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {PAYMENT_STATUS_OPTIONS.map((option) => (
                                            <Badge
                                                key={option.value}
                                                variant={
                                                    filters.paymentStatus.includes(option.value)
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() => togglePaymentStatus(option.value)}
                                            >
                                                {option.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Date Range
                                    </label>
                                    <div className="space-y-2">
                                        <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {filters.dateFrom || filters.dateTo ? (
                                                        <>
                                                            {filters.dateFrom && format(filters.dateFrom, "MMM d, yyyy")}
                                                            {filters.dateFrom && filters.dateTo && " - "}
                                                            {filters.dateTo && format(filters.dateTo, "MMM d, yyyy")}
                                                        </>
                                                    ) : (
                                                        "Select date range"
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <div className="p-3 space-y-2 border-b">
                                                    {DATE_RANGE_PRESETS.map((preset) => (
                                                        <Button
                                                            key={preset.label}
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-full justify-start"
                                                            onClick={() => applyDatePreset(preset)}
                                                        >
                                                            {preset.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <Calendar
                                                    mode="range"
                                                    selected={{
                                                        from: filters.dateFrom,
                                                        to: filters.dateTo,
                                                    }}
                                                    onSelect={(range) => {
                                                        onFiltersChange({
                                                            ...filters,
                                                            dateFrom: range?.from,
                                                            dateTo: range?.to,
                                                        });
                                                    }}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {(filters.dateFrom || filters.dateTo) && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full"
                                                onClick={() =>
                                                    onFiltersChange({
                                                        ...filters,
                                                        dateFrom: undefined,
                                                        dateTo: undefined,
                                                    })
                                                }
                                            >
                                                Clear dates
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Amount Range */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Amount Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.amountMin || ""}
                                            onChange={(e) =>
                                                onFiltersChange({
                                                    ...filters,
                                                    amountMin: e.target.value ? Number(e.target.value) : undefined,
                                                })
                                            }
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.amountMax || ""}
                                            onChange={(e) =>
                                                onFiltersChange({
                                                    ...filters,
                                                    amountMax: e.target.value ? Number(e.target.value) : undefined,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Results count */}
                    <span className="text-sm text-muted-foreground">
                        {totalResults} {totalResults === 1 ? "result" : "results"}
                    </span>
                </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {filters.status.map((status) => (
                        <Badge key={status} variant="secondary" className="gap-1">
                            Status: {getStatusLabel(status)}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => toggleStatus(status)}
                            />
                        </Badge>
                    ))}
                    {filters.paymentStatus.map((status) => (
                        <Badge key={status} variant="secondary" className="gap-1">
                            Payment: {status}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => togglePaymentStatus(status)}
                            />
                        </Badge>
                    ))}
                    {(filters.dateFrom || filters.dateTo) && (
                        <Badge variant="secondary" className="gap-1">
                            Date: {filters.dateFrom && format(filters.dateFrom, "MMM d")}
                            {filters.dateFrom && filters.dateTo && " - "}
                            {filters.dateTo && format(filters.dateTo, "MMM d")}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() =>
                                    onFiltersChange({
                                        ...filters,
                                        dateFrom: undefined,
                                        dateTo: undefined,
                                    })
                                }
                            />
                        </Badge>
                    )}
                    {(filters.amountMin !== undefined || filters.amountMax !== undefined) && (
                        <Badge variant="secondary" className="gap-1">
                            Amount: ₹{filters.amountMin || 0} - ₹{filters.amountMax || "∞"}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() =>
                                    onFiltersChange({
                                        ...filters,
                                        amountMin: undefined,
                                        amountMax: undefined,
                                    })
                                }
                            />
                        </Badge>
                    )}
                    <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    );
}

function getStatusLabel(status: string): string {
    const option = ORDER_STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.label || status;
}
