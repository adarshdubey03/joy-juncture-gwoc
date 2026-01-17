"use client";

import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // Removed framer-motion
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";
import { Filter, X } from "lucide-react";

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
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
            <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 md:py-32 relative z-10">
                {/* Header */}
                <header className="mb-8 md:mb-16">
                    <h1 className="font-fredoka text-4xl md:text-6xl text-black mb-6 tracking-tight">
                        Play at Home
                    </h1>
                    <p className="text-neutral-700 max-w-xl text-xl leading-relaxed">
                        Games designed for living rooms, late nights, and shared tables.
                    </p>
                </header>

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#F4C752] border border-black/5 rounded-xl font-bold text-black shadow-sm active:scale-95 transition-transform"
                    >
                        <Filter size={20} />
                        Filters
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 md:gap-16">
                    {/* Mobile Filter Overlay */}
                    <div
                        className={`
                            fixed inset-0 z-50 bg-[#FFF4D6] p-6 overflow-y-auto transition-all duration-300 ease-in-out lg:hidden
                            ${mobileFiltersOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}
                        `}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-fredoka text-black">Filters</h2>
                            <button
                                onClick={() => setMobileFiltersOpen(false)}
                                className="p-2 bg-white rounded-full border border-neutral-200 shadow-sm"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-8">
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
                                                      px-4 py-2 text-sm rounded-xl font-medium border transition-all duration-200
                                                      ${active
                                                            ? "bg-[#F4C752] border-[#F4C752] text-black shadow-md scale-105"
                                                            : "border-neutral-400/30 bg-white/50 text-neutral-600 active:bg-white"
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
                        </div>

                        <div className="mt-12 pt-6 border-t border-black/5">
                            <button
                                onClick={() => setMobileFiltersOpen(false)}
                                className="w-full py-4 bg-black text-[#F4C752] rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                            >
                                Show {filteredGames.length} Games
                            </button>
                        </div>
                    </div>

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block space-y-12 lg:sticky lg:top-24 h-fit">
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
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        {filteredGames.map((game) => (
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
