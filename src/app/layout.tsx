import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka, Inter, Kalam } from "next/font/google";
import "./globals.css";

import AuthSessionProvider from "@/components/providers/session-provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Joy Juncture | Moments of Joy, One Game at a Time",
  description:
    "Discover board games that create memories. Shop games, book experiences, and join the community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${inter.variable}
          ${kalam.variable}
          ${fredoka.variable}
          antialiased
        `}
      >
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
