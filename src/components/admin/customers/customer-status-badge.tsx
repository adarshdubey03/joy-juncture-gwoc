"use client";

import { Badge } from "@/components/ui/badge";
import { getAccountStatusColor, getAccountStatusLabel } from "@/lib/customer-constants";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface CustomerStatusBadgeProps {
    emailVerified: Date | null;
    isActive: boolean;
    className?: string;
}

export function CustomerStatusBadge({ emailVerified, isActive, className }: CustomerStatusBadgeProps) {
    const verified = !!emailVerified;
    const color = getAccountStatusColor(verified, isActive);
    const label = getAccountStatusLabel(verified, isActive);

    return (
        <Badge className={`${color} border-0 ${className}`} variant="secondary">
            <span className="flex items-center gap-1.5">
                {verified && isActive ? (
                    <CheckCircle2 className="h-3 w-3" />
                ) : !verified ? (
                    <Clock className="h-3 w-3" />
                ) : (
                    <XCircle className="h-3 w-3" />
                )}
                {label}
            </span>
        </Badge>
    );
}
