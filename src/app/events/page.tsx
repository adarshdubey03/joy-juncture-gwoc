import { db } from "@/lib/db";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
    const now = new Date();

    // Fetch all active events
    const allEvents = await db.event.findMany({
        where: {
            isActive: true,
            isCancelled: false, // Optional: Maybe show cancelled ones differently
        },
        orderBy: { startTime: 'asc' }
    });
    console.log(allEvents)

    const ongoingEvents = allEvents.filter(e =>
        new Date(e.startTime) <= now &&
        (e.endTime ? new Date(e.endTime) >= now : new Date(e.startTime).getTime() + 3600000 > now.getTime())
    );

    const upcomingEvents = allEvents.filter(e => new Date(e.startTime) > now);

    const pastEvents = await db.event.findMany({
        where: {
            isActive: true,
            OR: [
                { endTime: { lt: now } },
                // Fallback for events without end time, ensure start time is sufficiently in past
                { endTime: null, startTime: { lt: new Date(now.getTime() - 86400000) } }
            ]
        },
        orderBy: { startTime: 'desc' },
        take: 10 // Limit past events
    });

    const EventCard = ({ event, type }: { event: any, type: "ONGOING" | "UPCOMING" | "PAST" }) => (
        <Link
            href={`/events/${event.slug}`}
            className="group block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="relative h-48 w-full">
                {event.image ? (
                    <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                        <span className="text-4xl">🎲</span>
                    </div>
                )}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge variant={type === "ONGOING" ? "default" : (type === "PAST" ? "secondary" : "outline")} className="bg-white/90 text-black backdrop-blur-sm shadow-sm">
                        {type === "ONGOING" ? "Happening Now 🔴" : (type === "PAST" ? "Past Memory 💭" : "Upcoming 📅")}
                    </Badge>
                    {event.isRegistrationOpen === false && type !== "PAST" && (
                        <Badge variant="destructive">Registration Closed</Badge>
                    )}
                </div>
            </div>

            <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-[#2E2A24] line-clamp-1 group-hover:text-[#F4A300] transition-colors">{event.title}</h3>

                <div className="space-y-2 text-sm text-[#6B655A]">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-[#F4A300]" />
                        <span>{new Date(event.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    {type === "ONGOING" && (
                        <div className="flex items-center gap-2 font-semibold text-green-600">
                            <Clock className="w-4 h-4" />
                            <span>Ends {event.endTime ? new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Soon'}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#F4A300]" />
                        <span className="line-clamp-1">{event.location || "TBA"}</span>
                    </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-sm font-medium">
                    <span className="text-[#2E2A24]">
                        {Number(event.ticketPrice) > 0 ? `₹${Number(event.ticketPrice)}` : "Free"}
                    </span>
                    <span className="flex items-center text-[#F4A300] group-hover:translate-x-1 transition-transform">
                        {type === "PAST" ? "View Memories" : "Details"} <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-[#FFF4D6] px-6 pt-28 pb-20">
            <div className="max-w-7xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[#2E2A24]">
                        Upcoming <span className="text-[#F4A300]">Events</span>
                    </h1>
                    <p className="text-lg text-[#5A554B]">
                        Join us for game nights, workshops, and unforgettable experiences.
                    </p>
                </div>

                {/* ONGOING */}
                {ongoingEvents.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                            <h2 className="text-3xl font-bold text-[#2E2A24]">Happening Now</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ongoingEvents.map(e => <EventCard key={e.id} event={e} type="ONGOING" />)}
                        </div>
                    </section>
                )}

                {/* UPCOMING */}
                <section>
                    <h2 className="text-3xl font-bold text-[#2E2A24] mb-8">Upcoming Adventures</h2>
                    {upcomingEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map(e => <EventCard key={e.id} event={e} type="UPCOMING" />)}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-[#F4A300]/30">
                            <p className="text-xl text-[#5A554B]">No upcoming events scheduled via the portal yet. Stay tuned!</p>
                        </div>
                    )}
                </section>

                {/* PAST */}
                {pastEvents.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold text-[#2E2A24] mb-8 opacity-80">Past Memories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-90 hover:opacity-100 transition-opacity">
                            {pastEvents.map(e => <EventCard key={e.id} event={e} type="PAST" />)}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}
