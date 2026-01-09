import { AdminSidebar } from "@/components/admin/sidebar";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGate allowedRole={UserRole.ADMIN}>
            <div className="flex min-h-screen bg-gray-100">
                <AdminSidebar />
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </RoleGate>
    );
}
