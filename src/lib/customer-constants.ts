import { UserRole } from "@/generated/prisma";

export const ACCOUNT_STATUS_OPTIONS = [
    { value: "VERIFIED", label: "Verified", color: "bg-green-100 text-green-800" },
    { value: "UNVERIFIED", label: "Unverified", color: "bg-yellow-100 text-yellow-800" },
    { value: "ACTIVE", label: "Active", color: "bg-blue-100 text-blue-800" },
    { value: "INACTIVE", label: "Inactive", color: "bg-gray-100 text-gray-800" },
] as const;

export const USER_ROLE_OPTIONS = [
    { value: "USER", label: "Customer" },
    { value: "ADMIN", label: "Admin" },
    { value: "SUPER_ADMIN", label: "Super Admin" },
] as const;

export const ORDER_COUNT_OPTIONS = [
    { value: "NO_ORDERS", label: "No Orders", filter: { _count: { orders: { equals: 0 } } } },
    { value: "HAS_ORDERS", label: "Has Orders", filter: { _count: { orders: { gt: 0 } } } },
    { value: "FREQUENT", label: "Frequent (5+)", filter: { _count: { orders: { gte: 5 } } } },
] as const;

export function getAccountStatusColor(verified: boolean, active: boolean): string {
    if (verified && active) return "bg-green-100 text-green-800";
    if (!verified) return "bg-yellow-100 text-yellow-800";
    if (!active) return "bg-gray-100 text-gray-800";
    return "bg-blue-100 text-blue-800";
}

export function getAccountStatusLabel(verified: boolean, active: boolean): string {
    if (!verified) return "Unverified";
    if (!active) return "Inactive";
    return "Active";
}

export function getUserRoleLabel(role: UserRole): string {
    const option = USER_ROLE_OPTIONS.find(opt => opt.value === role);
    return option?.label || role;
}
