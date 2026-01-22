"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Smile, Building2, CheckCircle2, Star } from "lucide-react";
import EnquiryForm from "@/components/experiences/EnquiryForm";

// --- Config ---
const REAL_IMAGES = {
    hero: "/experiences/corporate-hero.png", // AI Generated
    office1: "/corporate/real-office-session-1.jpg",
    office2: "/corporate/real-office-session-2.jpg",
    team: "/corporate/real-team-games.jpg",
    people: "/people_playing.jpg",
    event: "/event1.jpg",
    cafe: "/funatcafe.jpg"
};

const SOLUTIONS = [
    {
        icon: "🚀",
        title: "100% Participation",
        highlight: "Inclusive Play",
        description: "Games designed for introverts, extroverts, and everyone in between.",
        bg: "bg-[#FFF9E5]"
    },
    {
        icon: "🤝",
        title: "Real Connection",
        highlight: "Natural Bonding",
        description: "Silos break comfortably when you're laughing together. Colleagues become teammates.",
        bg: "bg-[#FFF9E5]"
    },
    {
        icon: "✨",
        title: "Custom Fit",
        highlight: "On-Brand",
        description: "Your brand, your vibe. Every experience is tailored to your company culture.",
        bg: "bg-[#FFF9E5]"
    },
];

const FORMATS = [
    {
        step: "01",
        title: "Office Takeover",
        desc: "We turn your workspace into a play arena. Perfect for Fridays, Team Lunches, or Milestone Celebrations.",
    },
    {
        step: "02",
        title: "Offsite Retreats",
        desc: "Full-day immersive experiences away from desks. Ideal for Annual Meetings, Strategy Days, and Kickoffs.",
    },
    {
        step: "03",
        title: "Lunch & Play",
        desc: "Quick 60-min power sessions to recharge the team. Great for mid-week energy boosts and project completions.",
    }
];

const GALLERY = [
    REAL_IMAGES.office1,
    REAL_IMAGES.office2,
    REAL_IMAGES.team,
    REAL_IMAGES.people,
    REAL_IMAGES.event,
    REAL_IMAGES.cafe,
];

export default function CorporatePage() {
    return (
        <main className="w-full bg-[#FFF4D6] text-[#2D2D2D] min-h-screen">

            {/* HERO SECTION - Matches Showdown Style */}
            <section className="px-8 md:px-16 py-28 md:py-36 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-fredoka text-5xl md:text-6xl leading-tight"
                    >
                        Team Building <br />
                        That Doesn't <br />
                        <span className="text-red-500 underline decoration-wavy decoration-2 underline-offset-4">Suck</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-geist text-xl text-[#2D2D2D]/80 max-w-lg"
                    >
                        Stop forcing your team into awkward mixers. Give them an experience they’ll actually talk about on Monday.
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
                            Plan Your Event
                        </Link>
                    </motion.div>
                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <div className="relative w-full max-w-lg h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-[#F4C752]">
                        <Image
                            src={REAL_IMAGES.hero}
                            alt="Corporate team building"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* INTRO/SOLUTIONS SECTION - Matches "What is Showdown?" Card */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-[#F4C752]/20">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="font-fredoka text-4xl text-[#2D2D2D]">
                            We Make Teams Click
                        </h2>
                        <p className="font-geist text-lg text-[#2D2D2D]/70 leading-relaxed max-w-2xl mx-auto">
                            Forget the trust falls. We use the psychology of play to build genuine psychological safety and connection.
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

            {/* FORMATS SECTION - Matches "How It All Goes Down" */}
            <section className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
                <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D] mb-12 text-center">
                    Choose Your Playstyle
                </h2>

                <div className="space-y-12">
                    {FORMATS.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#F4C752] flex items-center justify-center font-fredoka text-2xl md:text-3xl font-bold text-neutral-900">
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
                    <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D]">Teams in Action</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 h-96 md:h-80 auto-rows-[minmax(0,1fr)]">
                    {GALLERY.map((src, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${idx === 0 || idx === 3 ? 'col-span-2' : ''}`}
                        >
                            <Image src={src} alt="Gallery" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ENQUIRY SECTION */}
            <div id="enquiry" className="py-24 px-4">
                <EnquiryForm
                    headline="Ready to Level Up?"
                    subtext="Tell us about your team. We'll handle the rest."
                    ctaText="Get Custom Proposal"
                    experienceType="corporate"
                />
            </div>

        </main>
    );
}
