"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ticket, Users, Megaphone, FerrisWheel, Tent } from "lucide-react";
import EnquiryForm from "@/components/experiences/EnquiryForm";

// --- Config ---
const REAL_IMAGES = {
    hero: "/experiences/carnival-hero.png", // AI Generated
    event: "/carnivals/real-event.jpg",
    college: "/carnivals/college-fest.jpg",
    mega: "/carnivals/corporate-mega.jpg",
    group: "/people_playing.jpg",
    day: "/event1.jpg",
    night: "/gamenight1.jpg"
};

const SOLUTIONS = [
    {
        icon: "🎡",
        title: "Massive Scale",
        highlight: "1000+ Guests",
        description: "Built for crowds. We manage flow, queues, and engagement so thousands can play without chaos.",
        bg: "bg-red-50"
    },
    {
        icon: "⚡",
        title: "High Voltage",
        highlight: "Non-Stop Action",
        description: "Zero dead zones. Every corner of your venue buzzes with energy, music, and interactive fun.",
        bg: "bg-teal-50"
    },
    {
        icon: "👷",
        title: "Turnkey Ops",
        highlight: "Professional",
        description: "We handle the logistics—setup, safety, staffing, and teardown. You just take the credit.",
        bg: "bg-yellow-50"
    },
];

const FORMATS = [
    {
        step: "01",
        title: "College Fests",
        desc: "High-energy arenas for students. Competitive zones, leaderboards, and viral challenges that take over campus.",
    },
    {
        step: "02",
        title: "Corporate Melas",
        desc: "Family days on a massive scale. Safe, inclusive fun for employees and their families, handled end-to-end.",
    },
    {
        step: "03",
        title: "City Festivals",
        desc: "Public events that need reliable entertainment infrastructure. We keep the crowds happy and moving.",
    }
];

const GALLERY = [
    REAL_IMAGES.event,
    REAL_IMAGES.mega,
    REAL_IMAGES.college,
    REAL_IMAGES.group,
    REAL_IMAGES.day,
    REAL_IMAGES.night,
];

export default function CarnivalsPage() {
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
                        Events That <br />
                        Command <br />
                        <span className="text-red-500 underline decoration-wavy decoration-2 underline-offset-4">Attention</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-geist text-lg md:text-xl text-[#2D2D2D]/80 max-w-lg"
                    >
                        Transform massive gatherings into unforgettable experiences. Professional-grade entertainment for professional-grade events.
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
                            Scale Your Event
                        </Link>
                    </motion.div>
                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <div className="relative w-full max-w-md h-[380px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-all duration-500">
                        <Image
                            src={REAL_IMAGES.hero}
                            alt="Carnival experience"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-full shadow-lg m-8 animate-bounce">
                            <Ticket className="text-red-500 w-8 h-8" />
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO/SOLUTIONS SECTION */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-red-100">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D]">
                            Built for the Big Stage
                        </h2>
                        <p className="font-geist text-lg text-[#2D2D2D]/70 leading-relaxed max-w-2xl mx-auto">
                            Managing thousands of attendees isn't easy. We provide the infrastructure, the games, and the flow control to turn a crowd into a community.
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
                    Deploy Anywhere
                </h2>

                <div className="space-y-12">
                    {FORMATS.map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-red-100 border-2 border-red-200 flex items-center justify-center font-fredoka text-2xl md:text-3xl font-bold text-red-600">
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
                    <h2 className="font-fredoka text-3xl md:text-4xl text-[#2D2D2D]">Epic Scale Events</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 h-96 md:h-80 auto-rows-[minmax(0,1fr)]">
                    {GALLERY.map((src, idx) => (
                        <div
                            key={idx}
                            className={`relative rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${idx === 0 || idx === 3 ? 'col-span-2' : ''}`}
                        >
                            <Image src={src} alt="Carnival gallery" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ENQUIRY SECTION */}
            <div id="enquiry" className="py-24 px-4">
                <EnquiryForm
                    headline="Ready to Go Big?"
                    subtext="Tell us about your event scale and venue. We'll handle the rest."
                    ctaText="Get Custom Proposal"
                    experienceType="carnival"
                />
            </div>

        </main>
    );
}
