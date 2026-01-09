"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const navItems = [
    { name: "Home", href: "/" },
    {
        name: "Shop",
        href: "/shop",
        dropdown: [
            { name: "All Games", href: "/shop/all-games" },
            { name: "By Occasion", href: "/shop/by-occasion" },
            { name: "By Players", href: "/shop/by-players" },
            { name: "By Mood / Vibe", href: "/shop/by-mood" },
        ],
    },
    {
        name: "Experiences",
        href: "/experiences",
        dropdown: [
            { name: "Corporate Engagement", href: "/experiences/corporate" },
            { name: "Weddings", href: "/experiences/weddings" },
            { name: "Birthdays / Anniversaries", href: "/experiences/birthdays" },
            { name: "Carnivals / Game zones", href: "/experiences/carnivals" },
        ],
    },
    {
        name: "Play",
        href: "/play",
        dropdown: [
            { name: "The Showdown", href: "/play/showdown" },
            { name: "Free Online Games", href: "/play/free-games" },
            { name: "How JJ Games Work", href: "/play/how-it-works" },
        ],
    },
    {
        name: "Events",
        href: "/events",
        dropdown: [
            { name: "Upcoming Game Nights", href: "/events/upcoming" },
            { name: "Past Events", href: "/events/past" },
        ],
    },
    {
        name: "Community",
        href: "/community",
        dropdown: [
            { name: "Blog", href: "/community/blog" },
            { name: "Wallet & Points", href: "/community/wallet" },
            { name: "Puzzles", href: "/community/puzzles" },
            { name: "About us", href: "/community/about" },
        ],
    },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const user = useCurrentUser();

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full">
            <nav
                className={cn(
                    "w-full border-b transition-all duration-300",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md border-neutral-200/20"
                        : "bg-transparent border-transparent"
                )}
            >
                <div className="px-8 h-16 flex items-center justify-between gap-8 lg:gap-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 z-50 relative">
                        <span className="font-bold text-2xl tracking-tighter">JOY JUNCTURE</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-12 flex-1 justify-center">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "text-sm uppercase tracking-[1px] font-light transition-colors duration-300 py-2 border-b-2 border-transparent hover:text-accent hover:border-accent flex items-center gap-1",
                                        pathname === item.href || pathname.startsWith(item.href + "/")
                                            ? "text-accent border-accent"
                                            : "text-primary"
                                    )}
                                >
                                    {item.name}
                                    {item.dropdown && (
                                        <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </Link>

                                {/* Dropdown */}
                                {item.dropdown && (
                                    <div
                                        className={cn(
                                            "absolute top-full left-1/2 -translate-x-1/2 pt-6 w-64 invisible opacity-0 transform translate-y-2 transition-all duration-300 ease-out group-hover:visible group-hover:opacity-100 group-hover:translate-y-0"
                                        )}
                                    >
                                        <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-neutral-100 overflow-hidden p-2">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-4 py-3 text-sm text-neutral-600 hover:text-accent hover:bg-neutral-50 rounded-lg transition-colors duration-200"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Auth Link */}
                        {user ? (
                            <UserButton />
                        ) : (
                            <Link
                                href="/login"
                                className={cn(
                                    "text-sm uppercase tracking-[1px] font-normal transition-colors duration-300 py-2 border-b-2 border-transparent hover:text-accent hover:border-accent"
                                )}
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="hidden lg:flex items-center gap-8 min-w-[100px] justify-end">
                        <a
                            href="https://instagram.com/joyjuncture"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-transform duration-300 hover:scale-110"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden z-50 relative w-10 h-10 flex items-center justify-center"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col gap-[6px] w-6">
                            <span
                                className={cn(
                                    "w-full h-[2px] bg-primary transition-all duration-300 origin-center",
                                    isOpen && "rotate-45 translate-y-[8px]"
                                )}
                            />
                            <span
                                className={cn(
                                    "w-full h-[2px] bg-primary transition-all duration-300",
                                    isOpen && "opacity-0"
                                )}
                            />
                            <span
                                className={cn(
                                    "w-full h-[2px] bg-primary transition-all duration-300 origin-center",
                                    isOpen && "-rotate-45 -translate-y-[8px]"
                                )}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed inset-x-0 top-0 bg-white z-40 pt-24 px-6 pb-8 overflow-y-auto lg:hidden flex flex-col h-[calc(100vh-2rem)] rounded-[30px] mt-2 shadow-2xl"
                        >
                            <div className="flex flex-col gap-6">
                                {navItems.map((item) => (
                                    <div key={item.name} className="border-b border-neutral-100 pb-4 last:border-0">
                                        {item.dropdown ? (
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        setActiveDropdown(activeDropdown === item.name ? null : item.name)
                                                    }
                                                    className="flex items-center justify-between w-full text-lg font-medium uppercase tracking-wide mb-2"
                                                >
                                                    {item.name}
                                                    <ChevronDown
                                                        className={cn(
                                                            "w-5 h-5 transition-transform duration-300",
                                                            activeDropdown === item.name && "rotate-180"
                                                        )}
                                                    />
                                                </button>
                                                <AnimatePresence>
                                                    {activeDropdown === item.name && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden pl-4 flex flex-col gap-3"
                                                        >
                                                            {item.dropdown.map((subItem) => (
                                                                <Link
                                                                    key={subItem.name}
                                                                    href={subItem.href}
                                                                    className="text-neutral-600 py-1 block"
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="text-lg font-medium uppercase tracking-wide block"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}

                                {/* Mobile Auth Link */}
                                <div className="border-b border-neutral-100 pb-4">
                                    <Link
                                        href={user ? "/profile" : "/login"}
                                        className="text-lg font-medium uppercase tracking-wide block"
                                    >
                                        {user ? "Profile" : "Login"}
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-auto pt-8 border-t border-neutral-100">
                                <a
                                    href="https://instagram.com/joyjuncture"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-lg font-medium"
                                >
                                    <Instagram className="w-6 h-6" />
                                    Follow us on Instagram
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}
