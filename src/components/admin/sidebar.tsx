"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Calendar,
    Settings,
    Gift,
    Tag,
    FolderTree,
    HelpCircle,
    MessageSquare,
    FileText,
} from "lucide-react";

const sidebarLinks = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Enquiries",
        href: "/admin/enquiries",
        icon: MessageSquare,
    },
    {
        title: "Blogs",
        href: "/admin/blogs",
        icon: FileText,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "Events",
        href: "/admin/events",
        icon: Calendar,
    },
    {
        title: "Puzzles",
        href: "/admin/puzzles",
        icon: HelpCircle,
    },
    {
        title: "Gamification",
        href: "/admin/rewards",
        icon: Gift,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
    },
    {
        title: "Tags & Metadata",
        href: "/admin/metadata",
        icon: Tag,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full max-h-screen flex-col gap-2 m-4 rounded-3xl bg-white shadow-xl overflow-hidden w-64 border-none">
            <div className="flex h-16 items-center border-b border-orange-100 px-6 bg-gradient-to-r from-yellow-400 to-orange-400">
                <Link href="/admin" className="flex items-center gap-3 font-bold text-white text-xl">
                    <Package className="h-6 w-6" />
                    <span className="tracking-wide">JJ Admin</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4 px-3 custom-scrollbar">
                <nav className="space-y-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 font-medium",
                                    isActive
                                        ? "bg-[#FFF4D6] text-[#2E2A24] shadow-sm ml-2"
                                        : "text-[#5A554B] hover:bg-gray-50 hover:ml-1"
                                )}
                            >
                                <Icon className={cn("h-5 w-5", isActive ? "text-[#F4A300]" : "text-gray-400")} />
                                {link.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Section */}
            <div className="mt-auto border-t border-gray-100 px-4 py-4 bg-gray-50">
                <button
                    onClick={() => {
                        import("@/actions/logout").then(({ logout }) => logout());
                    }}
                    className="flex items-center gap-3 w-full rounded-2xl px-4 py-3 text-sm font-medium text-red-500 transition-all hover:bg-red-50 hover:text-red-600"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
}
