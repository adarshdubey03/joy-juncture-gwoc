import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import { OrderStatus } from "@/generated/prisma";
import {
  User,
  Wallet,
  MapPin,
  Package,
  Calendar,
  Puzzle,
  LogOut,
  CreditCard,
  Clock
} from "lucide-react";



export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch full user details with relations
  const userData = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      wallet: true,
      orders: {
        take: 3,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
        where: { status: OrderStatus.DELIVERED } // Example filter, or just show all
      },
      eventRegistrations: {
        take: 3,
        orderBy: { registeredAt: 'desc' },
        include: { event: true }
      },
      puzzleAttempts: {
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { puzzle: true }
      }
    }
  });

  if (!userData) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-neutral-50 pb-20 pt-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 shrink-0 rounded-full overflow-hidden bg-neutral-100 ring-4 ring-neutral-50 shadow-inner">
              <Image
                src={userData.image || "/avatar-placeholder.png"}
                alt={userData.name || "User"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 font-fredoka tracking-tight">
                {userData.name || "Joy Seeker"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-neutral-500 text-sm">
                <span className="flex items-center gap-1.5">
                  <User size={16} />
                  {userData.email}
                </span>
                {userData.phoneNumber && (
                  <span className="flex items-center gap-1.5 border-l border-neutral-300 pl-3">
                    <MapPin size={16} /> {/* Using MapPin as a placeholder visual separator if needed, or simple text */}
                    {userData.phoneNumber}
                  </span>
                )}
                <span className="flex items-center gap-1.5 border-l border-neutral-300 pl-3">
                  <Clock size={16} />
                  Joined {new Date(userData.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:ml-auto items-center gap-4">
            {/* Wallet Card - Small Variant for Header */}
            <div className="bg-gradient-to-br from-[#F4C752] to-[#FFD970] p-4 rounded-2xl text-neutral-900 min-w-[160px] shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard size={18} className="opacity-80" />
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">Wallet Balance</span>
              </div>
              <div className="text-2xl font-black font-fredoka">
                {userData.wallet?.balance.toString() || "0"} <span className="text-base font-normal opacity-90">Points</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Orders Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Package size={24} />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 font-fredoka">Recent Orders</h2>
              </div>

              <div className="space-y-4">
                {userData.orders.length === 0 ? (
                  <p className="text-neutral-500 italic">No orders yet. Time for some shopping?</p>
                ) : (
                  userData.orders.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-neutral-50 border border-neutral-100 gap-4 transition hover:shadow-md">
                      <div>
                        <p className="font-semibold text-neutral-900">
                          Order #{order.id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {order.status}
                        </span>
                        <p className="font-bold text-neutral-900">
                          ₹{order.totalAmount.toString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Events Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Calendar size={24} />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 font-fredoka">My Events</h2>
              </div>

              <div className="space-y-4">
                {userData.eventRegistrations.length === 0 ? (
                  <p className="text-neutral-500 italic">You haven't registered for any events yet.</p>
                ) : (
                  userData.eventRegistrations.map((reg) => (
                    <div key={reg.id} className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900">{reg.event.title}</h3>
                        <p className="text-sm text-neutral-500 line-clamp-1">{reg.event.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs font-medium text-neutral-500">
                          <span className="bg-white px-2 py-0.5 rounded border border-neutral-200 uppercase">{reg.event.type}</span>
                          <span>{new Date(reg.event.startTime).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">

            {/* Puzzles Section */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 text-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
                  <Puzzle size={24} />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 font-fredoka">Recent Puzzles</h2>
              </div>

              <div className="space-y-3">
                {userData.puzzleAttempts.length === 0 ? (
                  <p className="text-neutral-500 italic">No puzzles solved yet.</p>
                ) : (
                  userData.puzzleAttempts.map((attempt) => (
                    <div key={attempt.id} className="flex justify-between items-center p-3 rounded-xl bg-neutral-50">
                      <span className="font-medium text-neutral-700 truncate max-w-[120px]">
                        {attempt.puzzle.title}
                      </span>
                      <span
                        className={`
                            text-xs font-bold px-2 py-1 rounded-md
                            ${attempt.isCorrect
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"}
                          `}
                      >
                        {attempt.isCorrect ? "SOLVED" : "FAILED"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Account Actions */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-900 font-fredoka mb-4">Account Actions</h2>

              <form
                action={async () => {
                  "use server"
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-neutral-100 hover:bg-neutral-200
                    text-neutral-900 font-semibold
                    py-3 px-6 rounded-xl
                    transition-all duration-200
                  "
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </form>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
