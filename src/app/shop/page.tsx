// app/shop/page.tsx

import Image from "next/image";
import Link from "next/link";

const GAMES = [
  {
    slug: "dead-mans-deck",
    title: "Dead Man’s Deck",
    description:
      "A tense bluffing card game where every move could be your last.",
    players: "3–6 players",
    mood: "Strategic · Suspense",
    image: "/games/dead-mans-deck.jpg",
  },
  {
    slug: "mehfil",
    title: "Mehfil",
    description:
      "A conversational game inspired by gatherings, stories, and shared moments.",
    players: "4–8 players",
    mood: "Social · Cozy",
    image: "/games/mehfil.jpg",
  },
  {
    slug: "tamasha",
    title: "Tamasha",
    description:
      "Fast, loud, and unpredictable — a party game that thrives on chaos.",
    players: "5+ players",
    mood: "Party · Chaotic",
    image: "/games/tamasha.jpg",
  },
  {
    slug: "the-bloody-inheritance",
    title: "The Bloody Inheritance",
    description:
      "A narrative-driven murder mystery best played over an evening.",
    players: "6–10 players",
    mood: "Story · Immersive",
    image: "/games/bloody-inheritance.jpg",
  },
  {
    slug: "court52",
    title: "Court52",
    description:
      "A pickleball-inspired card game blending strategy and sport.",
    players: "2–4 players",
    mood: "Competitive · Light",
    image: "/games/court52.jpg",
  },
  {
    slug: "buzzed",
    title: "Buzzed",
    description:
      "A light-hearted drinking game built for laughs and late nights.",
    players: "4+ players",
    mood: "Party · Casual",
    image: "/games/buzzed.jpg",
  },
];

const FILTERS = {
  "Game Type": ["Card", "Board", "Party", "Mystery"],
  Occasion: ["Family", "Friends", "Date Night"],
  Players: ["2–3", "4–6", "7+"],
  "Mood / Difficulty": ["Light", "Strategic", "Chaotic"],
};

export default function ShopPage() {
  return (
    <main className="bg-[#E7E6DF] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="mb-20">
          <h1 className="font-fredoka text-5xl text-black mb-6">
            Play at Home
          </h1>
          <p className="text-neutral-700 max-w-xl text-lg">
            Games designed for living rooms, late nights, and shared tables.
          </p>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-20">
          {/* Filters */}
          <aside className="space-y-10 lg:sticky lg:top-24 h-fit">
            {Object.entries(FILTERS).map(([title, options]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-neutral-800 mb-4">
                  {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      className="
                        px-3 py-1.5 text-xs rounded-full
                        border border-neutral-400/40
                        bg-white/60
                        text-neutral-700
                        cursor-pointer
                        hover:border-[#F4C752]
                        hover:text-black
                        transition
                      "
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {GAMES.map((game) => (
              <article
                key={game.slug}
                className="
                  bg-white rounded-2xl
                  border border-neutral-200
                  p-6
                  flex flex-col gap-6
                "
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
                <div className="flex flex-col gap-3">
                  <h2 className="font-fredoka text-2xl text-black">
                    {game.title}
                  </h2>

                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {game.description}
                  </p>

                  <div className="text-xs text-neutral-500">
                    {game.players} · {game.mood}
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <Link
                      href={`/shop/${game.slug}`}
                      className="
                        inline-block text-sm text-black
                        border-b-2 border-[#F4C752]
                        pb-1
                        cursor-pointer
                        hover:opacity-80
                        transition
                      "
                    >
                      View game
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
