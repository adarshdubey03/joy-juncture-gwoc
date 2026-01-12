"use client";

import { OrderStatus } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusLabel } from "@/lib/order-constants";

interface OrderStatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    return (
        <Badge
            className={`${getStatusColor(status)} border-0 ${className}`}
            variant="secondary"
        >
            <span className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${getStatusColor(status).split(' ')[0].replace('bg-', 'bg-')}`} />
                {getStatusLabel(status)}
            </span>
        </Badge>
    );
}
