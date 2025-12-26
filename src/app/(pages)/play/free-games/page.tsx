"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GamesGrid } from "@/components/play/games-grid";
import { motion } from "framer-motion";
import { Trophy, Sparkles } from "lucide-react";

export default function FreeGamesPage() {
    return (
        <main className="min-h-screen bg-secondary">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: "url('/contour-pattern.svg')", backgroundSize: "300px" }} />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-bold">Free to Play • Earn Points</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Play Free Online Games
                        </h1>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Sharpen your mind, challenge friends, and earn Joy Points with our collection of daily puzzles and online games.
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-accent" />
                                <span>Daily Challenges</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-accent" />
                                <span>Leaderboards</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-accent" />
                                <span>Point Rewards</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <GamesGrid />
            <Footer />
        </main>
    );
}

