"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PartyPopper, Gift, Cake, Star, Music } from "lucide-react";
import EnquiryForm from "@/components/experiences/EnquiryForm";

// --- Config ---
const REAL_IMAGES = {
    hero: "/experiences/birthday-hero.png", // AI Generated
    kids: "/birthdays/kids-party.jpg",
    adults: "/birthdays/adult-party.jpg",
    family: "/birthdays/family-party.jpg",
    group: "/people_playing.jpg",
    cafe: "/funatcafe.jpg",
    event: "/event1.jpg"
};

const SOLUTIONS = [
    {
        icon: "🎉",
        title: "Non-Stop Fun",
        highlight: "High Energy",
        description: "No more awkward lulls. We keep the energy high with games that adapt to your crowd's vibe.",
        bg: "bg-blue-50"
    },
    {
        icon: "🧩",
        title: "Everyone Connects",
        highlight: "Inclusive Play",
        description: "Watch different friend groups and generations bond over shared laughter and friendly competition.",
        bg: "bg-purple-50"
    },
    {
        icon: "🎨",
        title: "Your Style",
        highlight: "Personalized",
        description: "From superhero themes to elegant adult soirées, we customize the experience to match you.",
        bg: "bg-yellow-50"
    },
];

const FORMATS = [
    {
        step: "01",
        title: "Kids Birthday Parties",
        desc: "High-energy game zones designed for young adventurers. We handle the chaos, you handle the cake.",
    },
    {
        step: "02",
        title: "Adult Celebrations",
        desc: "Sophisticated game experiences for grown-up gatherings. Perfect for milestones, 30ths, 40ths, and 50ths.",
    },
    {
        step: "03",
        title: "Family Gatherings",
        desc: "Multi-generational games that Grandma and the grandkids can enjoy together. No one gets left out.",
    }
];

const GALLERY = [
    REAL_IMAGES.group,
    REAL_IMAGES.event,
    REAL_IMAGES.cafe,
    REAL_IMAGES.kids,
    REAL_IMAGES.adults,
    REAL_IMAGES.family,
];

export default function BirthdaysPage() {
    return (
        <main className="w-full bg-[#FFF4D6] text-[#2D2D2D] min-h-screen">

            {/* HERO SECTION */}
            <section className="px-6 md:px-12 py-20 md:py-36 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-fredoka text-4xl md:text-6xl leading-tight"
                    >
                        Birthdays Worth <br />
                        <span className="text-blue-500 underline decoration-wavy decoration-2 underline-offset-4">Remembering</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-geist text-lg md:text-xl text-[#2D2D2D]/80 max-w-lg"
                    >
                        Create moments of pure joy that your guests will cherish forever. No boring parties allowed.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="#enquiry"
                            className="inline-block rounded-full bg-[#F4C752] px-8 py-3 font-bold text-neutral-900 shadow-md hover:scale-105 transition-transform"
                        >
                            Plan Your Party
                        </Link>
                    </motion.div>
                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <div className="relative w-full max-w-md h-[380px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white -rotate-2 hover:rotate-0 transition-all duration-500">
                        <Image
                            src={REAL_IMAGES.hero}
                            alt="Joyful birthday party"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Floating Badge */}
                        <div className="absolute -top-6 -right-6 bg-white p-3 rounded-full shadow-lg m-8 animate-bounce">
                            <PartyPopper className="text-blue-500 w-8 h-8" />
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO/SOLUTIONS SECTION */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-blue-100">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D]">
                            Bringing the Magic
                        </h2>
                        <p className="font-geist text-lg text-[#2D2D2D]/70 leading-relaxed max-w-2xl mx-auto">
                            Stop worrying about entertaining your guests. We bring the fun, the games, and the energy so you can actually enjoy your own party.
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
                    Party Your Way
                </h2>

                <div className="space-y-12">
                    {FORMATS.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center font-fredoka text-2xl md:text-3xl font-bold text-blue-600">
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
                    <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D]">Pure Joy in Action</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 h-96 md:h-80 auto-rows-[minmax(0,1fr)]">
                    {GALLERY.map((src, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${idx === 0 || idx === 3 ? 'col-span-2' : ''}`}
                        >
                            <Image src={src} alt="Birthday gallery" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ENQUIRY SECTION */}
            <div id="enquiry" className="py-24 px-4">
                <EnquiryForm
                    headline="Let's Get This Party Started"
                    subtext="Tell us who we're celebrating and we'll handle the rest."
                    ctaText="Book Your Experience"
                    experienceType="birthday"
                />
            </div>

        </main>
    );
}
