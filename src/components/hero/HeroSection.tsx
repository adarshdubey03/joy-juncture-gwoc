import Image from "next/image";
import HeroNavbar from "./HeroNavbar";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#FFF4D6] overflow-hidden">

      {/* LOGO FLOATING ABOVE VIDEO */}
      <div className="absolute top-1 left-12 z-30">
        <Image
          src="/logo.png"
          alt="Joy Juncture"
          width={280}
          height={56}
          className="h-28 w-36"
          priority
        />
      </div>

      {/* VIDEO FRAME — CREATES WHITE BORDER ALL AROUND */}
      <div className="relative h-screen w-full p-5 pt-2 ">

        {/* VIDEO CONTAINER (ROUNDED) */}
        <div className="relative h-full w-full overflow-hidden rounded-4xl rounded-tl-xs">

          {/* NAVBAR */}
          <div className="absolute left-1/6 right-14 z-20 flex justify-center">
            <HeroNavbar />
          </div>

          {/* VIDEO */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/20" />

          {/* TOP-LEFT WHITE EXCLUSION (LOGO CUT) */}
          <div
            className="
              absolute top-0 left-0
              h-24
              w-60
              bg-[#FFF4D6]
              rounded-br-4xl
              z-10
            "
          />

          {/* BOTTOM-LEFT WHITE EXCLUSION (HEADLINE CUT) */}
          <div
            className="
              absolute bottom-0 left-0
              h-72
              w-xl
              bg-[#FFF4D6]
              rounded-tr-4xl
              z-10
            "
          />

          {/* HEADLINE CONTENT INSIDE BOTTOM CUT */}
          <div className="absolute bottom-10 left-10 z-20 h-48 w-lg p-8 flex items-end">
            <h1 className="text-4xl font-black text-neutral-900 leading-tight">
              Discover Joyful Experiences that Bring People Together
            </h1>
          </div>

          {/* CTA BUTTONS — BOTTOM RIGHT ON VIDEO */}
          <div className="absolute bottom-8 right-80 z-20 flex items-center gap-10">

            {/* PRIMARY CTA */}
            <Link
              href="/shop"
              className="
                rounded-full bg-[#F4C752]
                px-8 py-4
                text-base font-semibold text-neutral-900
                shadow-[0_8px_24px_rgba(244,199,82,0.45)]
                transition-all
                hover:-translate-y-px
                hover:shadow-[0_12px_32px_rgba(244,199,82,0.6)]
                active:translate-y-0
              "
            >
              Shop Games
            </Link>

            {/* SECONDARY CTA */}
            <Link
              href="/play"
               className="
                rounded-full bg-[#F4C752]
                px-8 py-4
                text-base font-semibold text-neutral-900
                shadow-[0_8px_24px_rgba(244,199,82,0.45)]
                transition-all
                hover:-translate-y-px
                hover:shadow-[0_12px_32px_rgba(244,199,82,0.6)]
                active:translate-y-0
              "
            >
              Play Games
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
