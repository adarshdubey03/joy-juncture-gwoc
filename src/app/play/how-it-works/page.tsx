"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HowItWorksPage() {
    return (
        <main className="w-full bg-[#FFF4D6] text-[#2D2D2D] min-h-screen">
            {/* HERO SECTION */}
            <section className="px-8 md:px-16 py-28 md:py-36 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-fredoka text-5xl md:text-6xl leading-tight"
                    >
                        How to <br />
                        Level Up Your <br />
                        Game Night
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-geist text-xl text-[#2D2D2D]/80 max-w-lg"
                    >
                        New to Joy Juncture? No sweat. Here's everything you need to know to jump into the action and start making memories.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/shop"
                            className="inline-block rounded-full bg-[#F4C752] px-8 py-4 font-bold text-neutral-900 shadow-md hover:scale-105 transition-transform"
                        >
                            Explore Games
                        </Link>
                    </motion.div>
                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <div className="relative w-full max-w-lg h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-[#F4C752]">
                        <Image
                            src="/play/how-it-works-hero.png"
                            alt="How Joy Juncture Games Work"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* CORE PHILOSOPHY */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-[#F4C752]/20">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <h2 className="font-fredoka text-4xl text-[#2D2D2D]">
                            More Than Just Rules
                        </h2>
                        <p className="font-geist text-lg text-[#2D2D2D]/70 leading-relaxed">
                            We believe the best games are easy to learn but hard to master. Our collection is curated to ensure that setup time is minimal, so you can spend less time reading rulebooks and more time laughing with your friends.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                            <div className="p-6 bg-[#FFF9E5] rounded-2xl">
                                <div className="text-4xl mb-4">📖</div>
                                <h3 className="font-fredoka text-xl mb-2">Simple Rules</h3>
                                <p className="text-sm opacity-70">Clear, concise instructions that get you playing in minutes.</p>
                            </div>
                            <div className="p-6 bg-[#FFF9E5] rounded-2xl">
                                <div className="text-4xl mb-4">🎨</div>
                                <h3 className="font-fredoka text-xl mb-2">Visual Guides</h3>
                                <p className="text-sm opacity-70">Many of our games come with quick-start video guides.</p>
                            </div>
                            <div className="p-6 bg-[#FFF9E5] rounded-2xl">
                                <div className="text-4xl mb-4">🧩</div>
                                <h3 className="font-fredoka text-xl mb-2">For Everyone</h3>
                                <p className="text-sm opacity-70">Games designed for all ages and skill levels.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STEP BY STEP */}
            <section className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
                <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D] mb-12 text-center">
                    The Joy Juncture Way
                </h2>

                <div className="space-y-12">
                    {[
                        {
                            step: "01",
                            title: "Pick Your Vibe",
                            desc: "Are you in the mood for strategy, chaos, or storytelling? Filter our shop by 'Mood' to find the perfect match for your group."
                        },
                        {
                            step: "02",
                            title: "Unbox & Setup",
                            desc: "Pop the lid! We organize our boxes to make setup intuitive. Separate the decks, place the board, and deal the cards."
                        },
                        {
                            step: "03",
                            title: "Play & Connect",
                            desc: "The magic happens around the table. Don't worry about being perfect; focus on the fun, the banter, and the shared experience."
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#F4C752] flex items-center justify-center font-fredoka text-2xl md:text-3xl font-bold text-neutral-900">
                                {item.step}
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="font-fredoka text-2xl mb-2">{item.title}</h3>
                                <p className="font-geist text-lg text-[#2D2D2D]/70">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="px-8 md:px-16 py-24 text-center">
                <div className="max-w-2xl mx-auto bg-[#2D2D2D] rounded-[3rem] p-12 text-white relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#F4C752]/20 rounded-full translate-x-1/3 translate-y-1/3" />

                    <h2 className="font-fredoka text-3xl md:text-4xl mb-6 relative z-10">
                        Ready to Play?
                    </h2>
                    <p className="font-geist text-lg opacity-80 mb-8 relative z-10">
                        Dive into our collection and find your next favorite game. The table is set, and we're just waiting for you.
                    </p>
                    <Link
                        href="/shop"
                        className="relative z-10 inline-block rounded-full bg-[#F4C752] px-10 py-4 font-bold text-neutral-900 hover:bg-white transition-colors"
                    >
                        Shop Games
                    </Link>
                </div>
            </section>

        </main>
    );
}
