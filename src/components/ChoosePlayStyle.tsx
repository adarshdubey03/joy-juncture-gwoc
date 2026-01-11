import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PLAY_STYLES = [
  {
    title: "Play at Home",
    bg: "#0353a4",
    image: "/products/mehfil2.jpeg",
    href: "",
  },
  {
    title: "Play Together (Live)",
    bg: "#bc6c25",
    image: "/people_playing.jpg",
    href: "/play-together",
  },
  {
    title: "Play for Occasions",
    bg: "#3a5a40",
    image: "/BrideGroom.png",
    href: "/occasions",
  },
  {
    title: "Play & Earn Points",
    bg: "#662e9b",
    image: "/puzzle.png",
    href: "/rewards",
  },
];

export default function ChoosePlayStyle() {
  return (
    <section className="w-full bg-[#FFF4D6] py-6 md:py-3 overflow-hidden">
      {/* SECTION TITLE */}
      <div className="px-6 sm:px-10 md:pl-20 md:pr-6 mb-8 md:mb-16">
        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-900">
          Choose your play style
        </h3>
      </div>

      {/* HORIZONTAL COLLAGE */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max playstyle-marquee">
          {/* Duplicate list once for seamless loop */}
          {[...PLAY_STYLES, ...PLAY_STYLES].map((style, index) => (
            <div
              key={`${style.title}-${index}`}
              className="
                relative
                h-44 w-56
                sm:h-52 sm:w-64
                md:h-60 md:w-72
                mx-2
                rounded-3xl
                overflow-hidden
                shrink-0
              "
              style={{ backgroundColor: style.bg }}
            >
              {/* TITLE */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                <h4 className="text-sm sm:text-base md:text-xl font-semibold text-amber-50">
                  {style.title}
                </h4>
              </div>

              {/* CENTER IMAGE */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={style.image}
                  alt={style.title}
                  width={350}
                  height={200}
                  className="object-contain"
                />
              </div>

              {/* RIGHT ARROW CTA */}
              <Link
                href={style.href}
                className="
                  absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10
                  flex h-9 w-9 md:h-11 md:w-11
                  items-center justify-center
                  rounded-full
                  bg-white/90
                  text-neutral-900
                  shadow-md
                  transition-all
                  hover:scale-105
                  hover:bg-white
                "
                aria-label={`Go to ${style.title}`}
              >
                <ArrowRight size={18} className="md:hidden" />
                <ArrowRight size={20} className="hidden md:block" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
