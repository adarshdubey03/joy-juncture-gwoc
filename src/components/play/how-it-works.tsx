"use client";

import { motion } from "framer-motion";
import { Gamepad2, Trophy, Gift, UserPlus } from "lucide-react";

const steps = [
    {
        icon: Gamepad2,
        title: "Pick Your Game",
        description: "Choose from our library of board games or free online challenges.",
    },
    {
        icon: UserPlus,
        title: "Play & Compete",
        description: "Join a live match, host a game night, or solve a daily puzzle.",
    },
    {
        icon: Trophy,
        title: "Earn Joy Points",
        description: "Every win and every purchase adds points to your wallet.",
    },
    {
        icon: Gift,
        title: "Redeem Rewards",
        description: "Use your points for discounts, exclusive merch, and more.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
                    <p className="text-gray-500 text-lg">Start your journey to joy in four simple steps.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-white border-4 border-accent flex items-center justify-center mb-6 shadow-xl relative z-10">
                                    <step.icon className="w-8 h-8 text-accent" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed max-w-xs">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
