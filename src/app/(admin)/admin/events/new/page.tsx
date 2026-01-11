import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Add Event</h2>
                <p className="text-muted-foreground">Create a new event for your community.</p>
            </div>

            <EventForm />
        </div>
    );
}
