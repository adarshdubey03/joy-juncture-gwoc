"use client";

import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // Removed framer-motion
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/generated/prisma/client";

const FILTERS = {
    "Game Type": ["Card Game", "Party Game", "Mystery", "Strategy", "Puzzle"],
    Occasion: ["Family", "Friends", "Game Night", "Party"],
    Mood: ["Light", "Strategic", "Chaotic", "Cozy"],
};

export default function ShopClient({ products }: { products: Product[] }) {
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
        "Game Type": [],
        Occasion: [],
        Mood: [],
    });

    function toggleFilter(group: string, value: string) {
        setActiveFilters((prev) => {
            const exists = prev[group].includes(value);
            return {
                ...prev,
                [group]: exists
                    ? prev[group].filter((v) => v !== value)
                    : [...prev[group], value],
            };
        });
    }

    const filteredGames = products.filter((game) => {
        const typeOk =
            activeFilters["Game Type"].length === 0 ||
            activeFilters["Game Type"].includes(game.category);

        const occasionOk =
            activeFilters["Occasion"].length === 0 ||
            game.occasion?.some((o) => activeFilters["Occasion"].includes(o));

        const moodOk =
            activeFilters["Mood"].length === 0 ||
            (game.mood && activeFilters["Mood"].includes(game.mood));

        return typeOk && occasionOk && moodOk;
    });

    return (
        <main className="bg-[#FFF4D6] min-h-screen relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />
            <div className="max-w-7xl mx-auto px-4 py-32 relative z-10">
                {/* Header */}
                <header className="mb-16">
                    <h1 className="font-fredoka text-6xl text-black mb-6 tracking-tight">
                        Play at Home
                    </h1>
                    <p className="text-neutral-700 max-w-xl text-xl leading-relaxed">
                        Games designed for living rooms, late nights, and shared tables.
                    </p>
                </header>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16">
                    {/* Filters */}
                    <aside className="space-y-12 lg:sticky lg:top-24 h-fit">
                        {Object.entries(FILTERS).map(([title, options]) => (
                            <div key={title}>
                                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4">
                                    {title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {options.map((option) => {
                                        const active = activeFilters[title]?.includes(option);

                                        return (
                                            <button
                                                key={option}
                                                onClick={() => toggleFilter(title, option)}
                                                className={`
                          px-4 py-2 text-sm rounded-xl font-medium
                          border transition-all duration-200
                          ${active
                                                        ? "bg-[#F4C752] border-[#F4C752] text-black shadow-md scale-105"
                                                        : "border-neutral-400/30 bg-white/50 text-neutral-600 hover:bg-white hover:border-neutral-400"
                                                    }
                        `}
                                            >
                                                {option}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Cards */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {filteredGames.map((game) => (
                            // @ts-ignore
                            <ProductCard key={game.slug} product={game} />
                        ))}

                        {filteredGames.length === 0 && (
                            <div className="col-span-2 text-center py-20">
                                <div className="bg-white/50 rounded-3xl p-10 inline-block">
                                    <p className="text-neutral-500 text-lg">
                                        No games match your filters. Try clearing them!
                                    </p>
                                    <button
                                        onClick={() => setActiveFilters({ "Game Type": [], Occasion: [], Mood: [] })}
                                        className="mt-4 text-[#F4C752] font-bold underline decoration-2 hover:text-black transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
