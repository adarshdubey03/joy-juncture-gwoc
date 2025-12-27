"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-primary text-white">
            {/* Background Image */}
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 border border-white/15 text-xs md:text-sm uppercase tracking-[0.3em] mb-6">
                        Warning: Entering a joy-packed zone!!
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05]">
                        Life&apos;s best moments
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-accent">
                            start around a table.
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light"
                >
                    Board games, mysteries, and game nights crafted to turn awkward silences into inside jokes, and strangers into stories you&apos;ll tell for years.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-12"
                >
                    <Link href="/shop">
                        <Button
                            size="lg"
                            className="rounded-full px-10 text-lg h-14 shadow-orange-500/30 shadow-2xl hover:shadow-orange-500/50"
                        >
                            Shop Games
                        </Button>
                    </Link>
                    <Link href="/play/free-games">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-10 text-lg h-14 border-white/20 text-white hover:bg-white/10 hover:text-white gap-2"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            Play Now (Free)
                        </Button>
                    </Link>
                    <Link href="/events">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-10 text-lg h-14 border-white/20 text-white hover:bg-white/10 hover:text-white gap-2"
                        >
                            Join a Game Night
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2 text-gray-300/80">
                    <span className="text-[11px] uppercase tracking-[0.25em]">Scroll for Joy</span>
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
}
