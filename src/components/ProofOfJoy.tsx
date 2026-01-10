import DomeGallery from "./DomeGallery";

export default function ProofOfJoy() {
  return (
    <section className="w-full bg-[#FFF4D6] py-16">
      <div className="mx-auto max-w-7xl px-6 flex flex-col">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <h2 className="text-4xl font-semibold text-neutral-900">
            Proof of joy
          </h2>
          <p className="mt-3 text-neutral-600">
            Real moments from events, celebrations, and shared play.
          </p>
        </div>

        {/* Gallery Container */}
        <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden bg-white">
          <DomeGallery
            fit={1.0}
            minRadius={900}
            maxVerticalRotationDeg={18}
            segments={22}
            grayscale={false}
          />
        </div>
      </div>
    </section>
  );
}
