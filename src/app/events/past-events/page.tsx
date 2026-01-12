import Image from "next/image";

export default function PastEventsPage() {
  return (
    <main className="bg-[#FFF4D6] text-[#2B2B2B]">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Moments We <span className="text-[#E76F51]">Created Together</span>
        </h1>

        <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
          Laughter that echoed. Friendships that started over cards.
          Nights that reminded us how good it feels to just play.
        </p>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "/blogs/UdaipurTrip.webp",
            "/event1.jpg",
            "/people_playing.jpg",
            "/story_header.jpg",
            "/event3.jpg",
            "/founders.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className="relative h-[260px] rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <Image
                src={src}
                alt="Joy Juncture Past Event"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* EVENT HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          What These Nights Felt Like
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              emoji: "😂",
              title: "Uncontrolled Laughter",
              desc: "Inside jokes, unexpected twists, and moments you can’t plan.",
            },
            {
              emoji: "🤝",
              title: "Strangers → Friends",
              desc: "People came alone. Nobody left alone.",
            },
            {
              emoji: "🔥",
              title: "Pure Game Energy",
              desc: "Intense rounds, dramatic wins, and playful chaos.",
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

      {/* PAST EVENTS LIST */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Some Nights We’ll Never Forget
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              date: "Jan 12, 2026",
              title: "Friday Fun Frenzy",
              vibe: "High-energy & laughter-packed",
            },
            {
              date: "Dec 22, 2025",
              title: "Cards & Conversations",
              vibe: "Chill games, deep laughs",
            },
            {
              date: "Dec 08, 2025",
              title: "Strategy Sunday",
              vibe: "Brains, bluffs & bragging rights",
            },
          ].map((event, i) => (
            <div
              key={i}
              className="bg-black text-white rounded-3xl p-8 hover:scale-105 transition"
            >
              <p className="text-sm text-gray-300">{event.date}</p>
              <h3 className="mt-2 text-xl font-semibold">{event.title}</h3>
              <p className="mt-2 text-gray-400">{event.vibe}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Wish You Were There?
        </h2>

        <p className="mt-4 text-gray-700 max-w-xl mx-auto">
          Good news — the next one is coming soon.
          And now you know what you’re signing up for 😉
        </p>

        <a
          href="/upcoming-events"
          className="inline-block mt-8 px-10 py-4 rounded-full bg-black text-white font-semibold hover:scale-105 transition"
        >
          Join the Next Game Night 🎲
        </a>
      </section>
    </main>
  );
}
