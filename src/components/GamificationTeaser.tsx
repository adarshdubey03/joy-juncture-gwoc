export default function GamificationTeaser() {
  return (
    <section className="w-full bg-[#FFF4D6] py-32">
      <div className="mx-auto max-w-360 px-8 flex flex-col">
        {/* Header — LEFT ALIGNED */}
        <div className="mb-14 max-w-2xl">
          <h2 className="text-4xl font-semibold text-neutral-900">
            Play that stays with you
          </h2>
          <p className="mt-4 text-neutral-600">
            Every game, every moment, every shared experience adds up to
            something meaningful.
          </p>
        </div>

        {/* Video Container — FULL SECTION WIDTH */}
        <div className="relative w-full h-[90vh] rounded-4xl overflow-hidden bg-white shadow-xl">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="\wallenRewards2.mp4"
            title="Joy Juncture Gamification Teaser"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Supporting Line — STILL CENTERED */}
        <p className="mt-10 text-sm text-neutral-500 text-center max-w-xl mx-auto">
          Points, progress, and rewards — designed to encourage belonging,
          not pressure.
        </p>
      </div>
    </section>
  );
}
