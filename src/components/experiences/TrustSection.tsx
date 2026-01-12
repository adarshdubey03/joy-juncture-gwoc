"use client";
import { motion } from "framer-motion";

interface TrustPoint {
    number: string;
    title: string;
    description: string;
}

interface TrustSectionProps {
    sectionTitle: string;
    points: TrustPoint[];
}

export default function TrustSection({ sectionTitle, points }: TrustSectionProps) {
    return (
        <section className="py-20 px-6 bg-[#FFF4D6]">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-neutral-900 text-center mb-16"
                >
                    {sectionTitle}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {points.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Number badge */}
                            <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F4C752] to-[#FFD88A] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 z-10">
                                <span className="text-2xl font-black text-neutral-900">
                                    {point.number}
                                </span>
                            </div>

                            {/* Card */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 pt-12 border-2 border-neutral-200 hover:border-[#F4C752] transition-all duration-300 h-full shadow-lg hover:shadow-xl">
                                <h3 className="text-xl font-black text-neutral-900 mb-3">
                                    {point.title}
                                </h3>
                                <p className="text-neutral-700 leading-relaxed">
                                    {point.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom accent */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-16 h-1 bg-gradient-to-r from-transparent via-[#F4C752] to-transparent"
                />
            </div>
        </section>
    );
}
