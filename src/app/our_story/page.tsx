import Image from "next/image";

export default function FoundersPage() {
  return (
    <main className="w-full bg-[#FFF4D6] text-black">

      {/* INTRO */}
      <section className="px-8 md:px-16 py-28 max-w-4xl">
        <h1 className="font-fredoka text-4xl md:text-5xl leading-tight">
          An accidental beginning.
        </h1>

        <p className="mt-6 font-geist text-lg text-black/80">
          No family legacy. No master plan.
          Just two people, a lot of ideas, and an unhealthy love for games.
        </p>
      </section>

      {/* TIMELINE */}
      <section className="bg-white px-8 md:px-16 py-24">
        <div className="max-w-5xl space-y-16">

          {/* STEP 1 */}
          <div>
            <h3 className="font-fredoka text-2xl">It started with chaos</h3>
            <p className="mt-3 font-geist text-black/70">
              Game nights, rule fights, laughter, and the realization that
              these moments stayed longer than most things.
            </p>
          </div>

          {/* STEP 2 */}
          <div>
            <h3 className="font-fredoka text-2xl">The risky decision</h3>
            <p className="mt-3 font-geist text-black/70">
              Walking away from predictable paths (textiles and electricals)
              to try something uncertain — but joyful.
            </p>
          </div>

          {/* STEP 3 */}
          <div>
            <h3 className="font-fredoka text-2xl">Joy Juncture was born</h3>
            <p className="mt-3 font-geist text-black/70">
              What began as random ideas slowly turned into real games,
              real experiences, and a growing community.
            </p>
          </div>

        </div>
      </section>

      {/* FOUNDERS */}
      <section className="px-8 md:px-16 py-24">
        <h2 className="font-fredoka text-3xl md:text-4xl mb-12">
          Meet the founders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          <div className="bg-white rounded-3xl overflow-hidden">
            <div className="relative h-72">
              <Image src="/khushi.jpg" alt="Khushi Poddar" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-fredoka text-2xl">Khushi Poddar</h3>
              <p className="font-geist text-black/60">Dreamer-in-Chief</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden">
            <div className="relative h-72">
              <Image src="/muskan.jpg" alt="Muskan Poddar" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-fredoka text-2xl">Muskan Poddar</h3>
              <p className="font-geist text-black/60">Design Whiz</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
