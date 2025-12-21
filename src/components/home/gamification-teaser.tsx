"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, Trophy, Gift } from "lucide-react";
import Link from "next/link";

export function GamificationTeaser() {
    return (
        <section className="py-24 bg-primary text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-accent opacity-10 blur-3xl rounded-l-full" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent font-medium mb-6">
                                <Trophy className="w-4 h-4" />
                                <span>Join the Fun</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Play Games. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-accent">
                                    Earn Joy Points.
                                </span>
                            </h2>

                            <p className="text-gray-400 text-lg mb-8 max-w-xl">
                                Every game you play, every event you attend, and every purchase you make earns you Joy Points. Redeem them for exclusive discounts, free games, and special experiences.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="rounded-full px-8">
                                    Start Earning
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-full px-8 border-white/20 text-white hover:bg-white/10 hover:text-white gap-2">
                                    <Wallet className="w-5 h-5" />
                                    View Wallet
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex-1 w-full max-w-md lg:max-w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Wallet Mockup Card */}
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Current Balance</p>
                                        <h3 className="text-4xl font-bold text-white">2,450 <span className="text-accent text-2xl">JP</span></h3>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                                        <Gift className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { action: "Won Sudoku Challenge", points: "+500", date: "Today" },
                                        { action: "Purchased 'Dead Man's Deck'", points: "+150", date: "Yesterday" },
                                        { action: "Attended Game Night", points: "+300", date: "Dec 20" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/20">
                                            <div>
                                                <p className="font-medium text-white">{item.action}</p>
                                                <p className="text-xs text-gray-500">{item.date}</p>
                                            </div>
                                            <span className="text-accent font-bold">{item.points}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
