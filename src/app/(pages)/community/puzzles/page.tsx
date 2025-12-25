"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Clock, Trophy, Zap } from "lucide-react";
import Link from "next/link";

const puzzles = [
    {
        id: 1,
        title: "Daily Sudoku Challenge",
        difficulty: "Medium",
        points: 150,
        timeLimit: "10 minutes",
        category: "Logic",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 2,
        title: "Word Connect Riddle",
        difficulty: "Easy",
        points: 100,
        timeLimit: "5 minutes",
        category: "Word",
        color: "from-purple-500 to-pink-500",
    },
    {
        id: 3,
        title: "Number Sequence Puzzle",
        difficulty: "Hard",
        points: 250,
        timeLimit: "15 minutes",
        category: "Math",
        color: "from-orange-500 to-red-500",
    },
    {
        id: 4,
        title: "Visual Pattern Match",
        difficulty: "Medium",
        points: 200,
        timeLimit: "8 minutes",
        category: "Visual",
        color: "from-green-500 to-emerald-500",
    },
    {
        id: 5,
        title: "Logic Grid Mystery",
        difficulty: "Hard",
        points: 300,
        timeLimit: "20 minutes",
        category: "Logic",
        color: "from-indigo-500 to-purple-500",
    },
    {
        id: 6,
        title: "Crossword Challenge",
        difficulty: "Easy",
        points: 120,
        timeLimit: "7 minutes",
        category: "Word",
        color: "from-pink-500 to-rose-500",
    },
];

export default function PuzzlesPage() {
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
                            <Puzzle className="w-4 h-4" />
                            <span className="text-sm font-bold">Daily Challenges • Earn Points</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Puzzles & Riddles
                        </h1>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Test your mind, solve daily challenges, and climb the leaderboard. Every puzzle solved earns you Joy Points!
                        </p>
                        <div className="flex items-center justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-accent" />
                                <span>Leaderboard</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-accent" />
                                <span>Daily Rewards</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Puzzles Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {puzzles.map((puzzle, index) => (
                            <motion.div
                                key={puzzle.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-none shadow-lg group cursor-pointer">
                                    <div className={`h-48 bg-gradient-to-br ${puzzle.color} relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                        <div className="absolute top-4 left-4">
                                            <Badge variant="accent" className="bg-white/90 text-primary">
                                                {puzzle.category}
                                            </Badge>
                                        </div>
                                        <div className="absolute bottom-4 right-4">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                                                <span className="text-2xl font-bold text-primary">+{puzzle.points}</span>
                                                <span className="text-xs text-gray-500 ml-1">JP</span>
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-accent transition-colors">
                                                {puzzle.title}
                                            </h3>
                                            <Badge
                                                variant={puzzle.difficulty === "Easy" ? "default" : puzzle.difficulty === "Medium" ? "default" : "default"}
                                                className={
                                                    puzzle.difficulty === "Easy"
                                                        ? "bg-green-100 text-green-700"
                                                        : puzzle.difficulty === "Medium"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            >
                                                {puzzle.difficulty}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {puzzle.timeLimit}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Trophy className="w-4 h-4" />
                                                {puzzle.points} JP
                                            </div>
                                        </div>

                                        <Button className="w-full rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                                            Play Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leaderboard Teaser */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Trophy className="w-16 h-16 mx-auto mb-6 text-accent" />
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">Climb the Leaderboard</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                            Compete with players worldwide. Top solvers get featured and earn bonus rewards!
                        </p>
                        <Link href="/community/wallet">
                            <Button size="lg" className="rounded-full px-8 text-lg">
                                View My Points
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

