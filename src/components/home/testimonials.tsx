"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
    {
        id: 1,
        name: "Aarav Patel",
        role: "Board Game Enthusiast",
        content: "Joy Juncture has completely transformed our family game nights. The selection is incredible, and the recommendations are spot on!",
        rating: 5,
        image: "bg-blue-100",
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "Event Planner",
        content: "I booked a corporate experience for my team, and it was a massive hit. The facilitators were engaging, and the games were perfect for team building.",
        rating: 5,
        image: "bg-pink-100",
    },
    {
        id: 3,
        name: "Rohan Gupta",
        role: "Casual Player",
        content: "I love the 'Play Free Online' section. It's my go-to for a quick break during work. The Sudoku variants are addictive!",
        rating: 4,
        image: "bg-green-100",
    },
];

export function Testimonials() {
    return (
        <section className="py-24">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Proof of Joy</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Hear from our community of players, families, and organizations who have found their joy with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-none shadow-md">
                                <CardContent className="p-8 flex flex-col h-full">
                                    <div className="flex items-center gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <Quote className="w-10 h-10 text-accent/20 mb-4" />

                                    <p className="text-gray-600 text-lg mb-8 flex-grow italic">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full ${testimonial.image} flex items-center justify-center text-xl font-bold text-primary`}>
                                            {testimonial.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
