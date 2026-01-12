"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Grid3X3, Calculator, Rocket, Ghost, Sword } from "lucide-react";

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  href: string;
  isReady: boolean;
}

export default function GamesLibrary() {
  const games: Game[] = [
    {
      id: "sudoku",
      name: "Sudoku",
      description: "Classic number puzzle logic game.",
      icon: <Grid3X3 className="w-12 h-12 text-primary" />,
      category: "Puzzle",
      href: "/games/sudoku",
      isReady: true,
    },
    {
      id: "tetris",
      name: "Tetris",
      description: "Stack falling blocks to clear lines.",
      icon: <Gamepad2 className="w-12 h-12 text-blue-500" />,
      category: "Arcade",
      href: "/games/tetris",
      isReady: true,
    },
    {
      id: "2048",
      name: "2048",
      description: "Merge tiles to reach the number 2048.",
      icon: <Calculator className="w-12 h-12 text-yellow-500" />,
      category: "Puzzle",
      href: "/games/2024", // Folder is currently named 2024
      isReady: true,
    },
    {
      id: "snake",
      name: "Snake",
      description: "Eat apples and grow your snake.",
      icon: <Ghost className="w-12 h-12 text-green-500" />,
      category: "Arcade",
      href: "/games/snake",
      isReady: false,
    },
    {
      id: "pacman",
      name: "Pac-Man",
      description: "Navigate the maze and avoid ghosts.",
      icon: <Ghost className="w-12 h-12 text-yellow-400" />,
      category: "Arcade",
      href: "/games/pacman",
      isReady: false,
    },
    {
      id: "defender",
      name: "Defender",
      description: "Defend your ship in deep space.",
      icon: <Rocket className="w-12 h-12 text-red-500" />,
      category: "Shooter",
      href: "/games/defender",
      isReady: false,
    },
  ];

  const [filter, setFilter] = useState("All");
  const categories = ["All", "Arcade", "Puzzle", "Shooter"];

  const filteredGames =
    filter === "All" ? games : games.filter((game) => game.category === filter);

  return (
    <div className="container mx-auto px-4 py-12 pt-32">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-5xl font-black tracking-tight text-primary">
          🕹️ Game Arcade
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Play classic games right in your browser. No downloads required.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setFilter(cat)}
            variant={filter === cat ? "default" : "secondary"}
            className="rounded-full px-6"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <Link
            href={game.isReady ? game.href : "#"}
            key={game.id}
            className={!game.isReady ? "cursor-not-allowed opacity-80" : ""}
            aria-disabled={!game.isReady}
          >
            <Card className="h-full hover:shadow-lg transition-all hover:scale-105 border-border bg-card">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 bg-secondary/30 p-4 rounded-full w-fit">
                  {game.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{game.name}</CardTitle>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="outline">{game.category}</Badge>
                  {!game.isReady && <Badge variant="destructive">Coming Soon</Badge>}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  {game.description}
                </CardDescription>
                {game.isReady && (
                  <Button className="mt-4 w-full" variant="secondary">Play Now</Button>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}