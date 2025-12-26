"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, Trophy, Gift, Crown, Star, Zap } from "lucide-react";
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

                            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
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
                            {/* Level Progress Card */}
                            <div className="bg-gradient-to-br from-gray-800 to-gray-950 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                {/* Decorational glow */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 blur-3xl rounded-full" />

                                <div className="flex justify-between items-start mb-6 relative">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                                Level 12
                                            </span>
                                            <Trophy className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white tracking-tight">Board Game Baron</h3>
                                        <p className="text-gray-400 text-sm">Top 5% of players this month</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 p-[1px]">
                                        <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                                            <Crown className="w-8 h-8 text-yellow-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Section */}
                                <div className="mb-8">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-300">XP Progress</span>
                                        <span className="text-white font-bold">2,450 / 3,000</span>
                                    </div>
                                    <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-accent to-yellow-400 w-[82%]" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-right">550 XP to Next Reward</p>
                                </div>

                                {/* Recent Unlocks / Badges */}
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Recent Badges</p>
                                    <div className="flex gap-4 justify-around mt-4">
                                        {[
                                            { icon: Star, gradient: "from-blue-400 via-blue-200 to-blue-500", label: "Strategist", glow: "shadow-blue-500/50" },
                                            { icon: Gift, gradient: "from-yellow-300 via-yellow-100 to-amber-500", label: "Collector", glow: "shadow-yellow-500/50" },
                                            { icon: Zap, gradient: "from-orange-300 via-orange-100 to-red-500", label: "Speedster", glow: "shadow-orange-500/50" },
                                        ].map((badge, i) => (
                                            <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                                                <div className={`relative w-14 h-14 rounded-full bg-gradient-to-b ${badge.gradient} p-[2px] shadow-lg ${badge.glow} transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1`}>
                                                    {/* Inner Coin Face */}
                                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-white/30 flex items-center justify-center relative overflow-hidden">
                                                        {/* Shine Effect */}
                                                        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 blur-sm" />
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} opacity-20 mix-blend-overlay`} />

                                                        <badge.icon className="w-7 h-7 text-white drop-shadow-md relative z-10" />
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-white transition-colors">
                                                    {badge.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
