import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { UserRole } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    // Force DB check to ensure role is fresh and not just from stale session/token
    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { role: true },
    });

    if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN)) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-[#FFF4D6] font-sans">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
