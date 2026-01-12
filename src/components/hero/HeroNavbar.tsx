"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, ChevronDown, ShoppingCart, User, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-start justify-between pointer-events-none">

        {/* LEFT — LOGO WITH CUTOUT BACKGROUND */}
        <div className="bg-[#FFF4D6] rounded-br-[2rem] pl-6 pr-12 pb-6 pt-5 pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Joy Juncture"
              width={240}
              height={80}
              className="w-48 h-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-3 pr-4 pt-4 pointer-events-auto">
          {isLoggedIn && (
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-12 w-12 items-center justify-center bg-[#F4C752] rounded-full border border-neutral-900/10 text-neutral-900 shadow-lg shadow-orange-500/10 hover:scale-105 transition-transform"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="
              h-12
              rounded-full
              bg-[#F4C752]
              px-6
              text-base
              font-bold
              text-neutral-900
              flex
              items-center
              justify-center
              shadow-lg
              shadow-orange-500/10
              border border-neutral-900/10
              hover:scale-105 transition-transform
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

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#FFF4D6] flex flex-col pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <Image
                src="/logo.png"
                alt="Joy Juncture"
                width={120}
                height={40}
                className="h-12 w-auto object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
              >
                <X size={24} className="text-neutral-900" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-10">
              <div className="space-y-8">
                {NAV_ITEMS.map((group) => (
                  <div key={group.label}>
                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4 border-b border-neutral-900/5 pb-2">
                      {group.label}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {group.items.map((item) => (
                        <Link
                          key={item}
                          href={ROUTE_MAP[item]}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-2xl font-fredoka text-neutral-900 hover:text-[#F4C752] transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile Specific Actions */}
                <div className="pt-8 space-y-4">
                  {!isLoggedIn && (
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-4 bg-neutral-900 text-white rounded-2xl font-bold text-lg"
                    >
                      Login / Sign Up
                    </Link>
                  )}
                  {isLoggedIn && (
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center py-4 bg-white border border-neutral-200 text-neutral-900 rounded-2xl font-bold text-lg"
                    >
                      View Profile
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
