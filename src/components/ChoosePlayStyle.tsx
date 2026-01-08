import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PLAY_STYLES = [
  {
    title: "Play at Home",
    bg: "#0353a4",
    image: "/play-home.png",
    href: "/play-at-home",
  },
  {
    title: "Play Together (Live)",
    bg: "#bc6c25",
    image: "/play-live.png",
    href: "/play-together",
  },
  {
    title: "Play for Occasions",
    bg: "#3a5a40",
    image: "/play-occasions",
    href: "/occasions",
  },
  {
    title: "Play & Earn Points",
    bg: "#662e9b",
    image: "/play-points.png",
    href: "/rewards",
  },
];

export default function ChoosePlayStyle() {
  return (
    <section className="w-full bg-[#F1EFE7] py-10">
      
      {/* SECTION TITLE */}
      <div className="pl-20 pr-6 mb-16 ">
        <h3 className="text-3xl font-medium text-neutral-900">
          Choose your play style
        </h3>
      </div>

      {/* CARDS */}
      <div className="px-12 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {PLAY_STYLES.map((style) => (
            <div
              key={style.title}
              className="relative h-60 rounded-3xl overflow-hidden"
              style={{ backgroundColor: style.bg }}
            >
              {/* TITLE */}
              <div className="absolute top-6 left-6 z-10">
                <h4 className="text-xl font-semibold text-amber-50">
                  {style.title}
                </h4>
              </div>

              {/* CENTER IMAGE */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={style.image}
                  alt={style.title}
                  width={110}
                  height={110}
                  className="object-contain"
                />
              </div>

              {/* RIGHT ARROW CTA */}
              <Link
                href={style.href}
                className="
                  absolute bottom-4 right-4 z-10
                  flex h-11 w-11 items-center justify-center
                  rounded-full bg-white/90
                  text-neutral-900
                  shadow-md
                  transition-all
                  hover:scale-105
                  hover:bg-white
                "
                aria-label={`Go to ${style.title}`}
              >
                <ArrowRight size={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
