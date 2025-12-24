import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, Users, PartyPopper, Trophy } from "lucide-react";

const playStyles = [
    {
        title: "Play at Home",
        description: "Shop games for your collection",
        href: "/shop",
        gradient: "from-[#0a5f7b] to-[#1e8ab6]",
        icon: Home,
        pillar: "Games & Products",
    },
    {
        title: "Play Together (Live)",
        description: "Join events & game nights",
        href: "/events",
        gradient: "from-purple-700 to-indigo-500",
        icon: Users,
        pillar: "Events & Experiences",
    },
    {
        title: "Play for Occasions",
        description: "Corporate, weddings & more",
        href: "/experiences",
        gradient: "from-orange-600 to-red-500",
        icon: PartyPopper,
        pillar: "Custom Experiences",
    },
    {
        title: "Play & Earn Points",
        description: "Gamification & rewards",
        href: "/community/wallet",
        gradient: "from-pink-600 to-rose-400",
        icon: Trophy,
        pillar: "Community & Gamification",
    },
];

export function PlayStyleGrid() {
    return (
        <section className="py-24 bg-gradient-to-b from-white via-secondary/30 to-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{ backgroundImage: "url('/contour-pattern.svg')", backgroundSize: "400px" }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Play Style</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Four ways to experience joy. Each path leads to unforgettable moments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                    {playStyles.map((style, index) => {
                        const Icon = style.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    href={style.href}
                                    className={cn(
                                        "group block overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative h-[400px]",
                                        `bg-gradient-to-br ${style.gradient}`
                                    )}
                                >
                                    {/* Animated background effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Gradient Overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                    {/* Pillar badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-white/30">
                                            {style.pillar}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                                        <div className="mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <h4 className="text-2xl md:text-3xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                                                {style.title}
                                            </h4>
                                            <p className="text-white/90 text-sm font-medium">
                                                {style.description}
                                            </p>
                                        </div>

                                        {/* Arrow indicator */}
                                        <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                                            Explore <span>→</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
