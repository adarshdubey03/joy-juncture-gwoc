"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventCard } from "@/components/home/event-card";

const events = [
    {
        id: 1,
        title: "The Great Board Game Marathon",
        date: "Dec 24, 2024",
        location: "Joy Juncture HQ, Mumbai",
        image: "bg-gradient-to-br from-purple-500 to-indigo-600",
        description: "Join us for 24 hours of non-stop gaming, food, and prizes!",
    },
    {
        id: 2,
        title: "Mystery Night: The Bloody Inheritance",
        date: "Dec 31, 2024",
        location: "Online Event",
        image: "bg-gradient-to-br from-red-500 to-orange-600",
        imageUrl: "/events/bloody-inheritance.png",
        description: "Solve the murder mystery before the clock strikes midnight.",
    },
    {
        id: 3,
        title: "Community Meetup: Strategy & Snacks",
        date: "Jan 05, 2025",
        location: "Cafe Coffee Day, Bangalore",
        image: "bg-gradient-to-br from-green-400 to-teal-500",
        description: "Bring your favorite strategy game and meet fellow enthusiasts.",
    },
];

export function EventCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    React.useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        });
    }, [emblaApi]);

    return (
        <section className="py-24 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">What&apos;s Happening Now</h2>
                        <p className="text-gray-500 text-lg">
                            Upcoming events, active puzzles, new games, and community highlights. Stay in the loop with everything Joy Juncture.
                        </p>
                    </div>
                    <Link href="/events">
                        <Button variant="outline" className="hidden md:flex gap-2">
                            View All Events <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="relative">
                    <div className="overflow-hidden -mx-4 px-4 py-8" ref={emblaRef}>
                        <div className="flex gap-6 pb-4">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-4"
                                >
                                    <div className="group relative h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                                        {/* Image Placeholder */}
                                        <div className={`h-48 w-full ${event.image} relative`}>
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                                Upcoming
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4 text-accent" />
                                                    {event.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4 text-accent" />
                                                    {event.location}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-500 mb-6 line-clamp-2">
                                                {event.description}
                                            </p>

                                            <Link href="/events">
                                                <Button className="w-full gap-2 group-hover:bg-accent group-hover:text-white transition-colors">
                                                    Join Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {events.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    index === selectedIndex ? "w-8 bg-accent" : "bg-gray-200 hover:bg-gray-300"
                                )}
                                onClick={() => emblaApi?.scrollTo(index)}
                            />
                        ))}
                    </div>

                    <div className="md:hidden mt-8 text-center">
                        <Link href="/events">
                            <Button variant="outline" className="w-full gap-2">
                                View All Events <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
