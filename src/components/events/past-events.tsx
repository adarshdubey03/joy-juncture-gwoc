"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const pastEvents = [
    { id: 1, title: "Game Night 2023", image: "bg-gray-800" },
    { id: 2, title: "Summer Tournament", image: "bg-gray-700" },
    { id: 3, title: "Launch Party", image: "bg-gray-600" },
    { id: 4, title: "Workshop", image: "bg-gray-500" },
];

export function PastEvents() {
    return (
        <section className="py-24 bg-secondary">
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-bold">Past Events</h2>
                    <Button variant="ghost" className="gap-2">
                        View Gallery <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pastEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className={`aspect-[4/3] rounded-2xl ${event.image} mb-4 overflow-hidden relative`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="secondary" className="rounded-full">View Photos</Button>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{event.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
