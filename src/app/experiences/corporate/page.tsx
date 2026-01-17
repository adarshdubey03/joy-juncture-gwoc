"use client";

import { ArrowRight, Frown, Users, Coffee, Rocket, Smile, Building2, Zap, Trophy, Target, Layout } from "lucide-react";
import ExperienceHero from "@/components/experiences/ExperienceHero";
import ProblemCards from "@/components/experiences/ProblemCards";
import SolutionCards from "@/components/experiences/SolutionCards";
import ExperienceFormats from "@/components/experiences/ExperienceFormats";
import MomentsGallery from "@/components/experiences/MomentsGallery";
import TrustSection from "@/components/experiences/TrustSection";
import EnquiryForm from "@/components/experiences/EnquiryForm";

export default function CorporatePage() {
    const problemCards = [
        {
            icon: <Frown className="w-8 h-8 text-red-500" />,
            title: "Forced Fun",
            description: "Reviewing spreadsheets isn't a party. Neither are generic icebreakers.",
        },
        {
            icon: <Users className="w-8 h-8 text-orange-500" />,
            title: "Ghost Town",
            description: "Low attendance? It's not them, it's the boring event.",
        },
        {
            icon: <Coffee className="w-8 h-8 text-amber-700" />,
            title: "Awkward Silence",
            description: "Nothing kills distinct culture faster than stale conversation.",
        },
        {
            icon: <Target className="w-8 h-8 text-blue-500" />,
            title: "Zero ROI",
            description: "Events that cost money but don't build real bonds.",
        },
    ];

    const solutionCards = [
        {
            icon: <Rocket className="w-10 h-10 text-blue-600" />,
            title: "100% Participation",
            highlight: "Inclusive Play",
            description:
                "Games so good, even 'Busy Bob' from accounting joins in. We design for introverts, extroverts, and everyone in between.",
        },
        {
            icon: <Smile className="w-10 h-10 text-yellow-500" />,
            title: "Real Connection",
            highlight: "Natural Bonding",
            description:
                "Silos break comfortably when you're laughing together. We create moments that turn colleagues into teammates.",
        },
        {
            icon: <Building2 className="w-10 h-10 text-purple-600" />,
            title: "Custom Fit",
            highlight: "On-Brand",
            description:
                "Your brand, your vibe. We don't do cookie-cutter. Every experience is tailored to your company culture.",
        },
    ];

    const formats = [
        {
            title: "Office Takeover",
            whatItIs: "We turn your workspace into a play arena.",
            whenItWorks: "Fridays, Team Lunches, Milestone Celebrations",
            whoItsFor: "Teams wanting maximum impact with zero travel.",
            imagePath: "/corporate/real-office-session-1.jpg",
        },
        {
            title: "Offsite Retreats",
            whatItIs: "Full-day immersive experiences away from desks.",
            whenItWorks: "Annual Meetings, Strategy Days, Kickoffs",
            whoItsFor: "Companies looking for deep team alignment.",
            imagePath: "/corporate/real-office-session-2.jpg",
        },
        {
            title: "Lunch & Play",
            whatItIs: "Quick 60-min power sessions recharge the team.",
            whenItWorks: "Mid-week energy boosts, Project completions",
            whoItsFor: "Busy teams needing a quick, effective break.",
            imagePath: "/corporate/real-team-games.jpg",
        },
    ];

    const galleryImages = [
        "/corporate/real-office-session-1.jpg",
        "/corporate/real-office-session-2.jpg",
        "/corporate/real-team-games.jpg",
        "/people_playing.jpg",
        "/event1.jpg",
        "/funatcafe.jpg",
    ];

    const trustPoints = [
        {
            number: "01",
            title: "Data Driven",
            description: "We track engagement so you can see the results.",
        },
        {
            number: "02",
            title: "Zero Hassle",
            description: "We handle setup, hosting, and cleanup. You just show up.",
        },
        {
            number: "03",
            title: "Scalable Fun",
            description: "From 10 to 1000+ employees, we have the format.",
        },
        {
            number: "04",
            title: "Professional Hosts",
            description: "High-energy facilitators that keep the vibe perfect.",
        },
    ];

    return (
        <>
            <ExperienceHero
                category="CORPORATE & TEAM BUILDING"
                headline="Team Building That Doesn't Suck"
                subheadline="Stop forcing your team into awkward mixers. Give them an experience they’ll actually talk about on Monday."
                ctaText="Plan Your Event"
                ctaHref="#enquiry"
                backgroundGradient="from-[#FFF4D6] via-[#FFE8B3] to-[#F4C752]/40"
                accentColor="#F4C752"
                decorations={
                    <>
                        {/* Circle */}
                        <div className="absolute top-24 right-24 w-64 h-64 rounded-full bg-[#F4C752]/20 blur-3xl" />
                        {/* Triangle/Shape */}
                        <svg className="absolute bottom-32 left-20 w-32 h-32 text-[#F4C752]/20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 22h20L12 2z" />
                        </svg>
                        {/* Dotted Pattern */}
                        <div className="absolute top-1/2 right-10 w-24 h-24 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                    </>
                }
            />

            <ProblemCards
                sectionTitle="Why Typical Events Fail"
                cards={problemCards}
            />

            <SolutionCards
                sectionTitle="We Make Teams Click"
                cards={solutionCards}
            />

            <ExperienceFormats
                sectionTitle="Choose Your Playstyle"
                formats={formats}
            />

            <MomentsGallery
                sectionTitle="Teams in Action"
                images={galleryImages}
            />

            <TrustSection
                sectionTitle="Why HR Leaders Trust Us"
                points={trustPoints}
            />

            <div id="enquiry">
                <EnquiryForm
                    headline="Ready to Play?"
                    subtext="Tell us about your team. We'll handle the rest."
                    ctaText="Get Custom Proposal"
                    experienceType="corporate"
                />
            </div>
        </>
    );
}
