"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, ChevronDown, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const ROUTE_MAP = {
  "About Us": "/about",
  "Blog":"/blogs"
};

const NAV_ITEMS = [
  {
    label: "Shop",
    items: ["All Games", "By Occasion", "By Players", "By Mood"],
  },
  {
    label: "Experiences",
    items: ["Corporate Engagement", "Weddings", "Birthdays", "Carnivals"],
  },
  {
    label: "Play",
    items: ["The Showdown", "Free Online Games", "How JJ Games Work"],
  },
  {
    label: "Events",
    items: ["Upcoming Game Nights", "Past Events"],
  },
  {
    label: "Community",
    items: ["Blog", "Wallet & Points", "About Us"],
  },
];

export default function HeroNavbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  return (
    <nav className="absolute top-6 left-8 right-8 z-30">
      <div className="flex items-center justify-between rounded-full bg-[#F4C752] px-12 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        
        {/* LEFT — NAV LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((nav) => {
            const isOpen = openMenu === nav.label;

            return (
              <div
                key={nav.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(nav.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="flex items-center gap-1 text-base font-medium text-neutral-900 hover:text-black transition-colors">
                  {nav.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div className="absolute left-0 right-0 top-full h-4" />

                <div
                  className={`
                    absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2
                    rounded-2xl bg-white
                    shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                    ring-1 ring-black/5
                    transition-all duration-200 ease-out
                    ${
                      isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }
                  `}
                >
                  <div className="py-3">
                    {nav.items.map((item) => (
                      <Link
                        key={item}
                        href={ROUTE_MAP[item] ?? "#"}
                        className="
                          block px-5 py-2 text-sm
                          text-neutral-800
                          transition-colors
                          hover:bg-[#F4C752]/25
                          hover:text-neutral-900
                        "
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — AUTH + SOCIAL */}
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              {/* SHOP */}
              <Link
                href="/shop"
                className="
                  rounded-full bg-[#F4C752]
                  px-6 py-2.5
                  text-sm font-semibold text-neutral-900
                  shadow-[0_6px_16px_rgba(244,199,82,0.35)]
                  transition-all
                  hover:-translate-y-px
                  hover:shadow-[0_10px_24px_rgba(244,199,82,0.45)]
                "
              >
                Shop
              </Link>

              {/* LOGOUT */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full border border-neutral-400
                  text-neutral-800
                  transition-all
                  hover:border-neutral-500
                  hover:bg-neutral-100
                  hover:text-neutral-900
                "
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="
                rounded-full bg-[#F4C752]
                px-6 py-2.5
                text-sm font-semibold text-neutral-900
                shadow-[0_6px_16px_rgba(244,199,82,0.35)]
                transition-all
                hover:-translate-y-px
                hover:shadow-[0_10px_24px_rgba(244,199,82,0.45)]
              "
            >
              Login
            </Link>
          )}

          {/* INSTAGRAM */}
          <Link
            href="#"
            aria-label="Instagram"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full border border-neutral-400
              text-neutral-800
              transition-all
              hover:border-neutral-500
              hover:bg-neutral-100
              hover:text-neutral-900
            "
          >
            <Instagram size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
