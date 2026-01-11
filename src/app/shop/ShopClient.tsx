"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/generated/prisma/client";
import AddToCartButton from "@/components/cart/AddToCartButton";

type ShopClientProps = {
    products: Product[];
};

const FILTERS = {
    "Game Type": ["Card", "Party", "Mystery"],
    Occasion: ["Family", "Friends", "Game Night"],
    Mood: ["Light", "Strategic", "Chaotic"],
};

export default function ShopClient({ products }: ShopClientProps) {
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
        // Mapping backend fields to filter logic
        // category -> Game Type
        // occasion -> Occasion
        // mood -> Mood

        // Check Game Type (category)
        const typeOk =
            activeFilters["Game Type"].length === 0 ||
            activeFilters["Game Type"].includes(game.category);

        // Check Occasion
        const occasionOk =
            activeFilters["Occasion"].length === 0 ||
            game.occasion.some((o) => activeFilters["Occasion"].includes(o));

        // Check Mood
        const moodOk =
            activeFilters["Mood"].length === 0 ||
            activeFilters["Mood"].includes(game.mood);

        return typeOk && occasionOk && moodOk;
    });

    return (
        <main className="bg-[#FFF4D6] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-24">
                {/* Header */}
                <header className="mb-16">
                    <h1 className="font-fredoka text-5xl text-black mb-6">
                        Play at Home
                    </h1>
                    <p className="text-neutral-700 max-w-xl text-lg">
                        Games designed for living rooms, late nights, and shared tables.
                    </p>
                </header>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16">
                    {/* Filters */}
                    <aside className="space-y-10 lg:sticky lg:top-24 h-fit">
                        {Object.entries(FILTERS).map(([title, options]) => (
                            <div key={title}>
                                <h3 className="text-sm font-medium text-neutral-800 mb-4">
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
                          px-3 py-1.5 text-xs rounded-full
                          border
                          ${active
                                                        ? "bg-[#F4C752] border-[#F4C752] text-black"
                                                        : "border-neutral-400/40 bg-white/60 text-neutral-700"
                                                    }
                          transition
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
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-14">
                        {filteredGames.map((game) => (
                            <article
                                key={game.id}
                                className="bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-6"
                            >
                                {/* Image */}
                                <div className="relative w-full aspect-4/3 bg-neutral-50 rounded-xl overflow-hidden">
                                    {game.image ? (
                                        <Image
                                            src={game.image}
                                            alt={game.name}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-3 flex-1">
                                    <h2 className="font-fredoka text-2xl text-black">
                                        {game.name}
                                    </h2>

                                    <p className="text-neutral-700 text-sm leading-relaxed">
                                        {game.description}
                                    </p>

                                    {/* Specifications */}
                                    <div className="text-xs text-neutral-500 space-y-1">
                                        <div>Type: {game.category}</div>
                                        <div>Players: {game.players}</div>
                                        <div>Mood: {game.mood}</div>
                                    </div>
                                </div>

                                {/* CTAs */}
                                <div className="flex gap-3 pt-4">
                                    <Link
                                        href={`/shop/${game.slug}`}
                                        className="flex-1 text-center text-sm font-medium bg-[#F4C752] text-black py-2.5 rounded-full hover:opacity-90 transition"
                                    >
                                        View product
                                    </Link>

                                    <AddToCartButton
                                        product={{
                                            id: game.id,
                                            slug: game.slug,
                                            name: game.name,
                                            price: game.price,
                                            image: game.image,
                                        }}
                                        variant="outline"
                                        className="flex-1"
                                    />
                                </div>
                            </article>
                        ))}

                        {filteredGames.length === 0 && (
                            <p className="text-neutral-600">
                                No games match your filters.
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
