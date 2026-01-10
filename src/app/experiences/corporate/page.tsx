// app/experiences/birthdays/page.tsx

import Image from "next/image";

export default function BirthdayExperiencesPage() {
  return (
    <main className="bg-[#FFF4D6] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-28">

        {/* HERO */}
        <section className="mb-32">
          <h1 className="font-fredoka text-5xl text-black mb-6 leading-tight">
            Birthdays that feel personal.
          </h1>
          <p className="text-neutral-700 text-lg max-w-2xl">
            We design birthday experiences that bring people together — through
            play, conversation, and moments that feel genuinely shared.
          </p>
        </section>

        {/* PROBLEM */}
        <section className="mb-32 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-8">
            When birthdays start to feel repetitive
          </h2>

          <p className="text-neutral-700 leading-relaxed mb-6">
            Many birthday celebrations follow the same pattern — a cake, a few
            conversations, and a room that slowly loses energy.
          </p>

          <p className="text-neutral-700 leading-relaxed">
            Joy Juncture focuses on designing moments that invite everyone into
            the celebration, not just the people who already know each other.
          </p>
        </section>

        {/* WHAT WE DESIGN */}
        <section className="mb-32">
          <h2 className="font-fredoka text-3xl text-black mb-12">
            What we design for birthdays
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ExperienceCard
              title="Theme-based Play"
              description="Curated game experiences designed around moods, personalities, or inside jokes."
            />
            <ExperienceCard
              title="Small Group Gatherings"
              description="Intimate formats for close friends and family, where everyone stays involved."
            />
            <ExperienceCard
              title="Age-agnostic Experiences"
              description="Designed for adults, mixed-age groups, and anyone who wants something different."
            />
          </div>
        </section>

        {/* VISUAL PROOF */}
        <section className="mb-32">
          <h2 className="font-fredoka text-3xl text-black mb-12">
            Moments from past celebrations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-4/3 rounded-xl bg-white overflow-hidden"
              >
                <Image
                  src="/experiences/birthday-placeholder.jpg"
                  alt="Birthday experience"
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
            Plan a birthday experience
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
              placeholder="Occasion details (age, group size, location)"
              className="px-4 py-3 rounded-lg border border-neutral-300 bg-white"
            />
            <textarea
              placeholder="Tell us what kind of celebration you’re imagining"
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
