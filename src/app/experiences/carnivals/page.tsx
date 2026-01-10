// app/experiences/carnivals/page.tsx

import Image from "next/image";

export default function CarnivalExperiencesPage() {
  return (
    <main className="bg-[#FFF4D6] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-28">

        {/* HERO */}
        <section className="mb-32">
          <h1 className="font-fredoka text-5xl text-black mb-6 leading-tight">
            Large-scale play, thoughtfully designed.
          </h1>
          <p className="text-neutral-700 text-lg max-w-2xl">
            We design carnival-style experience zones that handle scale —
            creating movement, choice, and energy without confusion.
          </p>
        </section>

        {/* THE CHALLENGE */}
        <section className="mb-32 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-8">
            The challenge with large gatherings
          </h2>

          <p className="text-neutral-700 leading-relaxed mb-6">
            Large events often struggle with overcrowding, idle guests, and
            uneven engagement. Without structure, energy becomes noise.
          </p>

          <p className="text-neutral-700 leading-relaxed">
            Joy Juncture approaches large-scale play as a system — designing
            multiple experience zones that guests can move through naturally.
          </p>
        </section>

        {/* OUR APPROACH */}
        <section className="mb-32 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-8">
            Our approach to experience zones
          </h2>

          <p className="text-neutral-700 leading-relaxed">
            Each zone is designed with a clear purpose, capacity, and rhythm.
            Guests choose how they engage, facilitators manage flow, and the
            overall experience remains balanced.
          </p>
        </section>

        {/* WHAT WE BUILD */}
        <section className="mb-32">
          <h2 className="font-fredoka text-3xl text-black mb-12">
            What we build for carnivals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ExperienceCard
              title="Multiple Play Zones"
              description="Distinct zones offering different styles of play, allowing guests to explore freely."
            />
            <ExperienceCard
              title="Facilitated & Self-run Activities"
              description="A mix of guided and independent formats to keep participation fluid."
            />
            <ExperienceCard
              title="Scalable Engagement Design"
              description="Experiences that adapt to crowd size without losing quality or clarity."
            />
          </div>
        </section>

        {/* VISUAL PROOF */}
        <section className="mb-32">
          <h2 className="font-fredoka text-3xl text-black mb-12">
            Designed for scale and movement
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-4/3 rounded-xl bg-white overflow-hidden"
              >
                <Image
                  src="/experiences/carnival-placeholder.jpg"
                  alt="Carnival experience"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ENQUIRY FORM */}
        <section className="max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-8">
            Plan a large-scale experience
          </h2>

          <form className="grid grid-cols-1 gap-6">
            <input
              type="text"
              placeholder="Your name"
              className="px-4 py-3 rounded-lg border border-neutral-300 bg-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg border border-neutral-300 bg-white"
            />
            <input
              type="text"
              placeholder="Event details (type, expected crowd size)"
              className="px-4 py-3 rounded-lg border border-neutral-300 bg-white"
            />
            <textarea
              placeholder="Tell us about the scale and flow you’re aiming for"
              rows={4}
              className="px-4 py-3 rounded-lg border border-neutral-300 bg-white"
            />

            <button
              type="button"
              className="
                mt-4 w-fit
                px-6 py-3 rounded-full
                bg-[#F4C752]
                text-black font-medium
                hover:opacity-90
                transition
              "
            >
              Send enquiry
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}

function ExperienceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <h3 className="font-fredoka text-xl text-black mb-3">
        {title}
      </h3>
      <p className="text-neutral-700 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
