import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getEvents } from "@/actions/admin/event-actions";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default async function EventsPage() {
    const { data: events } = await getEvents();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Events</h2>
                <Button asChild>
                    <Link href="/admin/events/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Event
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Registrations</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                        No events found. Add one to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                            {events?.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">
                                        <div>{event.title}</div>
                                        {event.isFeatured && (
                                            <Badge variant="secondary" className="mt-1">Featured</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{event.type}</Badge>
                                    </TableCell>
                                    <TableCell>{format(new Date(event.startTime), "MMM d, yyyy h:mm a")}</TableCell>
                                    <TableCell>
                                        {event.venue || event.location || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {event.capacity ? `${event.capacity} people` : "Unlimited"}
                                    </TableCell>
                                    <TableCell>
                                        {event.registrations.length}
                                        {event.capacity && ` / ${event.capacity}`}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={event.isActive ? "default" : "secondary"}>
                                            {event.isCancelled ? "Cancelled" : event.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/events/${event.id}`}>Edit</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
