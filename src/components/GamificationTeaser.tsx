export default function GamificationTeaser() {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center">
        {/* Header */}
        <div className="mb-12 max-w-2xl text-center">
          <h2 className="text-4xl font-semibold text-neutral-900">
            Play that stays with you
          </h2>
          <p className="mt-4 text-neutral-600">
            Every game, every moment, every shared experience adds up to
            something meaningful.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full max-w-6xl aspect-video rounded-4xl overflow-hidden bg-white shadow-xl">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/VIDEO_ID?rel=0&modestbranding=1"
            title="Joy Juncture Gamification Teaser"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Supporting Line */}
        <p className="mt-10 text-sm text-neutral-500 text-center max-w-xl">
          Points, progress, and rewards — designed to encourage belonging,
          not pressure.
        </p>
      </div>
    </section>
  );
}
