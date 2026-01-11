"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, ChevronDown, ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";

const ROUTE_MAP: Record<string, string> = {
  "All Games": "/shop",
  "By Occasion": "/shop?filter=occasion",
  "By Players": "/shop?filter=players",
  "By Mood": "/shop?filter=mood",

  "Corporate Engagement": "/experiences/corporate",
  "Weddings": "/experiences/weddings",
  "Birthdays": "/experiences/birthdays",
  "Carnivals": "/experiences/carnivals",

  "The Showdown": "/play/showdown",
  "Free Online Games": "/play/free",
  "How JJ Games Work": "/play/how-it-works",

  "Upcoming Game Nights": "/events/upcoming-events",
  "Past Events": "/events/past-events",

  "Blog": "/blogs",
  "Wallet & Points": "/wallet",
  "About Us": "/about",
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
  const { status } = useSession();

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
                {/* Trigger */}
                <button className="flex items-center gap-1 text-base font-medium text-neutral-900">
                  {nav.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Hover buffer */}
                {isOpen && (
                  <div className="absolute left-0 right-0 h-4 top-full" />
                )}

                {/* Dropdown */}
                {isOpen && (
                  <div
                    className="
                      absolute left-1/2 top-full mt-4 w-56
                      -translate-x-1/2
                      rounded-2xl bg-white
                      shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                      ring-1 ring-black/5
                      animate-in fade-in slide-in-from-top-2
                    "
                  >
                    <div className="py-3">
                      {nav.items.map((item) => (
                        <Link
                          key={item}
                          href={ROUTE_MAP[item]}
                          className="
                            block px-5 py-2 text-sm
                            text-neutral-800
                            hover:bg-[#F4C752]/25
                            transition-colors
                          "
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* CART */}
              <Link
                href="/cart"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 hover:bg-white/40 transition"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
              </Link>

              {/* PROFILE */}
              <Link
                href="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 hover:bg-white/40 transition"
                aria-label="Profile"
              >
                <User size={18} />
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="
                rounded-full bg-[#FFF4D6]
                px-6 py-2.5
                text-sm font-medium text-neutral-900
                transition
                hover:opacity-90
              "
            >
              Login
            </Link>
          )}

          {/* INSTAGRAM */}
          <Link
            href="#"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 hover:bg-white/40 transition"
          >
            <Instagram size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
