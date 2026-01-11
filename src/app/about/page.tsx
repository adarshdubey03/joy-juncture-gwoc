import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full bg-[#F4C752] text-black">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[90vh] grid grid-cols-1 md:grid-cols-2">
        {/* LEFT — Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16">
          <h1 className="font-fredoka text-4xl md:text-5xl leading-tight">
            Where games turn into memories.
          </h1>

          <p className="mt-6 text-base md:text-lg text-black/80 font-geist max-w-xl">
            Joy Juncture is built on one simple belief — games aren’t just things
            you play. They’re moments you remember, stories you share, and bonds
            you build.
          </p>

          <p className="mt-4 text-base md:text-lg text-black/80 font-geist max-w-xl">
            From living rooms to large events, we design experiences that bring
            people closer — naturally, joyfully, and playfully.
          </p>
        </div>

        {/* RIGHT — Visual */}
        <div className="relative hidden md:block">
          <Image
            src="/joy-juncture-team.jpg"
            alt="People playing games together"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section className="bg-white px-8 md:px-16 py-20">
        <h2 className="font-fredoka text-3xl md:text-4xl">
          Games are not products.
        </h2>

        <p className="mt-6 font-geist text-black/80 max-w-3xl">
          In a world full of screens and scrolling, Joy Juncture exists to bring
          people back together — around tables, laughter, and shared moments.
        </p>

        <p className="mt-4 font-geist text-black/80 max-w-3xl">
          Every game, event, and experience we create is designed to spark
          conversations, break ice, and turn strangers into teammates.
        </p>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="px-8 md:px-16 py-20">
        <h2 className="font-fredoka text-3xl md:text-4xl mb-12">
          How people play with Joy Juncture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-fredoka text-2xl">Play at Home</h3>
            <p className="mt-3 font-geist text-black/70">
              Thoughtfully designed card and board games for friends, families,
              and first-time players.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-fredoka text-2xl">Play Together (Live)</h3>
            <p className="mt-3 font-geist text-black/70">
              Game nights, workshops, and hosted sessions that turn gatherings
              into unforgettable experiences.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-fredoka text-2xl">Play for Occasions</h3>
            <p className="mt-3 font-geist text-black/70">
              Custom-designed games for corporates, weddings, birthdays, and
              large-scale events.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-fredoka text-2xl">Play & Belong</h3>
            <p className="mt-3 font-geist text-black/70">
              A growing community with points, puzzles, online games, and stories
              that reward participation and curiosity.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOUNDER STORY ================= */}
      <section className="bg-white px-8 md:px-16 py-20">
        <h2 className="font-fredoka text-3xl md:text-4xl">
          Why Joy Juncture began
        </h2>

        <p className="mt-6 font-geist text-black/80 max-w-3xl">
          Joy Juncture started with a simple question — why do some moments stay
          with us long after they end?
        </p>

        <p className="mt-4 font-geist text-black/80 max-w-3xl">
          The answer was always the same: people, play, and presence. What began
          as small game nights slowly grew into a movement focused on designing
          joy — one experience at a time.
        </p>
      </section>

      {/* ================= COMMUNITY ================= */}
      <section className="px-8 md:px-16 py-20">
        <h2 className="font-fredoka text-3xl md:text-4xl mb-6">
          Built by players, for players
        </h2>

        <p className="font-geist text-black/80 max-w-3xl">
          Every laugh, every inside joke, every shared victory shapes Joy
          Juncture. Our community is at the heart of everything we build.
        </p>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="bg-black text-white px-8 md:px-16 py-20">
        <h2 className="font-fredoka text-3xl md:text-4xl">
          Come play with us.
        </h2>

        <p className="mt-4 font-geist text-white/80 max-w-2xl">
          Whether you’re here to discover a game, attend an event, or simply
          belong — your next jz                               oyful moment starts here.
        </p>
      </section>
    </main>
  );
}
