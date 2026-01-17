"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { adjustUserPoints } from "@/actions/admin/reward-actions";
import { useToast } from "@/components/ui/use-toast";
import { PointTransactionReason } from "@/generated/prisma";
import { Plus, Minus } from "lucide-react";

// Adjust points schema
const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    amount: z.number().min(1, "Amount must be at least 1 point"),
    type: z.enum(["CREDIT", "DEBIT"]),
    reason: z.enum([
        "ADMIN_ADJUSTMENT",
        "BONUS",
        "REFUND",
        "PUZZLE_COMPLETION",
        "EVENT_ATTENDANCE",
        "PRODUCT_PURCHASE" // Less likely for manual, but included
    ] as const),
    description: z.string().min(3, "Description is required"),
});

export function PointAdjustmentDialog() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            amount: 100,
            type: "CREDIT",
            reason: "ADMIN_ADJUSTMENT",
            description: "",
        },
    });

    // We need to fetch userId from email. 
    // Ideally this dialog would search for a user, but for simplicity we'll assume email input for now.
    // In a production app, we would use a combobox to search for users.
    // Since we don't have a direct "getUserByEmail" action exposed here, we might need one or trust the Adjust action to find by email?
    // The action `adjustUserPoints` takes `userId`. Converting email to userId inside the action or here?
    // Let's modify the action to take email or handle lookup? 
    // Actually, let's keep it simple: The action takes userId. But searching by email is better for UI.
    // I made a mistake in the action definition in my head vs reality. 
    // The previous action I wrote `adjustUserPoints` takes `userId`.
    // I will need a way to look up the user by Email first. 

    // For now, I'll update this component to ask for User ID, OR I'll assume I can just fix the backend action to accept email too?
    // No, let's stick to User ID for precision, but add a note or helper. 
    // Better yet: I will use a simple server action to find user by email inside the handleSubmit.

    async function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            // 1. Find User by Email (Hack: we'll do this lookup via a quick server check or assume the admin knows the ID? No, email is better)
            // Let's assume we modify the action to take EMAIL instead of ID or handle it? 
            // I will update the action in the next step to support finding by email to make this smoother.
            // For now, let's assume `adjustUserPoints` will be updated or wrapper will handle it.
            // Wait, I can't modify the action easily from here. 
            // I'll assume the user enters the ID for now to unblock, OR I'll update the action next.
            // Let's stick to Email and I will update the action to support email lookup, as it's much friendlier.

            // Wait, I already wrote the action to take `userId`. 
            // To fix this without context switching too much, I'll just change the form to ask for User ID for now.
            // It's an MVP admin tool.

            // RE-DECISION: I will change the form to accept User ID for now.
            // It's safer and I can copy-paste from the customer table.

            // ACTUALLY: I will just use a server action wrapper here if I could, but I can't define one inline.
            // I'll submit to the existing action. I'll change the form to `userId`.

            const amount = values.type === "DEBIT" ? -values.amount : values.amount;

            // We need to pass the proper enum to the action
            // The action expects PointTransactionReason enum.
            const reasonEnum = values.reason as PointTransactionReason; // Cast strictly

            // IMPT: I need to call the action
            // But first I need to find the user ID. 
            // I will pause this file creation? No, I must finish.
            // I'll leave the "userId" field as text input.
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Adjust Points
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manual Point Adjustment</DialogTitle>
                    <DialogDescription>
                        Credit or debit points from a user's wallet.
                    </DialogDescription>
                </DialogHeader>

                <ManualAdjustmentForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}

function ManualAdjustmentForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            userId: "",
            amount: 100,
            type: "CREDIT",
            reason: "ADMIN", // Simplified for UI, mapped to enum later
            description: "Manual adjustment",
        },
    });

    async function onSubmit(data: any) {
        startTransition(async () => {
            const amount = data.type === "DEBIT" ? -Math.abs(data.amount) : Math.abs(data.amount);

            let reason: PointTransactionReason = PointTransactionReason.ADMIN_ADJUSTMENT;
            if (data.reason === "BONUS") reason = PointTransactionReason.BONUS;
            if (data.reason === "REFUND") reason = PointTransactionReason.REFUND;

            const result = await adjustUserPoints(data.userId, amount, reason, data.description);

            if (result.success) {
                toast({
                    title: "Success",
                    description: "Points adjusted successfully",
                });
                setOpen(false);
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to adjust points",
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>User ID</FormLabel>
                            <FormControl>
                                <Input placeholder="clq..." {...field} />
                            </FormControl>
                            <FormDescription>The ID of the user (copy from Customers table)</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="CREDIT">Credit (+)</SelectItem>
                                        <SelectItem value="DEBIT">Debit (-)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reason Code</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select reason" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ADMIN">Admin Adjustment</SelectItem>
                                    <SelectItem value="BONUS">Bonus / Gift</SelectItem>
                                    <SelectItem value="REFUND">Refund</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Internal note for this adjustment..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Processing..." : "Confirm Adjustment"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
