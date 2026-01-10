// app/shop/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Game = {
  slug: string;
  title: string;
  description: string;
  players: string;
  image: string;

  // specs (used by filters)
  gameType: string;
  occasion: string[];
  mood: string;
};

const GAMES: Game[] = [
  {
    slug: "dead-mans-deck",
    title: "Dead Man’s Deck",
    description:
      "A tense bluffing card game where every move could be your last.",
    players: "3–6 players",
    mood: "Strategic",
    gameType: "Card",
    occasion: ["Friends", "Game Night"],
    image: "/games/dead-mans-deck.jpg",
  },
  {
    slug: "mehfil",
    title: "Mehfil",
    description:
      "A conversational game inspired by gatherings, stories, and shared moments.",
    players: "4–8 players",
    mood: "Cozy",
    gameType: "Party",
    occasion: ["Family", "Friends"],
    image: "/games/mehfil.jpg",
  },
  {
    slug: "tamasha",
    title: "Tamasha",
    description:
      "Fast, loud, and unpredictable — a party game that thrives on chaos.",
    players: "5+ players",
    mood: "Chaotic",
    gameType: "Party",
    occasion: ["Friends"],
    image: "/games/tamasha.jpg",
  },
  {
    slug: "the-bloody-inheritance",
    title: "The Bloody Inheritance",
    description:
      "A narrative-driven murder mystery best played over an evening.",
    players: "6–10 players",
    mood: "Strategic",
    gameType: "Mystery",
    occasion: ["Game Night"],
    image: "/games/bloody-inheritance.jpg",
  },
  {
    slug: "court52",
    title: "Court52",
    description:
      "A pickleball-inspired card game blending strategy and sport.",
    players: "2–4 players",
    mood: "Light",
    gameType: "Card",
    occasion: ["Friends"],
    image: "/games/court52.jpg",
  },
  {
    slug: "buzzed",
    title: "Buzzed",
    description:
      "A light-hearted drinking game built for laughs and late nights.",
    players: "4+ players",
    mood: "Chaotic",
    gameType: "Party",
    occasion: ["Friends"],
    image: "/games/buzzed.jpg",
  },
];

const FILTERS = {
  "Game Type": ["Card", "Party", "Mystery"],
  Occasion: ["Family", "Friends", "Game Night"],
  Mood: ["Light", "Strategic", "Chaotic"],
};

export default function ShopPage() {
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

  const filteredGames = GAMES.filter((game) => {
    const typeOk =
      activeFilters["Game Type"].length === 0 ||
      activeFilters["Game Type"].includes(game.gameType);

    const occasionOk =
      activeFilters["Occasion"].length === 0 ||
      game.occasion.some((o) => activeFilters["Occasion"].includes(o));

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
                          ${
                            active
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
                key={game.slug}
                className="bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-6"
              >
                {/* Image */}
                <div className="relative w-full aspect-4/3 bg-neutral-50 rounded-xl overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 flex-1">
                  <h2 className="font-fredoka text-2xl text-black">
                    {game.title}
                  </h2>

                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {game.description}
                  </p>

                  {/* Specifications */}
                  <div className="text-xs text-neutral-500 space-y-1">
                    <div>Type: {game.gameType}</div>
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

                  <button
                    className="flex-1 text-center text-sm font-medium border border-[#F4C752] text-black py-2.5 rounded-full hover:bg-[#F4C752] transition"
                  >
                    Add to cart
                  </button>
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
