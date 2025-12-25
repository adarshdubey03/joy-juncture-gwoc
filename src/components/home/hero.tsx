"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { ShinyButton } from "@/components/ui/shiny-button";
import { WoodenCartButton } from "@/components/ui/wooden-cart-button";

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
                    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter mb-6 leading-[1.1]">
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
                    className="flex flex-col sm:flex-row items-center justify-center gap-12"
                >
                    <WoodenCartButton text="Shop Games" />
                    <ShinyButton text="Play Free Online" />
                </motion.div>
            </div>


        </section>
    );
}
