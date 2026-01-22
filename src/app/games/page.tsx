"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Grid3X3, Calculator, Rocket, Ghost, Trophy, PlayCircle, Lock } from "lucide-react";

// --- Types ---
interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  href: string;
  isReady: boolean;
  color: string;
}

// --- Data ---
const GAMES: Game[] = [
  {
    id: "sudoku",
    name: "Sudoku",
    description: "Challenge your logic with the classic number puzzle.",
    icon: <Grid3X3 size={32} className="text-white" />,
    category: "Puzzle",
    href: "/games/sudoku",
    isReady: true,
    color: "bg-blue-500",
  },
  {
    id: "tetris",
    name: "Tetris",
    description: "The timeless block-stacking arcade phenomenon.",
    icon: <Gamepad2 size={32} className="text-white" />,
    category: "Arcade",
    href: "/games/tetris",
    isReady: true,
    color: "bg-purple-500",
  },
  {
    id: "2048",
    name: "2048",
    description: "Slide and merge tiles to reach the legendary number.",
    icon: <Calculator size={32} className="text-white" />,
    category: "Puzzle",
    href: "/games/2024", // Folder is currently named 2024 as per existing code
    isReady: true,
    color: "bg-orange-500",
  },
  {
    id: "snake",
    name: "Snake",
    description: "Grow endlessly without biting your own tail.",
    icon: <Ghost size={32} className="text-white" />,
    category: "Arcade",
    href: "/games/snake",
    isReady: false,
    color: "bg-green-500",
  },
  {
    id: "pacman",
    name: "Pac-Man",
    description: "Chomp dots and dodge ghosts in the maze.",
    icon: <Ghost size={32} className="text-white" />,
    category: "Arcade",
    href: "/games/pacman",
    isReady: false,
    color: "bg-yellow-500",
  },
  {
    id: "defender",
    name: "Defender",
    description: "Defend humanity against waves of alien invaders.",
    icon: <Rocket size={32} className="text-white" />,
    category: "Shooter",
    href: "/games/defender",
    isReady: false,
    color: "bg-red-500",
  },
];

const CATEGORIES = ["All", "Arcade", "Puzzle", "Shooter"];

export default function GamesLibrary() {
  const [filter, setFilter] = useState("All");

  const filteredGames =
    filter === "All" ? GAMES : GAMES.filter((game) => game.category === filter);

  return (
    <main className="w-full bg-[#FFF4D6] text-[#2D2D2D] min-h-screen">

      {/* HERO SECTION */}
      <section className="px-8 md:px-16 py-28 md:py-36 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-[#F4C752]/20 px-4 py-2 rounded-full text-[#2D2D2D] font-bold text-sm tracking-wide"
          >
            <Trophy size={16} className="text-orange-500" />
            <span>FREE ONLINE ARCADE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-fredoka text-5xl md:text-7xl leading-tight"
          >
            Play to Pause. <br />
            <span className="text-[#F4C752] drop-shadow-sm">Play to Connect.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-geist text-xl text-[#2D2D2D]/80 max-w-lg"
          >
            Dive into our collection of browser-based classics. Whether you have 5 minutes or an hour, we've got a game for you.
          </motion.p>
        </div>

        <div className="flex-1 w-full flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="relative w-full max-w-lg aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            <Image
              src="/play/games-hero.png"
              alt="Retro modern game arcade"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* GAMES LIBRARY SECTION */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24">

        {/* FILTERS */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300
                ${filter === cat
                  ? "bg-[#2D2D2D] text-white shadow-lg scale-105"
                  : "bg-white text-[#2D2D2D] hover:bg-[#F4C752]/20 hover:scale-105 border border-[#2D2D2D]/5"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={game.id}
              >
                <Link
                  href={game.isReady ? game.href : "#"}
                  className={`
                    group relative block h-full bg-white rounded-[2rem] p-2 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#2D2D2D]/5
                    ${!game.isReady ? "cursor-not-allowed opacity-80 grayscale-[0.5]" : "hover:-translate-y-2"}
                  `}
                >
                  {/* Card Body */}
                  <div className="relative h-full flex flex-col items-center text-center p-8 pt-12 rounded-[1.5rem] bg-[#FFF9E5] group-hover:bg-[#FFF4D6] transition-colors">

                    {/* Icon Circle */}
                    <div className={`
                      w-20 h-20 rounded-2xl ${game.color} flex items-center justify-center shadow-inner mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300
                    `}>
                      {game.icon}
                    </div>

                    <h3 className="font-fredoka text-2xl mb-3 text-[#2D2D2D]">{game.name}</h3>
                    <p className="font-geist text-sm text-[#2D2D2D]/60 mb-8 line-clamp-2">
                      {game.description}
                    </p>

                    {/* Action Area */}
                    <div className="mt-auto">
                      {game.isReady ? (
                        <span className="inline-flex items-center gap-2 text-[#2D2D2D] font-bold text-sm group-hover:text-orange-600 transition-colors">
                          <PlayCircle size={20} />
                          Play Now
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-[#2D2D2D]/40 font-bold text-sm">
                          <Lock size={18} />
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-fredoka text-[#2D2D2D]/40">No games found in this category yet!</p>
          </div>
        )}

      </section>

    </main>
  );
}
