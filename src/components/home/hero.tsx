"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-primary text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.jpg"
                    alt="Joy Juncture Hero"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.1]">
                        Moments of Joy,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-accent">
                            One Game at a Time
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-light"
                >
                    Discover board games that create memories, experiences that bring people together, and a community that plays for joy.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" className="rounded-full px-8 text-lg h-14 shadow-orange-500/20 shadow-2xl">
                        Shop Games
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-14 border-white/20 text-white hover:bg-white/10 hover:text-white gap-2">
                        <Play className="w-5 h-5 fill-current" />
                        Play Free Online
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-gray-400">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
}
