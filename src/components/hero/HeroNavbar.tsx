"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, ChevronDown, ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

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

import { usePathname } from "next/navigation";

export default function HeroNavbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const pathname = usePathname();

  const isLoggedIn = status === "authenticated";

  // List of routes to hide navbar
  const hiddenRoutes = ["/login", "/register", "/verify", "/error", "/reset", "/new-password", "/admin", "/profile"];

  if (hiddenRoutes.some(route => pathname.startsWith(route))) return null;

  return (
    <>
      {/* ================= GLOBAL FIXED ELEMENTS (DESKTOP) ================= */}
      {/* 1. TOP-LEFT CUTOUT BACKGROUND */}
      <div
        className="
          hidden md:block
          fixed top-0 left-0
          h-24 w-60
          bg-[#FFF4D6]
          rounded-br-4xl
          z-40
        "
      />

      {/* 2. FLOATING LOGO */}
      <div className="hidden md:block fixed top-1 left-16 z-50">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Joy Juncture"
            width={280}
            height={56}
            className="h-24 w-32 object-contain"
            priority
          />
        </Link>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden flex items-center justify-between px-4 py-4">
        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Joy Juncture"
            width={96}
            height={32}
            className="h-15 w-25"
            priority
          />
        </Link>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-13 w-13 items-center justify-center  bg-[#F4C752] rounded-full border border-neutral-900/20 text-neutral-900"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <button
            className="
              h-13 
              rounded-full
              bg-[#F4C752]
              px-6
              text-lg
              font-medium
              text-neutral-900
              flex
              items-center
              justify-center
            "
          >
            Menu
          </button>
        </div>
      </div>

      {/* ================= DESKTOP NAVBAR (UNCHANGED) ================= */}
      <nav className="hidden md:block fixed top-8 left-72 max-w-6xl right-8 z-50">
        <div className="flex items-center justify-between rounded-full bg-[#F4C752] px-12 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          {/* LEFT — NAV LINKS */}
          <div className="flex items-center gap-10">
            {NAV_ITEMS.map((nav) => {
              const isOpen = openMenu === nav.label;

              return (
                <div
                  key={nav.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(nav.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button className="flex items-center gap-1 text-base font-medium text-neutral-900">
                    {nav.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute left-1/2 top-full pt-4 w-56 -translate-x-1/2">
                      <div className="rounded-2xl bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] ring-1 ring-black/5 py-3">
                        {nav.items.map((item) => (
                          <Link
                            key={item}
                            href={ROUTE_MAP[item]}
                            className="block px-5 py-2 text-sm text-neutral-800 hover:bg-[#F4C752]/25 transition-colors"
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
                <Link
                  href="/cart"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 hover:bg-white/40 transition"
                >
                  <ShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/20 text-neutral-900 hover:bg-white/40 transition"
                >
                  <User size={18} />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-[#FFF4D6] px-6 py-2.5 text-sm font-medium text-neutral-900 hover:opacity-90 transition"
              >
                Login
              </Link>
            )}

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
    </>
  );
}
