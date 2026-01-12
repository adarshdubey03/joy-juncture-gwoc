import { OrderStatus } from "@/generated/prisma";

export const ORDER_STATUS_OPTIONS = [
    { value: "PENDING", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "PROCESSING", label: "Processing", color: "bg-blue-100 text-blue-800" },
    { value: "SHIPPED", label: "Shipped", color: "bg-purple-100 text-purple-800" },
    { value: "DELIVERED", label: "Delivered", color: "bg-green-100 text-green-800" },
    { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" },
    { value: "REFUNDED", label: "Refunded", color: "bg-gray-100 text-gray-800" },
] as const;

export const PAYMENT_STATUS_OPTIONS = [
    { value: "PENDING", label: "Pending" },
    { value: "PAID", label: "Paid" },
    { value: "FAILED", label: "Failed" },
    { value: "REFUNDED", label: "Refunded" },
] as const;

export const PAYMENT_METHOD_OPTIONS = [
    { value: "COD", label: "Cash on Delivery" },
    { value: "UPI", label: "UPI" },
    { value: "CARD", label: "Card" },
    { value: "NETBANKING", label: "Net Banking" },
    { value: "WALLET", label: "Wallet" },
] as const;

export function getStatusColor(status: OrderStatus): string {
    const option = ORDER_STATUS_OPTIONS.find(opt => opt.value === status);
    return option?.color || "bg-gray-100 text-gray-800";
}

export function getStatusLabel(status: OrderStatus): string {
    const option = ORDER_STATUS_OPTIONS.find(opt => opt.value === status);
    return option?.label || status;
}

// Date range presets
export const DATE_RANGE_PRESETS = [
    { label: "Today", getValue: () => ({ from: new Date(), to: new Date() }) },
    {
        label: "Yesterday", getValue: () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return { from: yesterday, to: yesterday };
        }
    },
    {
        label: "Last 7 days", getValue: () => {
            const from = new Date();
            from.setDate(from.getDate() - 7);
            return { from, to: new Date() };
        }
    },
    {
        label: "Last 30 days", getValue: () => {
            const from = new Date();
            from.setDate(from.getDate() - 30);
            return { from, to: new Date() };
        }
    },
    {
        label: "This month", getValue: () => {
            const now = new Date();
            const from = new Date(now.getFullYear(), now.getMonth(), 1);
            return { from, to: new Date() };
        }
    },
    {
        label: "Last month", getValue: () => {
            const now = new Date();
            const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const to = new Date(now.getFullYear(), now.getMonth(), 0);
            return { from, to };
        }
    },
] as const;
