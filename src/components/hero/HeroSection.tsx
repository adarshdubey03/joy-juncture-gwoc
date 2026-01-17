"use client";
import Image from "next/image";
// import HeroNavbar from "./HeroNavbar";
import Link from "next/link";

export default function HeroSection() {
  const handleScrollDown = () => {
    const next = document.getElementById("next-section");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#FFF4D6] overflow-hidden min-h-[70vh] md:min-h-screen flex flex-col md:block">

      {/* VIDEO FRAME WRAPPER */}
      <div className="relative w-full p-4 pb-1 md:p-5 pt-[80px] flex-grow">
        <div className="relative w-full overflow-hidden rounded-[2.5rem] md:rounded-4xl md:rounded-tl-xs h-[60vh] md:h-[95vh] shadow-xl">
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

          {/* BOTTOM-LEFT WHITE EXCLUSION — REDUCED ON MOBILE */}
          <div
            className="
              absolute bottom-0 left-0
              h-40 w-72
              md:h-72 md:w-xl
              bg-[#FFF4D6]
              rounded-tr-4xl
              z-10
            "
          />

          {/* HEADLINE CONTENT */}
          <div
            className="
              absolute bottom-6 left-4
              md:bottom-6 md:left-6
              z-20
              px-0 md:px-10
              flex flex-col justify-between
              w-[85%] md:w-auto
              text-left
            "
          >
            <h1 className="text-[1.65rem] md:text-[2.75rem] font-black text-neutral-900 leading-tight max-w-md">
              Discover joyful experiences that bring people together
            </h1>

            {/* SCROLL ARROW — DESKTOP ONLY */}
            <button
              onClick={handleScrollDown}
              aria-label="Scroll to next section"
              className="
                hidden md:flex
                mt-6
                h-14 w-14
                items-center justify-center
                rounded-full
                border border-neutral-500
                text-neutral-900
                text-2xl
                hover:border-neutral-700
                hover:bg-neutral-100
                transition
              "
            >
              ↓
            </button>
          </div>

          {/* CTA BUTTONS — DESKTOP ONLY (Large Width) */}
          <div className="hidden md:flex absolute bottom-8 right-80 z-20 items-center gap-10">
            <Link
              href="/shop"
              className="
                rounded-full bg-[#F4C752]
                px-10 py-5
                text-lg font-bold text-neutral-900
                shadow-[0_8px_24px_rgba(244,199,82,0.45)]
                transition-all
                hover:-translate-y-px
                hover:shadow-[0_12px_32px_rgba(244,199,82,0.6)]
                active:translate-y-0
              "
            >
              Shop Games
            </Link>

            <Link
              href="/games"
              className="
                rounded-full bg-[#F4C752]
                px-10 py-5
                text-lg font-bold text-neutral-900
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

      {/* MOBILE CTA BUTTONS — BELOW VIDEO */}
      <div className="md:hidden flex items-center justify-center gap-4 px-4 pb-3 mt-4 w-full">
        <Link
          href="/shop"
          className="
            flex-1
            flex items-center justify-center
            rounded-2xl bg-[#F4C752]
            py-4
            text-lg font-bold text-neutral-900
            shadow-lg
          "
        >
          Shop Games
        </Link>

        <Link
          href="/games"
          className="
            flex-1
            flex items-center justify-center
            rounded-2xl bg-[#F4C752]
            py-4
            text-lg font-bold text-neutral-900
            shadow-lg
          "
        >
          Play Games
        </Link>
      </div>
    </section>
  );
}
