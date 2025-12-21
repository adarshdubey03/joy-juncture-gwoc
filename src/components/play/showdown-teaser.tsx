"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Users, Zap } from "lucide-react";

export function ShowdownTeaser() {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center bg-black text-white">
            {/* Video Background Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-50 z-0" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 z-0 mix-blend-overlay" />

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-block mb-6"
                >
                    <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-accent/50 bg-accent/10 text-accent font-bold uppercase tracking-widest text-sm">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Live Now
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase italic"
                >
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Showdown</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
                >
                    Compete in real-time multiplayer challenges. Win glory, earn points, and climb the leaderboard.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all">
                        <Play className="w-6 h-6 mr-2 fill-current" />
                        Join Live Room
                    </Button>
                    <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-bold rounded-full border-white/20 text-white hover:bg-white/10">
                        <Users className="w-6 h-6 mr-2" />
                        Create Private Match
                    </Button>
                </motion.div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-8">
                    {[
                        { label: "Active Players", value: "1,245" },
                        { label: "Prize Pool", value: "100K JP" },
                        { label: "Next Match", value: "05:30" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
