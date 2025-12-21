"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const events = [
    {
        id: 1,
        title: "The Great Board Game Marathon",
        date: "Dec 24, 2024",
        time: "10:00 AM - 10:00 PM",
        location: "Joy Juncture HQ, Mumbai",
        image: "bg-purple-600",
        price: "₹499",
        spots: 12,
    },
    {
        id: 2,
        title: "Mystery Night: The Bloody Inheritance",
        date: "Dec 31, 2024",
        time: "09:00 PM - 12:00 AM",
        location: "Online Event",
        image: "bg-red-600",
        price: "₹299",
        spots: 45,
    },
    {
        id: 3,
        title: "Community Meetup: Strategy & Snacks",
        date: "Jan 05, 2025",
        time: "04:00 PM - 08:00 PM",
        location: "Cafe Coffee Day, Bangalore",
        image: "bg-green-500",
        price: "Free",
        spots: 20,
    },
];

export function EventsList() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-bold">Upcoming Events</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" className="rounded-full">Calendar View</Button>
                        <Button className="rounded-full">List View</Button>
                    </div>
                </div>

                <div className="space-y-6">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                <div className="flex flex-col md:flex-row">
                                    <div className={`w-full md:w-64 h-48 md:h-auto ${event.image} relative`}>
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                            {event.price}
                                        </div>
                                    </div>

                                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4 text-accent" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4 text-accent" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4 text-accent" />
                                                {event.location}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                                        <p className="text-gray-500 mb-6">
                                            Join us for an unforgettable experience. Limited spots available!
                                        </p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-sm font-medium text-orange-500">
                                                Only {event.spots} spots left!
                                            </div>
                                            <Button className="gap-2 rounded-full px-6">
                                                <Ticket className="w-4 h-4" />
                                                Register Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
