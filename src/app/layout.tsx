import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/components/providers/auth-provider";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500"], // SemiBold
});

export const metadata: Metadata = {
  title: "Joy Juncture | Moments of Joy, One Game at a Time",
  description: "Discover board games that create memories. Shop games, book experiences, and join the community.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${fredoka.variable}
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
