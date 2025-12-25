"use client";

import Link from "next/link";
import { User, Users, Trophy, Palette, Compass, Map, Crown, Lightbulb } from "lucide-react";
import React from "react";

// Types for our card configuration
interface PlayStyle {
    title: string;
    href: string;
    tag: string; // e.g., "1 Player", "2-5 Players"
    keywords: string; // e.g., "Immersion | Focus | Fun"
    descriptionTitle: React.ReactNode;
    frontIcon: React.ReactNode; // Icon on the revealed side
    backIcon: React.ReactNode; // Icon on the cover side (border side)
    theme: {
        borderGradient: string; // Tailwind class for the rotating border gradient
        blobs: string[]; // Array of hex codes for the 3 blobs
        tagBg: string; // Background for the tag
        iconColor: string;
    };
}

const playStyles: PlayStyle[] = [
    {
        title: "Solo Adventures",
        href: "/play/solo",
        tag: "1 Player",
        keywords: "Immersion | Focus | Fun",
        descriptionTitle: <>Solo Campaigns &<br />Challenges</>,
        backIcon: <User size={60} strokeWidth={1.5} />,
        frontIcon: <Compass size={20} />,
        theme: {
            borderGradient: "via-[#ff9966]",
            blobs: ["#ffbb66", "#ff8866", "#ff2233"],
            tagBg: "bg-[#ff9966]/20",
            iconColor: "text-[#ff9966]"
        }
    },
    {
        title: "Group Quests",
        href: "/play/group",
        tag: "2-5 Players",
        keywords: "Teamwork | Strategy | Bonding",
        descriptionTitle: <>Co-op Missions &<br />Party Games</>,
        backIcon: <Users size={60} strokeWidth={1.5} />,
        frontIcon: <Map size={20} />,
        theme: {
            borderGradient: "via-[#8b5cf6]", // Violet
            blobs: ["#a78bfa", "#8b5cf6", "#7c3aed"],
            tagBg: "bg-[#8b5cf6]/20",
            iconColor: "text-[#8b5cf6]"
        }
    },
    {
        title: "Competitive Arenas",
        href: "/play/competitive",
        tag: "Multiplayer",
        keywords: "Skill | Rank | Glory",
        descriptionTitle: <>Ranked Matches &<br />Tournaments</>,
        backIcon: <Trophy size={60} strokeWidth={1.5} />,
        frontIcon: <Crown size={20} />,
        theme: {
            borderGradient: "via-[#ef4444]", // Red
            blobs: ["#fca5a5", "#ef4444", "#b91c1c"],
            tagBg: "bg-[#ef4444]/20",
            iconColor: "text-[#ef4444]"
        }
    },
    {
        title: "Creative Workshops",
        href: "/play/creative",
        tag: "Any Size",
        keywords: "Build | Share | Inspire",
        descriptionTitle: <>Level Editors &<br />Asset Creation</>,
        backIcon: <Palette size={60} strokeWidth={1.5} />,
        frontIcon: <Lightbulb size={20} />,
        theme: {
            borderGradient: "via-[#ec4899]", // Pink
            blobs: ["#f9a8d4", "#ec4899", "#be185d"],
            tagBg: "bg-[#ec4899]/20",
            iconColor: "text-[#ec4899]"
        }
    },
];

export function PlayStyleGrid() {
    return (
        <section className="py-20 bg-transparent">
            {/* Inject Global Keyframes */}
            <style jsx global>{`
                @keyframes rotation {
                    0% { transform: rotateZ(0deg); }
                    100% { transform: rotateZ(360deg); }
                }
                @keyframes floating {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-rotation {
                    animation: rotation 5000ms infinite linear;
                }
                .animate-floating {
                    animation: floating 2600ms infinite linear;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                .group:hover .flip-content {
                    transform: rotateY(180deg);
                }
            `}</style>

            <div className="container mx-auto px-6 max-w-6xl">
                <h2 className="font-heading text-4xl font-bold text-center mb-16 text-gray-800">Choose Your Play Style</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
                    {playStyles.map((style, index) => (
                        <Link key={index} href={style.href} className="group transition-transform duration-300 hover:-translate-y-2">
                            <FlipCard styleData={style} />
                        </Link>
                    ))}
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
