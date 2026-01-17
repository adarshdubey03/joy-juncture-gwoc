
import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function DebugAuthPage() {
    const session = await auth();
    let dbUser = null;
    let error = null;

    if (session?.user?.id) {
        try {
            dbUser = await db.user.findUnique({
                where: { id: session.user.id },
                select: { id: true, email: true, role: true }
            });
        } catch (e: any) {
            error = e.message;
        }
    }

    return (
        <div className="p-10 font-mono text-sm max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Authentication Debugger</h1>

            <div className="border p-4 rounded bg-gray-50">
                <h2 className="font-bold mb-2">1. Session (from auth())</h2>
                <pre className="bg-white p-2 border rounded overflow-auto">
                    {JSON.stringify(session, null, 2)}
                </pre>
            </div>

            <div className="border p-4 rounded bg-gray-50">
                <h2 className="font-bold mb-2">2. Database User (Fresh Fetch)</h2>
                {error ? (
                    <div className="text-red-500 font-bold">DB Error: {error}</div>
                ) : (
                    <pre className="bg-white p-2 border rounded overflow-auto">
                        {JSON.stringify(dbUser, null, 2)}
                    </pre>
                )}
            </div>

            <div className="border p-4 rounded bg-gray-50">
                <h2 className="font-bold mb-2">Diagnosis</h2>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <strong>Session exists?</strong> {session ? "✅ YES" : "❌ NO"}
                        {!session && " (If you are logged in, AUTH_SECRET might be missing)"}
                    </li>
                    <li>
                        <strong>User ID in Session?</strong> {session?.user?.id ? "✅ YES" : "❌ NO"}
                    </li>
                    <li>
                        <strong>DB Fetch Success?</strong> {dbUser ? "✅ YES" : "❌ NO"}
                    </li>
                    <li>
                        <strong>Role is ADMIN?</strong> {dbUser?.role === 'ADMIN' ? "✅ YES" : "❌ NO"}
                        {dbUser && dbUser.role !== 'ADMIN' && ` (Current Role: ${dbUser.role})`}
                    </li>
                </ul>
            </div>
        </div>
    );
}
