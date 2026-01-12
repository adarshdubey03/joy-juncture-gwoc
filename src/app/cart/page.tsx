"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (items.length === 0) {
        return (
            <main className="bg-[#FFF4D6] min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md bg-white p-12 rounded-3xl shadow-lg border border-neutral-100">
                    <div className="w-24 h-24 bg-[#FFF4D6] rounded-full flex items-center justify-center mx-auto mb-6 text-[#F4C752]">
                        <ShoppingBag size={48} />
                    </div>
                    <h1 className="font-fredoka text-3xl text-black mb-3">
                        Your cart is empty
                    </h1>
                    <p className="text-neutral-500 mb-8 text-lg">
                        Looks like you haven't added any games yet.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-[#F4C752] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#F2B928] hover:scale-105 transition-all w-full justify-center"
                    >
                        Go to Shop <ArrowRight size={20} />
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#FFF4D6] min-h-screen py-24 px-4 relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="mb-12 text-center lg:text-left">
                    <h1 className="font-fredoka text-5xl text-black mb-2">Your Cart</h1>
                    <p className="text-neutral-600 font-medium">
                        {items.length} {items.length === 1 ? "item" : "items"} currently in your cart
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
                    {/* Cart Items List */}
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white p-4 sm:p-6 rounded-3xl flex gap-6 items-center shadow-sm border border-neutral-100 transition-all hover:shadow-md"
                            >
                                {/* Image */}
                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-neutral-100 rounded-2xl overflow-hidden flex-shrink-0 border border-neutral-200/50">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 112px, 128px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 gap-2">
                                            <ShoppingBag size={24} className="opacity-20" />
                                            <span className="text-[10px] uppercase font-bold tracking-wider">No Image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                                        <Link
                                            href={`/shop/${item.slug}`}
                                            className="font-fredoka text-xl sm:text-2xl text-black hover:text-[#F4C752] transition-colors truncate block"
                                        >
                                            {item.name}
                                        </Link>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="self-start sm:self-auto text-neutral-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap items-end justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-neutral-500 font-medium uppercase tracking-wide mb-1">Price</p>
                                            <p className="font-bold text-xl text-black">₹{item.price}</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-1 bg-neutral-50 rounded-xl p-1 border border-neutral-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-black hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} strokeWidth={3} />
                                            </button>
                                            <span className="text-black font-bold w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-black hover:bg-neutral-100 transition-colors"
                                            >
                                                <Plus size={14} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl shadow-[#F4C752]/10 border border-[#F4C752]/20 sticky top-24">
                        <h2 className="font-fredoka text-3xl text-black mb-8">Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-neutral-600 font-medium">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-neutral-600 font-medium">
                                <span>Shipping</span>
                                <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm font-bold">Free</span>
                            </div>
                            <div className="h-px bg-neutral-100 my-4" />
                            <div className="flex justify-between text-2xl font-bold text-black items-center">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <Link href="/shop/checkout">
                            <button className="w-full bg-[#F4C752] text-black font-bold text-lg py-5 rounded-2xl hover:bg-[#F2B928] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#F4C752]/20 mb-6">
                                Proceed to Checkout
                            </button>
                        </Link>

                        <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Secure Checkout powered by Joy Juncture
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
