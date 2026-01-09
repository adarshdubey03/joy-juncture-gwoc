"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { PlayStyleGrid } from "@/components/home/play-style-grid";
import { EventCarousel } from "@/components/home/event-carousel";
import { Testimonials } from "@/components/home/testimonials";
import { GamificationTeaser } from "@/components/home/gamification-teaser";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-24 right-4 z-50">
        <form action={logout}>
          <Button type="submit" variant="destructive">
            Sign Out (Debug)
          </Button>
        </form>
      </div>
      <Hero />
      <PlayStyleGrid />
      <EventCarousel />
      <Testimonials />
      <GamificationTeaser />
    </main>
  );
}
