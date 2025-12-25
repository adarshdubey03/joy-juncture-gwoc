import type { Metadata } from "next";
import { Inter, Kalam } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ColabsFooter } from "@/components/layout/colabs-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

export const metadata: Metadata = {
  title: "Joy Juncture | Moments of Joy, One Game at a Time",
  description: "Discover board games that create memories. Shop games, book experiences, and join the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn(inter.variable, kalam.variable, "font-sans antialiased")} suppressHydrationWarning>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <ColabsFooter />
      </body>
    </html>
  );
}
