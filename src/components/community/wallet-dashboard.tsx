"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, History, Trophy, Wallet } from "lucide-react";

const transactions = [
    { id: 1, action: "Won Sudoku Challenge", points: "+500", date: "Today, 10:30 AM", type: "earn" },
    { id: 2, action: "Purchased 'Dead Man's Deck'", points: "+150", date: "Yesterday", type: "earn" },
    { id: 3, action: "Redeemed 10% Discount", points: "-1000", date: "Dec 20, 2024", type: "spend" },
    { id: 4, action: "Attended Game Night", points: "+300", date: "Dec 18, 2024", type: "earn" },
];

const rewards = [
    { id: 1, title: "Free Shipping", cost: "500 JP", image: "bg-blue-100" },
    { id: 2, title: "10% Off Next Order", cost: "1000 JP", image: "bg-purple-100" },
    { id: 3, title: "Exclusive Avatar Frame", cost: "2000 JP", image: "bg-yellow-100" },
];

export function WalletDashboard() {
    return (
        <div className="space-y-8">
            {/* Balance Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-accent rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <p className="text-white/80 font-medium mb-2">Total Balance</p>
                        <h2 className="text-6xl font-bold mb-4">2,450 <span className="text-3xl">JP</span></h2>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">
                                Silver Tier
                            </div>
                            <div className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">
                                Next Tier: 550 JP to Gold
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button size="lg" className="bg-white text-accent hover:bg-gray-100 border-none shadow-lg">
                            <Gift className="w-5 h-5 mr-2" />
                            Redeem Rewards
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            <History className="w-5 h-5 mr-2" />
                            History
                        </Button>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* History */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <History className="w-6 h-6 text-accent" />
                        Recent Activity
                    </h3>

                    <div className="space-y-4">
                        {transactions.map((tx, index) => (
                            <motion.div
                                key={tx.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "earn" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                                }`}>
                                                {tx.type === "earn" ? <Trophy className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{tx.action}</p>
                                                <p className="text-xs text-gray-500">{tx.date}</p>
                                            </div>
                                        </div>
                                        <span className={`font-bold ${tx.type === "earn" ? "text-green-600" : "text-red-600"
                                            }`}>
                                            {tx.points}
                                        </span>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Rewards */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <Gift className="w-6 h-6 text-accent" />
                        Available Rewards
                    </h3>

                    <div className="space-y-4">
                        {rewards.map((reward, index) => (
                            <motion.div
                                key={reward.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className={`h-24 ${reward.image} relative`}>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                            <Button size="sm" className="rounded-full">Redeem</Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h4 className="font-bold mb-1">{reward.title}</h4>
                                        <p className="text-accent font-bold text-sm">{reward.cost}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
