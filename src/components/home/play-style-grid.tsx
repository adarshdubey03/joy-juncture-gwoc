"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, Users, PartyPopper, Trophy } from "lucide-react";

const playStyles: PlayStyle[] = [
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

function FlipCard({ styleData }: { styleData: PlayStyle }) {
    const { title, tag, keywords, descriptionTitle, backIcon, frontIcon, theme } = styleData;
    const contourPattern = "/contour-pattern.svg?v=2"; // Path to the svg pattern

    return (
        <div className="group card w-[250px] h-[320px] bg-transparent perspective-1000">
            <div className="flip-content relative w-full h-full text-white transform-style-3d transition-transform duration-500 shadow-[0px_0px_10px_1px_#000000ee] rounded-[5px]">

                {/* BACK (Sorta the Cover) */}
                <div className="absolute inset-0 bg-[#F4C752] rounded-[5px] overflow-hidden flex justify-center items-center backface-hidden">
                    {/* Rotating Gradient Border Effect - Dynamic Color */}
                    <div className={`absolute w-[200px] h-[160%] bg-gradient-to-r from-transparent ${theme.borderGradient} to-transparent animate-rotation`} />

                    {/* Inner Content Block */}
                    <div className="absolute inset-[1px] bg-[#F4C752] rounded-[5px] flex flex-col justify-center items-center gap-[30px] z-10 p-4 text-center overflow-hidden">
                        {/* Contour Pattern Overlay */}
                        <div
                            className="absolute inset-0 opacity-30 pointer-events-none"
                            style={{ backgroundImage: `url(${contourPattern})`, backgroundSize: 'cover' }}
                        />

                        {/* Dynamic Icon */}
                        <div className="text-gray-900 relative z-10">
                            {backIcon}
                        </div>
                        <span className="text-xl font-bold tracking-wider leading-tight text-gray-900 relative z-10">{title}</span>

                    </div>
                </div>

                {/* FRONT (Revealed on Hover) */}
                <div className="absolute inset-0 bg-[#F4C752] rounded-[5px] overflow-hidden rotate-y-180 backface-hidden text-white">

                    {/* Contour Pattern Overlay */}
                    <div
                        className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{ backgroundImage: `url(${contourPattern})`, backgroundSize: 'cover' }}
                    />
                    {/* Floating Circles Background - Dynamic Colors */}
                    <div className="absolute w-full h-full object-cover pointer-events-none">
                        <div
                            className="absolute w-[90px] h-[90px] rounded-full blur-[15px] animate-floating top-0 left-0"
                            style={{ backgroundColor: theme.blobs[0] }}
                        />
                        <div
                            className="absolute w-[150px] h-[150px] rounded-full blur-[15px] animate-floating left-[50px] top-0 [animation-delay:-800ms]"
                            style={{ backgroundColor: theme.blobs[1] }}
                        />
                        <div
                            className="absolute w-[30px] h-[30px] rounded-full blur-[15px] animate-floating left-[160px] top-[-80px] [animation-delay:-1800ms]"
                            style={{ backgroundColor: theme.blobs[2] }}
                        />
                    </div>

                    {/* Front Content */}
                    <div className="absolute inset-0 p-[20px] flex flex-col justify-between z-20">
                        <span className={`px-[10px] py-[2px] rounded-[10px] backdrop-blur-[2px] w-fit text-sm font-medium ${theme.tagBg} text-white shadow-sm border border-white/10`}>
                            {tag}
                        </span>

                        <div className="w-full p-[15px] bg-[#00000099] backdrop-blur-[5px] rounded-[5px] shadow-[0px_0px_10px_5px_#00000088]">
                            <div className="flex justify-between items-start mb-2">
                                <p className="font-bold text-sm leading-tight text-white w-[80%]">
                                    {descriptionTitle}
                                </p>
                                <div className={theme.iconColor}>
                                    {frontIcon}
                                </div>
                            </div>
                            <p className="text-[#ffffff88] text-[10px] mt-[5px]">
                                {keywords}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
