"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProblemCard {
    icon: ReactNode;
    title: string;
    description: string;
}

interface ProblemCardsProps {
    sectionTitle: string;
    cards: ProblemCard[];
}

export default function ProblemCards({ sectionTitle, cards }: ProblemCardsProps) {
    return (
        <section className="py-20 px-6 bg-[#FFF4D6]">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-neutral-900 text-center mb-16"
                >
                    {sectionTitle}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-neutral-200 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Icon container */}
                            <div className="mb-6 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#F4C752] flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {card.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-neutral-900 mb-3 text-center">
                                {card.title}
                            </h3>
                            <p className="text-neutral-600 text-center leading-relaxed">
                                {card.description}
                            </p>

                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#F4C752]/10 to-transparent rounded-bl-3xl rounded-tr-3xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
