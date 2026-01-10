// app/shop/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";

const GAME = {
  title: "Dead Man’s Deck",
  description:
    "A tense bluffing card game where trust collapses and every decision matters.",

  // specs (aligned with filters)
  gameType: "Card Game",
  occasion: ["Friends", "Game Night"],
  players: "3–6 players",
  duration: "20–30 minutes",
  mood: "Strategic",
  difficulty: "Medium",

  badges: ["First-time friendly", "Best for groups"],
  heroImage: "/games/dead-mans-deck.jpg",

  story:
    "Dead Man’s Deck is a fast-paced bluffing game where players take risks, read the table, and decide when to push their luck. One wrong move can cost you the round — or the entire game.",

  howToPlay: [
    "Each player is dealt a hand of cards.",
    "On your turn, play a card face-down and declare its value.",
    "Other players may challenge your claim.",
    "If you are caught bluffing, you lose the round.",
  ],

  idealFor: [
    "Game nights with friends",
    "Quick competitive sessions",
    "Players who enjoy mind games",
  ],

  walkthroughImages: [
    "/games/dead-mans-deck.jpg",
    "/games/dead-mans-deck.jpg",
    "/games/dead-mans-deck.jpg",
  ],
};

export default function ProductPage() {
  return (
    <main className="bg-[#FFF4D6] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-24">
        {/* Back Link */}
        <Link
          href="/shop"
          className="text-sm text-neutral-600 hover:text-black transition"
        >
          ← Back to Play at Home
        </Link>

        {/* Hero */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-white">
            <Image
              src={GAME.heroImage}
              alt={GAME.title}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="font-fredoka text-4xl text-black">
              {GAME.title}
            </h1>

            <p className="text-neutral-700 text-lg leading-relaxed">
              {GAME.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {GAME.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs rounded-full bg-[#F4C752] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                className="
                  px-6 py-3 rounded-full
                  bg-[#F4C752]
                  text-black font-medium
                  hover:opacity-90
                  transition
                "
              >
                Add to cart
              </button>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="mt-24 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-8">
            Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-sm">
            <Spec label="Game Type" value={GAME.gameType} />
            <Spec label="Occasion" value={GAME.occasion.join(", ")} />
            <Spec label="Players" value={GAME.players} />
            <Spec label="Duration" value={GAME.duration} />
            <Spec label="Mood" value={GAME.mood} />
            <Spec label="Difficulty" value={GAME.difficulty} />
          </div>
        </section>

        {/* Story */}
        <section className="mt-28 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-6">
            The Idea Behind the Game
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            {GAME.story}
          </p>
        </section>

        {/* How to Play */}
        <section className="mt-24 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-6">
            How to Play
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-neutral-700">
            {GAME.howToPlay.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Ideal For */}
        <section className="mt-24 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-6">
            Ideal For
          </h2>
          <ul className="list-disc list-inside space-y-3 text-neutral-700">
            {GAME.idealFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Visual Walkthrough */}
        <section className="mt-28">
          <h2 className="font-fredoka text-3xl text-black mb-10">
            Visual Walkthrough
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GAME.walkthroughImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-4/3 bg-white rounded-xl overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Step ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-neutral-500 mb-1">{label}</p>
      <p className="text-neutral-800 font-medium">{value}</p>
    </div>
  );
}
