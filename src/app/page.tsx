"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { PlayStyleGrid } from "@/components/home/play-style-grid";
import { EventCarousel } from "@/components/home/event-carousel";
import { Testimonials } from "@/components/home/testimonials";
import { GamificationTeaser } from "@/components/home/gamification-teaser";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PlayStyleGrid />
      <EventCarousel />
      <Testimonials />
      <GamificationTeaser />
    </main>
  );
}
