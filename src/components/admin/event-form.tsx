"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EventSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { createEvent, updateEvent } from "@/actions/admin/event-actions";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { notifyAttendees } from "@/actions/notification-actions";
import ImageUpload from "@/components/ui/image-upload";

interface EventFormProps {
    initialData?: any;
}

export const EventForm = ({ initialData }: EventFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showNotifyDialog, setShowNotifyDialog] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [savedEventId, setSavedEventId] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(EventSchema),
        defaultValues: initialData ? {
            ...initialData,
            startTime: initialData.startTime ? new Date(initialData.startTime) : new Date(),
            endTime: initialData.endTime ? new Date(initialData.endTime) : undefined,
            earlyBirdExpiry: initialData.earlyBirdExpiry ? new Date(initialData.earlyBirdExpiry) : undefined,
        } : {
            title: "",
            slug: "",
            description: "",
            type: "GAME_NIGHT",
            startTime: new Date(),
            location: "",
            venue: "",
            capacity: 0,
            pointReward: 0,
            ticketPrice: 0,
            isActive: true,
            isFeatured: false,
            isCancelled: false,
            isRegistrationOpen: true,
            notificationTemplate: "We have updated the event details. Please check the website.",
            galleryImages: [],
        },
    });

    const onSubmit = (values: z.infer<typeof EventSchema>) => {
        startTransition(() => {
            if (initialData) {
                updateEvent(initialData.id, values).then((data) => {
                    if (data.success) {
                        setSavedEventId(initialData.id);
                        // Pre-fill message
                        setNotifyMessage(values.notificationTemplate || `Important update regarding ${values.title}. Please check for changes.`);
                        setShowNotifyDialog(true);
                        router.push("/admin/events");
                        router.refresh();
                    }
                });
            } else {
                createEvent(values).then((data) => {
                    if (data.success) {
                        router.push("/admin/events");
                        router.refresh();
                    }
                });
            }
        });
    };

    const handleNotify = () => {
        if (!savedEventId) return;
        startTransition(async () => {
            await notifyAttendees(savedEventId, notifyMessage);
            setShowNotifyDialog(false);
            router.push("/admin/events");
            router.refresh();
        });
    }

    const handleSkipNotify = () => {
        setShowNotifyDialog(false);
        router.push("/admin/events");
        router.refresh();
    }

    return (
        <>
            <Dialog open={showNotifyDialog} onOpenChange={setShowNotifyDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notify Attendees?</DialogTitle>
                        <DialogDescription>
                            You have updated the event. Do you want to send an email/SMS update to registered users?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">Notification Message</label>
                        <Textarea
                            value={notifyMessage}
                            onChange={(e) => setNotifyMessage(e.target.value)}
                            placeholder="Enter message..."
                            rows={4}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleSkipNotify}>Skip</Button>
                        <Button onClick={handleNotify} disabled={isPending}>Send Notification</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Event Title *</FormLabel>
                                            <FormControl>
                                                <Input disabled={isPending} placeholder="e.g., Board Game Night" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug *</FormLabel>
                                            <FormControl>
                                                <Input disabled={isPending} placeholder="board-game-night" {...field} />
                                            </FormControl>
                                            <FormDescription>URL-friendly identifier</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Event Type *</FormLabel>
                                            <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="GAME_NIGHT">Game Night</SelectItem>
                                                    <SelectItem value="WORKSHOP">Workshop</SelectItem>
                                                    <SelectItem value="CORPORATE">Corporate Event</SelectItem>
                                                    <SelectItem value="SPECIAL_EVENT">Special Event</SelectItem>
                                                    <SelectItem value="OTHER">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea disabled={isPending} placeholder="Event details..." rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="notificationTemplate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notification Template (Default)</FormLabel>
                                        <FormControl>
                                            <Textarea disabled={isPending} placeholder="Default message for updates..." rows={2} {...field} />
                                        </FormControl>
                                        <FormDescription>Can be edited before sending.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="startTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Time *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="datetime-local"
                                                    disabled={isPending}
                                                    {...field}
                                                    value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="endTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End Time</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="datetime-local"
                                                    disabled={isPending}
                                                    {...field}
                                                    value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                                                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input disabled={isPending} placeholder="City/Area" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="venue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Venue</FormLabel>
                                            <FormControl>
                                                <Input disabled={isPending} placeholder="Venue name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="galleryImages"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gallery Images</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value || []}
                                                disabled={isPending}
                                                onChange={(url: string) => field.onChange([...(field.value || []), url])}
                                                onRemove={(url: string) => field.onChange([...(field.value || []).filter((curr: string) => curr !== url)])}
                                            />
                                        </FormControl>
                                        <FormDescription>Upload images for past experiences or event gallery.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Capacity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    disabled={isPending}
                                                    placeholder="50"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                                />
                                            </FormControl>
                                            <FormDescription>Max attendees</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ticketPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ticket Price (₹)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    disabled={isPending}
                                                    placeholder="0.00"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="pointReward"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Point Reward</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    disabled={isPending}
                                                    placeholder="0"
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                                />
                                            </FormControl>
                                            <FormDescription>Points for attending</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex gap-6 flex-wrap">
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Active</FormLabel>
                                                <FormDescription>Visible</FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isFeatured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Featured</FormLabel>
                                                <FormDescription>Highlight</FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isRegistrationOpen"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Registration Open</FormLabel>
                                                <FormDescription>Allow signups</FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isCancelled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Cancelled</FormLabel>
                                                <FormDescription>Mark cancelled</FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={isPending} size="lg">
                            <Save className="mr-2 h-4 w-4" />
                            {initialData ? "Update Event" : "Create Event"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.push("/admin/events")} disabled={isPending}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};
