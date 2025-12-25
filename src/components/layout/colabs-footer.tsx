"use client";

import React from "react";
import Link from "next/link";
import "./colabs-footer.css";

type Address = { title: string; lines: string[] };
type NavItem = { label: string; href: string };

type ColabsFooterProps = {
    addresses?: Address[];
    primaryNav?: NavItem[];
    legalNav?: NavItem[];
    brandCredit?: string;
    year?: number;
    logoText?: string;
};

const defaultAddresses: Address[] = [
    {
        title: "Joy Juncture HQ",
        lines: ["123 Play Street", "Mumbai, MH 400001"],
    },
    {
        title: "Contact Us",
        lines: ["hello@joyjuncture.com", "+91 98765 43210"],
    },
];

const defaultPrimary: NavItem[] = [
    { label: "Shop Games", href: "/shop" },
    { label: "Book Experiences", href: "/experiences" },
    { label: "Play Online", href: "/play" },
    { label: "Events", href: "/events" },
    { label: "Community", href: "/community" },
];

const defaultLegal: NavItem[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
];

export function ColabsFooter({
    addresses = defaultAddresses,
    primaryNav = defaultPrimary,
    legalNav = defaultLegal,
    brandCredit = "Designed for play. Built for people.",
    year = new Date().getFullYear(),
    logoText = "Joy Juncture",
}: ColabsFooterProps) {
    return (
        <footer className="colabs-footer">
            <div className="footer-inner">

                <div className="top-grid">
                    <section className="ack">
                        <p className="ack-text">
                            Joy Juncture respectfully acknowledges the power of play to bring people together, creating moments of joy and connection on every table, in every room, and across every community.
                        </p>
                    </section>

                    <section className="addresses">
                        {addresses.map((a, i) => (
                            <div className="address" key={i}>
                                <h4 className="address-title">{a.title}</h4>
                                {a.lines.map((l, j) => (
                                    <p className="address-line" key={j}>{l}</p>
                                ))}
                            </div>
                        ))}
                    </section>
                </div>

                <div className="links-grid">
                    <nav className="primary-links">
                        {primaryNav.map((item) => (
                            <Link key={item.label} href={item.href} className="link">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <nav className="legal-links">
                        {legalNav.map((item) => (
                            <Link key={item.label} href={item.href} className="link">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <p className="copyright">© {year} {logoText}. All rights reserved.</p>
                </div>

                <div className="bottom-row">
                    <div className="brand-credit">{brandCredit}</div>

                    <div className="logo">
                        <span className="logo-mark" aria-hidden />
                        <span className="logo-text">{logoText}</span>
                    </div>

                    <div className="socials">
                        <a className="icon-btn" href="https://instagram.com" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" width="22" height="22">
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1.2" />
                            </svg>
                        </a>
                        <a className="icon-btn" href="https://facebook.com" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" width="22" height="22">
                                <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h3v-3h-3V9c0-.6.4-1 1-1z" />
                            </svg>
                        </a>
                        <a className="icon-btn" href="https://linkedin.com" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24" width="22" height="22">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <rect x="6.5" y="10" width="2.5" height="7" />
                                <circle cx="7.7" cy="7.5" r="1.3" />
                                <path d="M12 10h2.4a3.6 3.6 0 0 1 3.6 3.6V17h-2.5v-3c0-.9-.7-1.6-1.6-1.6H12V17h-2.5v-7H12z" />
                            </svg>
                        </a>
                        <a className="icon-btn" href="https://twitter.com" aria-label="X/Twitter">
                            <svg viewBox="0 0 24 24" width="22" height="22">
                                <path d="M4 5l7 8-7 6h3.5l6.5-5 5 5H20l-7-8 7-6h-3.5L10 9 5 5H4z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
