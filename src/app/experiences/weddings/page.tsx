"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, Music, Star, Camera } from "lucide-react";
import EnquiryForm from "@/components/experiences/EnquiryForm";

// --- Config ---
const REAL_IMAGES = {
    hero: "/experiences/wedding-hero.png", // AI Generated
    brideGroom: "/BrideGroom.png",
    mehfil: "/mehfil2.jpg",
    event: "/event1.jpg",
    people: "/people_playing.jpg",
    cafe: "/funatcafe.jpg",
    group: "/peopleplaying.jpg"
};

const SOLUTIONS = [
    {
        icon: "✨",
        title: "Interactive Fun",
        highlight: "No More Boredom",
        description: "Transform passive observation into active celebration. Games that bring families together naturally.",
        bg: "bg-[#FFF0F5]" // Lavender Blush
    },
    {
        icon: "📸",
        title: "Photo Moments",
        highlight: "Insta-Ready",
        description: "Create spontaneous, joy-filled moments that make for the most candid and beautiful photos.",
        bg: "bg-[#FFF0F5]"
    },
    {
        icon: "🎩",
        title: "Premium Style",
        highlight: "Elegant & Fun",
        description: "Sophisticated entertainment that matches your aesthetic. Classy setups that enhance your decor.",
        bg: "bg-[#FFF0F5]"
    },
];

const FORMATS = [
    {
        step: "01",
        title: "Cocktail Hour Games",
        desc: "Elegant lawn games and interactive stations to keep guests mingled and entertained during photo gaps.",
    },
    {
        step: "02",
        title: "Reception Entertainment",
        desc: "Full evening of interactive experiences woven into your celebration to keep the energy high.",
    },
    {
        step: "03",
        title: "Mehendi & Sangeet",
        desc: "Traditional pre-wedding functions elevated with competitive family games and laughter.",
    }
];

const GALLERY = [
    REAL_IMAGES.brideGroom,
    REAL_IMAGES.mehfil,
    REAL_IMAGES.event,
    REAL_IMAGES.people,
    REAL_IMAGES.cafe,
    REAL_IMAGES.group,
];

export default function WeddingsPage() {
    return (
        <main className="w-full bg-[#FFF4D6] text-[#2D2D2D] min-h-screen">

            {/* HERO SECTION */}
            <section className="px-8 md:px-16 py-28 md:py-36 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-fredoka text-5xl md:text-7xl leading-tight"
                    >
                        Weddings Guests <br />
                        Actually <br />
                        <span className="text-pink-500 underline decoration-wavy decoration-2 underline-offset-4">Enjoy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-geist text-xl text-[#2D2D2D]/80 max-w-lg"
                    >
                        Turn your celebration into an unforgettable experience. Use play to break the ice and bring two families together.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="#enquiry"
                            className="inline-block rounded-full bg-[#F4C752] px-8 py-4 font-bold text-neutral-900 shadow-md hover:scale-105 transition-transform"
                        >
                            Make It Memorable
                        </Link>
                    </motion.div>
                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <div className="relative w-full max-w-lg h-[450px] rounded-[3rem] overflow-hidden shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-all duration-500">
                        <Image
                            src={REAL_IMAGES.hero}
                            alt="Elegant wedding games"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Floating Heart Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-full shadow-lg m-8 animate-bounce">
                            <Heart className="text-pink-500 fill-pink-500 w-8 h-8" />
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO/SOLUTIONS SECTION */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-pink-100">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="font-fredoka text-4xl text-[#2D2D2D]">
                            More Than Just a Party
                        </h2>
                        <p className="font-geist text-lg text-[#2D2D2D]/70 leading-relaxed max-w-2xl mx-auto">
                            Don't let your guests get stuck in awkward small talk. We create the magic moments that turn a beautiful ceremony into a legendary party.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                            {SOLUTIONS.map((item, idx) => (
                                <div key={idx} className={`p-6 ${item.bg} rounded-2xl`}>
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="font-fredoka text-xl mb-2">{item.title}</h3>
                                    <p className="text-sm opacity-70">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FORMATS SECTION */}
            <section className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
                <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D] mb-12 text-center">
                    Perfect for Every Moment
                </h2>

                <div className="space-y-12">
                    {FORMATS.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-pink-100 border-2 border-pink-200 flex items-center justify-center font-fredoka text-2xl md:text-3xl font-bold text-pink-600">
                                {item.step}
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h3 className="font-fredoka text-2xl mb-2">{item.title}</h3>
                                <p className="font-geist text-lg text-[#2D2D2D]/70">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* GALLERY GRID */}
            <section className="px-4 md:px-8 py-16">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D]">Real Celebrations</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 h-96 md:h-80 auto-rows-[minmax(0,1fr)]">
                    {GALLERY.map((src, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${idx === 0 || idx === 3 ? 'col-span-2' : ''}`}
                        >
                            <Image src={src} alt="Wedding gallery" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ENQUIRY SECTION */}
            <div id="enquiry" className="py-24 px-4">
                <EnquiryForm
                    headline="Let's Plan Your Day"
                    subtext="Share your wedding vision with us. We'll handle the entertainment."
                    ctaText="Get a Custom Proposal"
                    experienceType="wedding"
                />
            </div>

        </main>
    );
}
