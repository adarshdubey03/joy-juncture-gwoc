import { auth } from "@/auth";
import { db } from "@/lib/db";
import { TicketView } from "@/components/ticket-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface Props {
    searchParams: {
        eventId?: string;
        ticketCode?: string;
    }
}

export default async function EventConfirmationPage({ searchParams }: Props) {
    const session = await auth();
    const { eventId, ticketCode } = await searchParams


    if (!session?.user?.id || !eventId) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-destructive">Invalid Request</h1>
                <Link href="/events"><Button className="mt-4">Back to Events</Button></Link>
            </div>
        );
    }

    // Fetch registration and event
    const registration = await db.eventRegistration.findUnique({
        where: {
            userId_eventId: {
                userId: session.user.id,
                eventId: eventId
            }
        },
        include: {
            event: true
        }
    });

    if (!registration || registration.paymentStatus !== "PAID") {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-yellow-600">Processing Registration...</h1>
                <p className="text-muted-foreground mt-2">If you paid, please wait a moment for confirmation.</p>
                <Link href="/profile"><Button className="mt-4">Check My Profile</Button></Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl">
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold">You're Going!</h1>
                <p className="text-lg text-muted-foreground">
                    Your registration for <span className="font-semibold text-primary">{registration.event.title}</span> is confirmed.
                </p>
                <p>You have earned <strong>{registration.event.pointReward?.toString() || "0"} Points</strong> (pending attendance).</p>
            </div>

            <div className="mb-10">
                <TicketView
                    event={registration.event}
                    ticketCode={registration.ticketCode || "PENDING"}
                    userName={session.user.name || "Attendee"}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <Link href="/events">
                    <Button variant="outline" className="w-full">Browse More Events</Button>
                </Link>
                <Link href="/games">
                    <Button variant="outline" className="w-full">Play Games</Button>
                </Link>
                <Link href="/profile">
                    <Button className="w-full">View My Profile</Button>
                </Link>
            </div>
        </div>
    );
}
