import type { Metadata } from "next";
import { Inter, Kalam } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
// import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/components/providers/auth-provider";
import { auth } from "@/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
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
      </body>
    </html>
  );
}
