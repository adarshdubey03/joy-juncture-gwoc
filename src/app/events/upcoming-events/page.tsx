"use client";

import { CalendarDays, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const events = [
  {
    title: "Friday Game Night 🎲",
    date: "18 Jan 2026",
    time: "7:00 PM – 10:00 PM",
    location: "Joy Juncture Studio",
    description:
      "An energetic evening filled with board games, laughter, and friendly competition. Perfect for unwinding after a long week!",
  },
  {
    title: "Deadman’s Deck Showdown 🃏",
    date: "25 Jan 2026",
    time: "6:30 PM – 9:30 PM",
    location: "Community Hall",
    description:
      "Experience our signature game Deadman’s Deck in a thrilling live showdown. Prizes, strategy, and pure fun guaranteed.",
  },
  {
    title: "Puzzle & Riddle Night 🧩",
    date: "2 Feb 2026",
    time: "7:00 PM – 9:00 PM",
    location: "Online + Offline",
    description:
      "Team up or go solo to crack mind-bending puzzles and riddles. Earn JJ Points and bragging rights!",
  },
];

export default function UpcomingEventsPage() {
  return (
    <div className="min-h-screen bg-[#FFF4D6] px-6 pt-28 pb-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2E2A24] flex items-center justify-center gap-3">
          Upcoming Events <Sparkles className="w-8 h-8 text-[#F4A300]" />
        </h1>
        <p className="mt-4 text-lg text-[#5A554B]">
          Game nights, puzzles, laughter, and unforgettable experiences — join
          the fun at Joy Juncture!
        </p>
      </div>

      {/* Events List */}
      <div className="max-w-5xl mx-auto grid gap-10">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[#2E2A24]">
                  {event.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-6 text-sm text-[#6B655A]">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    {event.date} • {event.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>

                <p className="mt-4 text-[#4B463D]">
                  {event.description}
                </p>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <Link
                  href="/events/register"
                  className="inline-flex items-center gap-2 bg-[#F4A300] text-[#2E2A24] font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform"
                >
                  Join Event <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto text-center mt-20">
        <h3 className="text-2xl font-bold text-[#2E2A24]">
          Earn JJ Points by Participating 🎁
        </h3>
        <p className="mt-3 text-[#5A554B]">
          Every event you attend brings you closer to rewards, discounts, and
          exclusive games.
        </p>
        <Link
          href="/wallet"
          className="inline-block mt-6 bg-[#2E2A24] text-white px-8 py-3 rounded-full hover:opacity-90"
        >
          View My Wallet
        </Link>
      </div>
    </div>
  );
}
