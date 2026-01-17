"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { QrCode } from "lucide-react";

interface TicketViewProps {
    event: any;
    ticketCode: string;
    userName: string;
}

export const TicketView = ({ event, ticketCode, userName }: TicketViewProps) => {
    return (
        <Card className="max-w-md mx-auto border-2 border-primary/20 bg-card">
            <CardHeader className="bg-primary/5 text-center pb-2">
                <CardTitle className="text-xl font-bold uppercase tracking-wider text-primary">Event Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6 text-center">

                <div>
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                    <p className="text-muted-foreground">{event.venue || event.location || "Online"}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Date & Time</p>
                    <p className="text-lg font-semibold">{format(new Date(event.startTime), "PPP")}</p>
                    <p>{format(new Date(event.startTime), "p")}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Attendee</p>
                    <p className="text-lg font-semibold">{userName}</p>
                </div>

                <div className="bg-muted p-6 rounded-lg border-2 border-dashed border-primary/30 relative">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full border-r border-primary/20"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full border-l border-primary/20"></div>

                    <p className="text-sm text-muted-foreground mb-2">Ticket Code</p>
                    <p className="text-3xl font-mono font-bold tracking-[0.2em] text-primary break-all">
                        {ticketCode}
                    </p>
                </div>

                <div className="flex justify-center text-muted-foreground text-xs">
                    <QrCode className="w-12 h-12 opacity-50" />
                </div>

            </CardContent>
        </Card>
    );
};
