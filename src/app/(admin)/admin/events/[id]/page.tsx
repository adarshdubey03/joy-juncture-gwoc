import { EventForm } from "@/components/admin/event-form";
import { getEvent } from "@/actions/admin/event-actions";
import { notFound } from "next/navigation";
import { EventRegistrationsTable } from "@/components/admin/event-registrations-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function AdminEventPage({ params }: PageProps) {
    const {id} = await params;
    const response = await getEvent(id);
    if (!response.success || !response.data) {
        notFound();
    }

    const event = response.data;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Manage Event</h1>

            <EventForm initialData={event} />

            <Card>
                <CardHeader>
                    <CardTitle>Registrations ({event.registrations.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* @ts-ignore - Prisma include types match but sometimes conflict with component props */}
                    <EventRegistrationsTable registrations={event.registrations} />
                </CardContent>
            </Card>
        </div>
    );
}
