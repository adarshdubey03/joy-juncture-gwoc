"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

interface Registration {
    id: string;
    user: {
        name: string | null;
        email: string | null;
        phoneNumber: string | null;
    };
    paymentStatus: string | null;
    ticketCode: string | null;
    ticketPrice: any;
    registeredAt: Date;
    attended: boolean;
}

interface Props {
    registrations: Registration[];
}

export const EventRegistrationsTable = ({ registrations }: Props) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Ticket Code</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Attended</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {registrations.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                No registrations yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        registrations.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.user.name || "N/A"}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-xs">
                                        <span>{reg.user.email}</span>
                                        <span className="text-muted-foreground">{reg.user.phoneNumber}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <code className="bg-muted px-2 py-1 rounded text-xs">{reg.ticketCode || "PENDING"}</code>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={reg.paymentStatus === "PAID" ? "default" : "secondary"}>
                                        {reg.paymentStatus || "PENDING"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {reg.ticketPrice ? `₹${Number(reg.ticketPrice).toFixed(2)}` : "Free"}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {format(new Date(reg.registeredAt), "PP p")}
                                </TableCell>
                                <TableCell>
                                    {reg.attended ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <X className="w-4 h-4 text-muted-foreground opacity-30" />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
