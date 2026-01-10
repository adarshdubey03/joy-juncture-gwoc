import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function WhatsHappeningNow() {
  return (
    <section className="w-full bg-[#FFF4D6] py-24">
      <div className="mx-auto max-w-7xl ">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <h2 className="text-4xl font-semibold text-neutral-900">
            What’s happening now
          </h2>
          <p className="mt-3 text-neutral-600">
            Moments unfolding across play, puzzles, and people.
          </p>
        </div>

        {/* Cards Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Large Card */}
          <div className="col-span-12 md:col-span-7">
            <Card
              bg="bg-[#b1653b]"
              label="Event"
              title="Saturday Game Night"
              subtitle="Play together, hosted live"
              image="/event-placeholder.png"
              large
            />
          </div>

          {/* Right Stacked Cards */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
            <Card
              bg="bg-[#059669]"
              label="Puzzle"
              title="Weekly Brain Teaser"
              subtitle="Solve anytime this week"
              image="/puzzle-placeholder.png"
            />

            <Card
              bg="bg-[#DC2626]"
              label="New"
              title="New Cooperative Card Game"
              subtitle="Fresh ways to play at home"
              image="/game-placeholder.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Card                                     */
/* -------------------------------------------------------------------------- */

function Card({
  bg,
  label,
  title,
  subtitle,
  image,
  large = false,
}: {
  bg: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  large?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${bg} p-8 text-white transition-transform duration-300 hover:-translate-y-1`}
      style={{ minHeight: large ? "440px" : "212px" }}
    >
      {/* Top-left Content */}
      <div className="relative z-10 max-w-[85%]">
        <span className="text-sm font-medium opacity-80">{label}</span>

        <h3 className="mt-3 text-2xl font-semibold leading-snug">
          {title}
        </h3>

        <p className="mt-2 text-sm opacity-90">
          {subtitle}
        </p>
      </div>

      {/* Center Image */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          width={large ? 240 : 180}
          height={large ? 240 : 180}
          className="opacity-90"
        />
      </div>

      {/* Arrow CTA */}
      <div className="absolute bottom-6 right-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-300 hover:scale-105">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
}
