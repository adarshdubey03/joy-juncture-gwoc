"use client";

import { motion, Variants } from "framer-motion";
import {
    User, MapPin, Package, Calendar, Puzzle, LogOut,
    Clock, TrendingUp, ChevronLeft, CreditCard, ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { OrderStatus } from "@/generated/prisma";

// Define strict types for the props based on what we fetch
interface ProfileContentProps {
    user: {
        name: string | null;
        email: string;
        image: string | null;
        phoneNumber: string | null;
        createdAt: Date;
        wallet: { balance: number } | null; // Transformed from Decimal
    };
    orders: Array<{
        id: string;
        status: OrderStatus;
        totalAmount: number;
        createdAt: Date;
        items: Array<{
            id: string;
            productName: string;
            productImage: string | null;
            quantity: number;
        }>;
    }>;
    points: Array<{
        id: string;
        amount: number;
        reason: string;
        createdAt: Date;
        description: string | null;
    }>;
    events: Array<{
        id: string;
        event: {
            title: string;
            description: string | null;
            type: string;
            startTime: Date;
        };
    }>;
    puzzles: Array<{
        id: string;
        isCorrect: boolean;
        puzzle: {
            title: string;
        };
    }>;
    onSignOut: () => Promise<void>;
}

export default function ProfileContent({
    user, orders, points, events, puzzles, onSignOut
}: ProfileContentProps) {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="bg-[#FFF4D6] min-h-screen relative font-sans overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />

            {/* Decorative Blur Circles */}
            <div className="fixed -top-40 -right-40 w-96 h-96 bg-[#F4C752] rounded-full blur-[128px] opacity-20 pointer-events-none" />
            <div className="fixed top-1/2 -left-40 w-80 h-80 bg-orange-300 rounded-full blur-[128px] opacity-20 pointer-events-none" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:py-16 relative z-10">

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors font-medium group">
                        <span className="bg-white/50 p-2 rounded-full group-hover:bg-white transition-all">
                            <ChevronLeft size={20} />
                        </span>
                        Back to Home
                    </Link>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* LEFT SIDEBAR - User Info & Wallet */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* User Profile Card */}
                        <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-xl shadow-[#F4C752]/10 border border-white/60 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFF4D6] to-transparent opacity-50" />

                            <div className="relative flex flex-col items-center text-center">
                                <div className="relative mb-6 group cursor-pointer">
                                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10 bg-neutral-100">
                                        <Image
                                            src={user.image || `https://api.dicebear.com/7.x/notionists/png?seed=${user.email}`}
                                            alt={user.name || "User"}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-[#F4C752] blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                                </div>

                                <h1 className="text-2xl lg:text-3xl font-fredoka font-bold text-neutral-900 mb-1">
                                    {user.name || "Joy Seeker"}
                                </h1>
                                <p className="text-neutral-500 font-medium mb-6 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-green-500" />
                                    Verified Member
                                </p>

                                <div className="w-full space-y-4 bg-neutral-50 rounded-2xl p-5 border border-neutral-100/50">
                                    <div className="flex items-center gap-3 text-neutral-600 text-sm">
                                        <div className="p-2 bg-white rounded-full shadow-sm">
                                            <User size={16} />
                                        </div>
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                    {user.phoneNumber && (
                                        <div className="flex items-center gap-3 text-neutral-600 text-sm">
                                            <div className="p-2 bg-white rounded-full shadow-sm">
                                                <MapPin size={16} />
                                            </div>
                                            <span>{user.phoneNumber}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-neutral-600 text-sm">
                                        <div className="p-2 bg-white rounded-full shadow-sm">
                                            <Clock size={16} />
                                        </div>
                                        <span>Joined {format(user.createdAt, 'MMM yyyy')}</span>
                                    </div>
                                </div>

                                <form action={onSignOut} className="w-full mt-6">
                                    <button className="w-full py-4 rounded-xl border-2 border-neutral-100 font-bold text-neutral-600 hover:border-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 group">
                                        <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                                        Sign Out
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Wallet Card */}
                        <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#111] to-[#333] rounded-[2.5rem] p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 lg:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <CreditCard className="w-20 h-20 lg:w-32 lg:h-32" />
                            </div>

                            <div className="relative z-10">
                                <p className="text-white/60 font-medium tracking-wide text-sm uppercase mb-1">Total Balance</p>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-5xl font-fredoka font-bold">{user.wallet?.balance || 0}</span>
                                    <span className="text-lg font-medium text-[#F4C752]">Points</span>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md py-3 rounded-xl text-sm font-bold transition-colors">
                                        Redeem
                                    </button>
                                    <button className="flex-1 bg-[#F4C752] hover:bg-[#ffda75] text-black py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-orange-500/20">
                                        History
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* CENTRE/RIGHT COLUMN - Dashboard Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Stat Row */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 lg:p-6 rounded-3xl border border-neutral-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:scale-[1.02] transition-transform">
                                <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl mb-1">
                                    <Package size={24} />
                                </div>
                                <h3 className="font-bold text-2xl text-neutral-900">{orders.length}</h3>
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Orders</p>
                            </div>
                            <div className="bg-white p-4 lg:p-6 rounded-3xl border border-neutral-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:scale-[1.02] transition-transform">
                                <div className="bg-purple-50 text-purple-600 p-3 rounded-2xl mb-1">
                                    <Puzzle size={24} />
                                </div>
                                <h3 className="font-bold text-2xl text-neutral-900">{puzzles.length}</h3>
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Puzzles</p>
                            </div>
                            <div className="bg-white p-4 lg:p-6 rounded-3xl border border-neutral-100 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:scale-[1.02] transition-transform col-span-2 md:col-span-1">
                                <div className="bg-green-50 text-green-600 p-3 rounded-2xl mb-1">
                                    <Calendar size={24} />
                                </div>
                                <h3 className="font-bold text-2xl text-neutral-900">{events.length}</h3>
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Events</p>
                            </div>
                        </motion.div>

                        {/* Recent Orders */}
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h2 className="text-2xl font-fredoka font-bold flex items-center gap-3">
                                    Recent Orders
                                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-sans">{orders.length}</span>
                                </h2>
                                <Link href="/shop" className="text-sm font-bold text-neutral-400 hover:text-[#F4C752] transition-colors">
                                    View Shop
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {orders.length === 0 ? (
                                    <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-neutral-200">
                                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package className="text-neutral-400" />
                                        </div>
                                        <p className="text-neutral-500 font-medium">No orders yet.</p>
                                        <Link href="/shop" className="text-[#F4C752] font-bold hover:underline mt-2 inline-block">Start Shopping</Link>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-neutral-100 flex flex-col sm:flex-row gap-6 items-center group hover:shadow-md transition-all">
                                            <div className="flex -space-x-4 shrink-0">
                                                {order.items.slice(0, 3).map((item, i) => (
                                                    <div key={item.id} className="w-16 h-16 rounded-2xl border-4 border-white shadow-sm bg-neutral-100 overflow-hidden relative z-10">
                                                        {/* Fallback to generic image if none */}
                                                        <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400">
                                                            {item.productImage ? (
                                                                <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                                                            ) : (
                                                                <Package size={20} />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                {order.items.length > 3 && (
                                                    <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-sm bg-neutral-900 text-white flex items-center justify-center font-bold text-sm relative z-20">
                                                        +{order.items.length - 3}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 text-center sm:text-left">
                                                <h4 className="font-bold text-lg mb-1">Order #{order.id.slice(-6).toUpperCase()}</h4>
                                                <p className="text-sm text-neutral-500 font-medium">
                                                    {format(order.createdAt, 'MMMM d, yyyy')} • {order.items.reduce((acc, i) => acc + i.quantity, 0)} Items
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-center sm:items-end gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                                <span className="font-black text-xl">₹{order.totalAmount}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>

                        {/* Split Row: Points & Events */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Points List */}
                            <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-sm border border-neutral-100/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-100 rounded-xl text-green-600">
                                        <TrendingUp size={20} />
                                    </div>
                                    <h3 className="font-fredoka font-bold text-xl">Point Activity</h3>
                                </div>

                                <div className="space-y-0 relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-neutral-100" />

                                    {points.length === 0 ? (
                                        <p className="text-neutral-500 italic text-sm text-center py-4">No activity yet.</p>
                                    ) : (
                                        points.map((point) => (
                                            <div key={point.id} className="relative flex items-start gap-4 py-3">
                                                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0 ${point.amount > 0 ? 'bg-green-500 text-white' : 'bg-red-50 text-red-500'}`}>
                                                    {point.amount > 0 ? '+' : '-'}
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <div className="flex justify-between items-start">
                                                        <p className="font-bold text-neutral-900 text-sm capitalize">{point.reason.replace(/_/g, ' ').toLowerCase()}</p>
                                                        <span className={`font-bold text-xs ${point.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                            {point.amount > 0 ? '+' : ''}{point.amount}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-neutral-400 mt-0.5">{format(point.createdAt, 'MMM d, h:mm a')}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>

                            {/* Events List */}
                            <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-sm border border-neutral-100/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                                        <Calendar size={20} />
                                    </div>
                                    <h3 className="font-fredoka font-bold text-xl">Upcoming Fun</h3>
                                </div>

                                <div className="space-y-4">
                                    {events.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-neutral-400 text-sm mb-4">No upcoming events.</p>
                                            <Link href="/events" className="text-sm font-bold bg-neutral-900 text-white px-4 py-2 rounded-xl hover:bg-neutral-800 transition-colors">
                                                Find Events
                                            </Link>
                                        </div>
                                    ) : (
                                        events.map((reg) => (
                                            <div key={reg.id} className="bg-neutral-50 p-4 rounded-2xl flex items-start gap-3 border border-neutral-100">
                                                <div className="bg-white rounded-xl p-2 text-center min-w-[50px] shadow-sm">
                                                    <span className="block text-xs font-bold text-purple-600 uppercase">{format(reg.event.startTime, 'MMM')}</span>
                                                    <span className="block text-lg font-black text-neutral-900">{format(reg.event.startTime, 'd')}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-neutral-900 line-clamp-1">{reg.event.title}</h4>
                                                    <span className="inline-block px-2 py-0.5 bg-white border border-neutral-200 rounded text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
                                                        {reg.event.type}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>

                        </div>

                    </div>
                </motion.div>
            </main>
        </div>
    );
}
