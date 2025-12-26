"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShowdownTeaser } from "@/components/play/showdown-teaser";
import { GamesGrid } from "@/components/play/games-grid";
import { HowItWorks } from "@/components/play/how-it-works";

export default function PlayPage() {
    return (
        <main className="min-h-screen bg-secondary">
            <Navbar />
            <ShowdownTeaser />
            <GamesGrid />
            <HowItWorks />
            <Footer />
        </main>
    );
}
