// app/experiences/weddings/page.tsx

import Image from "next/image";

export default function WeddingExperiencesPage() {
  return (
    <main className="bg-[#FFF4D6] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-28">

        {/* HERO */}
        <section className="mb-32">
          <h1 className="font-fredoka text-5xl text-black mb-6 leading-tight">
            Entertainment that belongs at a wedding.
          </h1>
          <p className="text-neutral-700 text-lg max-w-2xl">
            We design play-led moments that complement the celebration —
            creating connection without ever interrupting the flow of the day.
          </p>
        </section>

        {/* COMMON MISTAKE */}
        <section className="mb-32 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-8">
            When entertainment becomes a distraction
          </h2>

          <p className="text-neutral-700 leading-relaxed mb-6">
            At many weddings, entertainment competes for attention — pulling
            guests away from conversations, ceremonies, and shared moments.
          </p>

          <p className="text-neutral-700 leading-relaxed">
            Joy Juncture focuses on subtle engagement that fits naturally into
            the wedding environment, allowing guests to participate at their
            own pace.
          </p>
        </section>

        {/* WHAT WE CURATE */}
        <section className="mb-32">
          <h2 className="font-fredoka text-3xl text-black mb-12">
            What we curate for weddings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ExperienceCard
              title="Entertainment Hampers"
              description="Beautifully designed game hampers placed across guest areas for casual, optional play."
            />
            <ExperienceCard
              title="Side-event Engagement"
              description="Light play formats for mehendi, cocktail evenings, or post-ceremony gatherings."
            />
            <ExperienceCard
              title="Guest Interaction Moments"
              description="Conversation-led experiences that encourage guests to connect beyond small talk."
            />
          </div>
        </section>

        {/* VISUAL PROOF */}
        <section className="mb-32">
          <h2 className="font-fredoka text-3xl text-black mb-12">
            Designed for real wedding spaces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-4/3 rounded-xl bg-white overflow-hidden"
              >
                <Image
                  src="/experiences/wedding-placeholder.jpg"
                  alt="Wedding experience"
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
            Plan a wedding experience
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
              placeholder="Wedding details (date, location, guest size)"
              className="px-4 py-3 rounded-lg border border-neutral-300 bg-white"
            />
            <textarea
              placeholder="Tell us about the atmosphere you want to create"
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
