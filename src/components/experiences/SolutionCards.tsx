"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SolutionCard {
    icon: ReactNode;
    title: string;
    description: string;
    highlight: string;
}

interface SolutionCardsProps {
    sectionTitle: string;
    cards: SolutionCard[];
}

export default function SolutionCards({ sectionTitle, cards }: SolutionCardsProps) {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-[#FFF4D6] to-[#FFE8B3]">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-neutral-900 text-center mb-16"
                >
                    {sectionTitle}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                            className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Background gradient accent */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F4C752] via-[#FFD88A] to-[#F4C752]" />

                            {/* Icon */}
                            <div className="mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F4C752] to-[#FFD88A] flex items-center justify-center text-4xl shadow-lg">
                                    {card.icon}
                                </div>
                            </div>

                            {/* Highlight badge */}
                            <div className="inline-block mb-4 px-4 py-1 bg-[#F4C752]/20 rounded-full">
                                <span className="text-sm font-bold text-neutral-900">
                                    {card.highlight}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-black text-neutral-900 mb-4">
                                {card.title}
                            </h3>
                            <p className="text-neutral-700 leading-relaxed font-medium">
                                {card.description}
                            </p>

                            {/* Decorative corner */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#F4C752]/10 to-transparent rounded-tl-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
