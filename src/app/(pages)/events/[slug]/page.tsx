"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, Ticket, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock event data - in real app, fetch from database
const events: Record<string, any> = {
    "the-great-board-game-marathon": {
        id: 1,
        title: "The Great Board Game Marathon",
        date: "Dec 24, 2024",
        time: "6:00 PM - 12:00 AM",
        location: "Joy Juncture HQ, Mumbai",
        price: 499,
        maxParticipants: 50,
        currentParticipants: 32,
        description: "Join us for 24 hours of non-stop gaming, food, and prizes! Compete in multiple tournaments, win exclusive merchandise, and make new friends in the gaming community.",
        image: "bg-gradient-to-br from-purple-500 to-indigo-600",
        category: "Tournament",
    },
    "mystery-night-bloody-inheritance": {
        id: 2,
        title: "Mystery Night: The Bloody Inheritance",
        date: "Dec 31, 2024",
        time: "8:00 PM - 11:00 PM",
        location: "Online Event",
        price: 299,
        maxParticipants: 100,
        currentParticipants: 67,
        description: "Solve the murder mystery before the clock strikes midnight. Work with other players to uncover clues, interrogate suspects, and catch the killer.",
        image: "bg-gradient-to-br from-red-500 to-orange-600",
        category: "Interactive",
    },
};

export default function EventDetailPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const event = events[params.slug];

    if (!event) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
                    <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push("/events")}>Back to Events</Button>
                </div>
                <Footer />
            </main>
        );
    }

    const spotsLeft = event.maxParticipants - event.currentParticipants;
    const isSoldOut = spotsLeft === 0;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Image */}
            <section className="pt-24 pb-12 relative">
                <div className={`h-[60vh] ${event.image} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-end">
                        <div className="container mx-auto px-4 pb-12 relative z-10">
                            <Link href="/events" className="inline-flex items-center gap-2 text-white mb-6 hover:text-accent transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Events</span>
                            </Link>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Badge variant="accent" className="mb-4 bg-white text-primary">
                                    {event.category}
                                </Badge>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{event.title}</h1>
                                <div className="flex flex-wrap items-center gap-6 text-white/90">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        {event.location}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="prose prose-lg max-w-none mb-12">
                                <h2 className="text-3xl font-bold mb-6 text-gray-900">About This Event</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    {event.description}
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Whether you're a seasoned player or new to board games, this event is designed for everyone. Our game masters will guide you through the experience, ensuring everyone has a fantastic time.
                                </p>
                            </div>

                            {/* What to Expect */}
                            <div className="bg-secondary rounded-2xl p-8 mb-12">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900">What to Expect</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Professional game masters and facilitators",
                                        "Multiple game options to choose from",
                                        "Complimentary snacks and beverages",
                                        "Exclusive merchandise and prizes",
                                        "Networking opportunities with fellow players",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <span className="text-accent mt-1">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600">Ticket Price</span>
                                        <span className="text-3xl font-bold text-primary">{event.price === 0 ? "Free" : `₹${event.price}`}</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="h-full bg-accent transition-all duration-500"
                                            style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>{event.currentParticipants} registered</span>
                                        <span>{spotsLeft} spots left</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Users className="w-5 h-5 text-accent" />
                                        <span>Max {event.maxParticipants} participants</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Calendar className="w-5 h-5 text-accent" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MapPin className="w-5 h-5 text-accent" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full rounded-full text-lg h-14"
                                    disabled={isSoldOut}
                                >
                                    {isSoldOut ? "Sold Out" : `Register Now - ₹${event.price}`}
                                </Button>

                                {isSoldOut && (
                                    <p className="text-sm text-center text-gray-500 mt-4">
                                        Join the waitlist to be notified if spots open up
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

