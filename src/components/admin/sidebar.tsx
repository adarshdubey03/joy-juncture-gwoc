"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, Calendar, FileText, Users, Settings, LogOut } from "lucide-react";

const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold">Joy Admin</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                            pathname === link.href
                                ? "bg-accent text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        )}
                    >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
