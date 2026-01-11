import { Clock, Users, Zap, UserCheck, Brain, Smile } from "lucide-react";
import type { Product } from "@/lib/products";

interface BadgeProps {
    product: Product;
    className?: string;
}

export function ProductCardBadges({ product, className = "" }: BadgeProps) {
    // Helper to extract clean values
    const specs = product.specifications || {};

    const time = specs["Play Time"]?.replace(" minutes", "m") || product.features.find(f => f.includes("Mins")) || "";
    const players = specs["Players"] || product.features.find(f => f.includes("Players"))?.replace(" Players", "") || "";
    const age = specs["Age"] || product.features.find(f => f.includes("+")) || "";
    const difficulty = specs["Difficulty"];
    const mood = product.mood;

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {/* Social Context: Players */}
            {players && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600 text-[11px] font-bold uppercase tracking-wide group-hover:bg-white/80 transition-colors">
                    <Users size={12} className="stroke-[2.5]" />
                    <span>{players}</span>
                </div>
            )}

            {/* Time Commitment */}
            {time && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600 text-[11px] font-bold uppercase tracking-wide group-hover:bg-white/80 transition-colors">
                    <Clock size={12} className="stroke-[2.5]" />
                    <span>{time}</span>
                </div>
            )}

            {/* Accessibility: Diff/Age */}
            {(difficulty || age) && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-600 text-[11px] font-bold uppercase tracking-wide group-hover:bg-white/80 transition-colors">
                    <Brain size={12} className="stroke-[2.5]" />
                    <span>{difficulty === "Super Easy" ? "Easy" : (difficulty || age)}</span>
                </div>
            )}

            {/* Emotional Vibe: Mood */}
            {mood && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4C752]/10 border border-[#F4C752]/20 text-neutral-700 text-[11px] font-bold uppercase tracking-wide group-hover:bg-[#F4C752]/20 transition-colors">
                    <Zap size={12} className="stroke-[2.5] text-[#F4C752] fill-[#F4C752]" />
                    <span>{mood}</span>
                </div>
            )}
        </div>
    );
}
