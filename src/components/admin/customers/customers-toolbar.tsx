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
import { Badge } from "@/components/ui/badge";
import { USER_ROLE_OPTIONS } from "@/lib/customer-constants";
import { DATE_RANGE_PRESETS } from "@/lib/order-constants";
import { UserRole } from "@/generated/prisma";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export interface CustomerFiltersState {
    search: string;
    role: UserRole[];
    verified?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
}

interface CustomersToolbarProps {
    filters: CustomerFiltersState;
    onFiltersChange: (filters: CustomerFiltersState) => void;
    totalResults: number;
}

export function CustomersToolbar({
    filters,
    onFiltersChange,
    totalResults,
}: CustomersToolbarProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const activeFiltersCount = [
        filters.role.length > 0,
        filters.verified !== undefined,
        filters.dateFrom || filters.dateTo,
    ].filter(Boolean).length;

    const handleClearFilters = () => {
        onFiltersChange({
            search: "",
            role: [],
            verified: undefined,
            dateFrom: undefined,
            dateTo: undefined,
        });
    };

    const toggleRole = (role: UserRole) => {
        const newRoles = filters.role.includes(role)
            ? filters.role.filter((r) => r !== role)
            : [...filters.role, role];
        onFiltersChange({ ...filters, role: newRoles });
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
                        placeholder="Search customers..."
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

                                {/* User Role */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        User Role
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {USER_ROLE_OPTIONS.map((option) => (
                                            <Badge
                                                key={option.value}
                                                variant={
                                                    filters.role.includes(option.value as UserRole)
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="cursor-pointer"
                                                onClick={() => toggleRole(option.value as UserRole)}
                                            >
                                                {option.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Verification Status */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Verification Status
                                    </label>
                                    <div className="flex gap-2">
                                        <Badge
                                            variant={filters.verified === true ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                onFiltersChange({
                                                    ...filters,
                                                    verified: filters.verified === true ? undefined : true,
                                                })
                                            }
                                        >
                                            Verified
                                        </Badge>
                                        <Badge
                                            variant={filters.verified === false ? "default" : "outline"}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                onFiltersChange({
                                                    ...filters,
                                                    verified: filters.verified === false ? undefined : false,
                                                })
                                            }
                                        >
                                            Unverified
                                        </Badge>
                                    </div>
                                </div>



                                {/* Registration Date */}
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Registration Date
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
                                                    onSelect={(range: any) => {
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


                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Results count */}
                    <span className="text-sm text-muted-foreground">
                        {totalResults} {totalResults === 1 ? "customer" : "customers"}
                    </span>
                </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    {filters.role.map((role) => (
                        <Badge key={role} variant="secondary" className="gap-1">
                            Role: {USER_ROLE_OPTIONS.find(r => r.value === role)?.label}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => toggleRole(role)}
                            />
                        </Badge>
                    ))}
                    {filters.verified !== undefined && (
                        <Badge variant="secondary" className="gap-1">
                            {filters.verified ? "Verified" : "Unverified"}
                            <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => onFiltersChange({ ...filters, verified: undefined })}
                            />
                        </Badge>
                    )}

                    {(filters.dateFrom || filters.dateTo) && (
                        <Badge variant="secondary" className="gap-1">
                            Registered: {filters.dateFrom && format(filters.dateFrom, "MMM d")}
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

                    <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    );
}
