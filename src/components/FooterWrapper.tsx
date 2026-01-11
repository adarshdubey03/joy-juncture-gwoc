"use client";

import { usePathname } from "next/navigation";
import BigFooter from "@/components/BigFooter";

export default function FooterWrapper() {
    const pathname = usePathname();
    const authRoutes = ["/login", "/register", "/verify", "/error", "/reset", "/new-password"];

    if (authRoutes.some(route => pathname.startsWith(route))) return null;

    return <BigFooter />;
}
