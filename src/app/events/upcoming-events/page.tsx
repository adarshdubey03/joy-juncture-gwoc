import Image from "next/image";

export default function GameNightsPage() {
  return (
    <main className="bg-[#FFF4D6] text-[#2B2B2B]">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Game Nights That <span className="text-[#E76F51]">Feel Like Home</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            Laughter. Friendly chaos. New people. Old-school fun.
            Step into a night where phones go down and joy levels go up.
          </p>

          <button className="mt-8 px-8 py-4 rounded-full bg-black text-white font-semibold hover:scale-105 transition">
            Join the Next Game Night 🎉
          </button>
        </div>

        {/* VISUAL */}
        <div className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/images/game-night.jpg"
            alt="Joy Juncture Game Night"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          What Happens at Our Game Nights?
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Easy-to-Learn Games",
              desc: "No pressure. No experience needed. We explain everything.",
              emoji: "🎲",
            },
            {
              title: "Great People",
              desc: "Come solo or with friends. Leave with new ones.",
              emoji: "🤝",
            },
            {
              title: "Pure Fun Energy",
              desc: "Music, laughs, snacks, and zero awkwardness.",
              emoji: "✨",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="text-4xl">{item.emoji}</div>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Upcoming Game Nights
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              date: "Feb 15, 2026",
              title: "Board Games & Icebreakers",
              location: "Joy Juncture HQ",
            },
            {
              date: "Mar 01, 2026",
              title: "Cards, Chaos & Comedy",
              location: "Community Café",
            },
            {
              date: "Mar 16, 2026",
              title: "Strategy Night Special",
              location: "Open Play Arena",
            },
          ].map((event, i) => (
            <div
              key={i}
              className="bg-black text-white rounded-3xl p-8 flex flex-col justify-between hover:scale-105 transition"
            >
              <div>
                <p className="text-sm text-gray-300">{event.date}</p>
                <h3 className="mt-2 text-xl font-semibold">{event.title}</h3>
                <p className="mt-2 text-gray-400">{event.location}</p>
              </div>

              <button className="mt-6 px-6 py-3 bg-[#E76F51] rounded-full font-semibold hover:bg-[#d45f44] transition">
                Reserve My Spot →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          One Night. Endless Memories.
        </h2>
        <p className="mt-4 text-gray-700 max-w-xl mx-auto">
          If you’ve been waiting for a sign to step out, meet people,
          and genuinely have fun — this is it.
        </p>

        <button className="mt-8 px-10 py-4 rounded-full bg-black text-white font-semibold hover:scale-105 transition">
          I’m In 🎉
        </button>
      </section>
    </main>
  );
}
