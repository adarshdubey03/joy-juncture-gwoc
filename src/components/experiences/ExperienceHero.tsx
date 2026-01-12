"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface ExperienceHeroProps {
    category?: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaHref: string;
    backgroundGradient?: string;
    accentColor?: string;
    decorations?: ReactNode;
}

export default function ExperienceHero({
    category,
    headline,
    subheadline,
    ctaText,
    ctaHref,
    backgroundGradient = "from-[#FFF4D6] via-[#FFE8B3] to-[#FFD88A]",
    accentColor = "#F4C752",
    decorations,
}: ExperienceHeroProps) {
    return (
        <section
            className={`relative w-full bg-gradient-to-br ${backgroundGradient} overflow-hidden min-h-[85vh] flex items-center justify-center`}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Themed decorations */}
                {decorations}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
                {category && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6"
                    >
                        <span className="px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-bold text-neutral-900 shadow-lg border border-neutral-200">
                            {category}
                        </span>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-neutral-900 leading-tight mb-6"
                >
                    {headline}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-neutral-700 font-medium mb-12 max-w-3xl mx-auto"
                >
                    {subheadline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link
                        href={ctaHref}
                        className="inline-block rounded-full px-12 py-5 text-lg font-bold text-neutral-900 shadow-[0_12px_32px_rgba(244,199,82,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(244,199,82,0.65)] active:translate-y-0"
                        style={{ backgroundColor: accentColor }}
                    >
                        {ctaText}
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-neutral-600 text-3xl"
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
