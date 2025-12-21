"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Grid, Puzzle, Trophy } from "lucide-react";

const games = [
    {
        id: "sudoku",
        title: "Sudoku Challenge",
        description: "25+ variants including Killer, Samurai, and Hyper Sudoku.",
        icon: Grid,
        color: "bg-blue-500",
        players: "12k Played",
        reward: "500 JP",
    },
    {
        id: "riddles",
        title: "Riddle Me This",
        description: "Solve daily riddles and unlock mystery badges.",
        icon: Brain,
        color: "bg-purple-500",
        players: "8k Played",
        reward: "200 JP",
    },
    {
        id: "puzzles",
        title: "Visual Puzzles",
        description: "Spot the difference, pattern matching, and logic grids.",
        icon: Puzzle,
        color: "bg-green-500",
        players: "15k Played",
        reward: "300 JP",
    },
];

export function GamesGrid() {
    return (
        <section className="py-24 bg-secondary">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Free Online Games</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Sharpen your mind and earn Joy Points with our collection of daily challenges.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-none shadow-md overflow-hidden">
                                <div className={`h-2 bg-gradient-to-r ${game.color.replace("bg-", "from-")} to-white`} />
                                <CardContent className="p-8">
                                    <div className={`w-16 h-16 rounded-2xl ${game.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <game.icon className={`w-8 h-8 ${game.color.replace("bg-", "text-")}`} />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                                        {game.title}
                                    </h3>
                                    <p className="text-gray-500 mb-6 leading-relaxed">
                                        {game.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm font-medium text-gray-400 border-t border-gray-100 pt-6">
                                        <span>{game.players}</span>
                                        <div className="flex items-center text-accent">
                                            <Trophy className="w-4 h-4 mr-1" />
                                            {game.reward}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
