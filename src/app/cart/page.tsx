"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (items.length === 0) {
        return (
            <main className="bg-[#FFF4D6] min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-[#F4C752]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🛒</span>
                    </div>
                    <h1 className="font-fredoka text-3xl text-black mb-3">
                        Your cart is empty
                    </h1>
                    <p className="text-neutral-600 mb-8">
                        Looks like you haven't added any games yet.
                        Ready to find your next favorite?
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-[#F4C752] text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition"
                    >
                        Go to Shop <ArrowRight size={18} />
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#FFF4D6] min-h-screen py-24 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="font-fredoka text-4xl text-black mb-12">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
                    {/* Cart Items List */}
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white p-6 rounded-2xl flex gap-6 items-center shadow-sm"
                            >
                                {/* Image */}
                                <div className="relative w-24 h-24 bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">No Image</div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <Link
                                            href={`/shop/${item.slug}`}
                                            className="font-fredoka text-xl text-black hover:underline"
                                        >
                                            {item.name}
                                        </Link>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-neutral-400 hover:text-red-500 transition p-1"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <p className="text-neutral-500 text-sm">₹{item.price}</p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 bg-neutral-100 rounded-full px-3 py-1.5">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="text-neutral-500 hover:text-black transition"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium min-w-[32px] px-2 text-center text-black">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="text-neutral-500 hover:text-black transition"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm sticky top-24">
                        <h2 className="font-fredoka text-2xl text-black mb-6">Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-neutral-600">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-neutral-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="border-t border-neutral-100 pt-4 flex justify-between text-lg font-bold text-black">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#F4C752] text-black font-semibold py-4 rounded-full hover:opacity-90 transition mb-4">
                            Proceed to Checkout
                        </button>

                        <p className="text-center text-xs text-neutral-400">
                            Secure Checkout powered by Joy Juncture.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
