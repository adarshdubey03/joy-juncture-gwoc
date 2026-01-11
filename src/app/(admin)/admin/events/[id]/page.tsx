import { getEvent } from "@/actions/admin/event-actions";
import { EventForm } from "@/components/admin/event-form";
import { notFound } from "next/navigation";

interface EventPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EventPage(props: EventPageProps) {
    const params = await props.params;
    const { data: event } = await getEvent(params.id);

    if (!event) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Event: {event.title}</h2>
                <p className="text-muted-foreground">Update event details and settings.</p>
            </div>

            <EventForm initialData={event} />
        </div>
    );
}
