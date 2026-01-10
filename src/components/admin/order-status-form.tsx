"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateOrderStatus } from "@/actions/admin/order-actions";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Define local enum to avoid importing Prisma Client in client component
export enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
}

const StatusSchema = z.object({
    status: z.nativeEnum(OrderStatus),
    reason: z.string().optional(),
});

interface OrderStatusFormProps {
    orderId: string;
    currentStatus: string; // Changed from OrderStatus to string
}

export const OrderStatusForm = ({ orderId, currentStatus }: OrderStatusFormProps) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof StatusSchema>>({
        resolver: zodResolver(StatusSchema),
        defaultValues: {
            status: currentStatus as OrderStatus,
            reason: "",
        },
    });

    const onSubmit = (values: z.infer<typeof StatusSchema>) => {
        setError(undefined);
        setSuccess(undefined);

        startTransition(() => {
            updateOrderStatus(orderId, values.status as any, values.reason)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Update Status</FormLabel>
                            <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.values(OrderStatus).map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reason / Note</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Optional note about this status change..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                        {success}
                    </div>
                )}

                <Button type="submit" disabled={isPending}>
                    Update Status
                </Button>
            </form>
        </Form>
    );
};
