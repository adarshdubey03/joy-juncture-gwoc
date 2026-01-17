import DomeGallery from "./DomeGallery";

export default function ProofOfJoy() {
  return (
    <section className="w-full bg-[#FFF4D6] pt-12 pb-12 md:pt-0 md:-mt-8 md:pb-24">
      <div className="mx-auto max-w-360 px-6 md:px-8 flex flex-col">
        {/* Section Header */}
        <div className="mb-8 md:mb-14 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900">
            Proof of joy
          </h2>
          <p className="mt-3 text-lg text-neutral-600">
            Real moments from events, celebrations, and shared play.
          </p>
        </div>

        {/* Gallery Container */}
        <div className="relative w-full h-[50vh] md:h-[82vh] rounded-3xl overflow-hidden bg-[#FFF4D6]">
          <DomeGallery
            fit={1.0}
            minRadius={900}
            maxVerticalRotationDeg={18}
            segments={22}
            grayscale={false}
            overlayBlurColor="#FFF4D6"
          />
        </div>
      </div>
    </section>
  );
}
