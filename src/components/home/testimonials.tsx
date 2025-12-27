"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

import SplitText from "@/components/ui/SplitText";

const testimonials = [
    {
        id: 1,
        name: "Aarav Patel",
        role: "Board Game Enthusiast",
        content: "Joy Juncture has completely transformed our family game nights. The selection is incredible, and the recommendations are spot on!",
        rating: 5,
        color: "bg-[#FEF9C3]", // Yellow
        rotation: "rotate-[-2deg]",
        tapeRotation: "rotate-[-1deg]",
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "Event Planner",
        content: "I booked a corporate experience for my team, and it was a massive hit. The facilitators were engaging, and the games were perfect for team building.",
        rating: 5,
        color: "bg-[#FCE7F3]", // Pink
        rotation: "rotate-[3deg]",
        tapeRotation: "rotate-[2deg]",
    },
    {
        id: 3,
        name: "Rohan Gupta",
        role: "Casual Player",
        content: "I love the 'Play Free Online' section. It's my go-to for a quick break during work. The Sudoku variants are addictive!",
        rating: 4,
        color: "bg-[#DCFCE7]", // Green
        rotation: "rotate-[-1deg]",
        tapeRotation: "rotate-[1deg]",
    },
];

export function Testimonials() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-20">
                    <SplitText
                        text="Proof of Joy"
                        className="font-heading text-4xl md:text-6xl font-bold mb-6 text-center"
                        delay={100}
                        duration={0.6}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="center"
                    />
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-kalam">
                        Hear from our community of players, families, and organizations who have found their joy with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto p-4">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -2 : 2 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={cn(
                                "relative group perspective-1000",
                                testimonial.rotation // Initial static rotation
                            )}
                        >
                            {/* Sticky Note */}
                            <div
                                className={cn(
                                    "relative p-8 shadow-lg transition-transform duration-300 ease-out transform group-hover:scale-105 group-hover:rotate-0 group-hover:z-10",
                                    testimonial.color,
                                    "font-kalam" // Apply handwriting font
                                )}
                                style={{
                                    boxShadow: "2px 4px 12px rgba(0,0,0,0.15)",
                                }}
                            >
                                {/* Tape Visual */}
                                <div
                                    className={cn(
                                        "absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/40 backdrop-blur-[1px] shadow-sm border border-white/20 z-20",
                                        testimonial.tapeRotation
                                    )}
                                    style={{
                                        maskImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='40' viewBox='0 0 200 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h200v40H0z' fill='%23000' filter='url(%23noise)'/%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3C/svg%3E\")",
                                        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)", // Simple fallback if SVG mask is tricky
                                        clipPath: "polygon(2% 4%, 98% 2%, 99% 96%, 1% 98%)", // Rough edges
                                    }}
                                />

                                {/* Content */}
                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-600 fill-yellow-600/50" : "text-gray-400"
                                                        }`}
                                                    strokeWidth={1.5}
                                                />
                                            ))}
                                        </div>
                                        <Quote className="w-8 h-8 text-black/10 rotate-180" />
                                    </div>

                                    <p className="text-gray-800 text-xl md:text-2xl mb-8 flex-grow leading-relaxed" style={{ fontStyle: "normal" }}>
                                        {testimonial.content}
                                    </p>

                                    <div className="flex items-center gap-4 mt-auto border-t border-black/10 pt-4">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg leading-none mb-1">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-600 tracking-wide font-sans">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
