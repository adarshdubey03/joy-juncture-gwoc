import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka, Inter, Kalam } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
// import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/components/providers/auth-provider";
import { auth } from "@/auth";
=======
>>>>>>> 25ae6e62d84b2b85a5eae8f35cc134b4cd2cd877

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
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "font-sans antialiased")} suppressHydrationWarning>
        <AuthProvider>
           {children}
         {/* <CartProvider>
            <Navbar />
            <main className="pt-20">
             
            </main> 
          </CartProvider> */}
        </AuthProvider>
=======
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${inter.variable}
          ${kalam.variable}
          ${fredoka.variable}
          antialiased
          bg-[#FFF4D6]
          text-[#FFF4D6]
         
        `}
      >
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
>>>>>>> 25ae6e62d84b2b85a5eae8f35cc134b4cd2cd877
      </body>
    </html>
  );
}
