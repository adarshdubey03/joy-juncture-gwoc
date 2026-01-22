"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ShowdownPage() {
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
                        The Ultimate <br />
                        Game Night <br />
                        Showdown
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-geist text-xl text-[#2D2D2D]/80 max-w-lg"
                    >
                        Enter the arena where friendship meets friendly rivalry. Joy Juncture Showdown isn't just a game—it's an event.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/events"
                            className="inline-block rounded-full bg-[#F4C752] px-8 py-4 font-bold text-neutral-900 shadow-md hover:scale-105 transition-transform"
                        >
                            Find a Game Night
                        </Link>
                    </motion.div>
                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <div className="relative w-full max-w-lg h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-[#F4C752]">
                        <Image
                            src="/play/showdown-hero.png"
                            alt="Friends playing Joy Juncture Showdown"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* WHAT IS SHOWDOWN? */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-[#F4C752]/20">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <h2 className="font-fredoka text-4xl text-[#2D2D2D]">
                            What is the Showdown?
                        </h2>
                        <p className="font-geist text-lg text-[#2D2D2D]/70 leading-relaxed">
                            The Joy Juncture Showdown is our signature competitive experience designed for groups who love high energy and big laughs.
                            It combines rapid-fire trivia, physical challenges, and strategic mini-games into one cohesive battle for glory.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                            <div className="p-6 bg-[#FFF9E5] rounded-2xl">
                                <div className="text-4xl mb-4">⏱️</div>
                                <h3 className="font-fredoka text-xl mb-2">Fast-Paced</h3>
                                <p className="text-sm opacity-70">Think fast, move faster. Every second counts in the arena.</p>
                            </div>
                            <div className="p-6 bg-[#FFF9E5] rounded-2xl">
                                <div className="text-4xl mb-4">🤝</div>
                                <h3 className="font-fredoka text-xl mb-2">Team Based</h3>
                                <p className="text-sm opacity-70">Rally your squad. Victory tastes sweeter when shared.</p>
                            </div>
                            <div className="p-6 bg-[#FFF9E5] rounded-2xl">
                                <div className="text-4xl mb-4">🏆</div>
                                <h3 className="font-fredoka text-xl mb-2">Epic Rewards</h3>
                                <p className="text-sm opacity-70">It's not just about winning; it's about the bragging rights.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
                <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D] mb-12 text-center">
                    How It All Goes Down
                </h2>

                <div className="space-y-12">
                    {[
                        {
                            step: "01",
                            title: "Gather Your Crew",
                            desc: "Assemble your team of 4-8 players. Whether it's coworkers, family, or your weekend gaming group, you'll need a mix of brains and brawn."
                        },
                        {
                            step: "02",
                            title: "Choose Your Mode",
                            desc: "Select from our curated playlists: 'Brain Busters', 'Physical Feats', or the 'Chaos Mix' for a little bit of everything."
                        },
                        {
                            step: "03",
                            title: "Battle for Supremacy",
                            desc: "Engage in 5 rounds of intense gameplay. Points are tracked live, keeping the tension high until the final buzzer."
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
                        Ready to Prove Yourself?
                    </h2>
                    <p className="font-geist text-lg opacity-80 mb-8 relative z-10">
                        The arena awaits. Book your slot for the next Joy Juncture Showdown and show us what you've got.
                    </p>
                    <Link
                        href="/events"
                        className="relative z-10 inline-block rounded-full bg-[#F4C752] px-10 py-4 font-bold text-neutral-900 hover:bg-white transition-colors"
                    >
                        Book Now
                    </Link>
                </div>
            </section>

        </main>
    );
}
