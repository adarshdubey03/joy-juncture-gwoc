"use client";

import { useCart } from "@/context/CartContext";
import { placeOrder, verifyOrderPayment } from "@/actions/checkout-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Coins, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Calculate potential points (1 point per ₹10)
    const potentialPoints = Math.floor(cartTotal / 10);

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            // 1. Create Order
            const result = await placeOrder(items, cartTotal);

            if (result.error) {
                setError(result.error);
                setIsProcessing(false);
                return;
            }

            if (result.success && result.razorpayOrderId) {
                // 2. Open Razorpay Modal
                const options = {
                    key: result.key,
                    amount: result.amount,
                    currency: result.currency,
                    name: "Joy Juncture",
                    description: "Order Payment",
                    order_id: result.razorpayOrderId,
                    handler: async function (response: any) {
                        try {
                            const verifyResult = await verifyOrderPayment(
                                response.razorpay_order_id,
                                response.razorpay_payment_id,
                                response.razorpay_signature
                            );

                            if ('success' in verifyResult && verifyResult.success) {
                                clearCart();
                                router.push("/profile");
                            } else {
                                setError("Payment verification failed");
                                setIsProcessing(false);
                            }
                        } catch (e) {
                            console.error(e);
                            setError("Payment verification error");
                            setIsProcessing(false);
                        }
                    },
                    prefill: {
                        name: "Gamer", // We could pass user details if available in context
                        email: "gamer@joyjuncture.com",
                        contact: "9999999999",
                    },
                    theme: {
                        color: "#F4C752",
                    },
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on("payment.failed", function (response: any) {
                    setError(response.error.description || "Payment failed");
                    setIsProcessing(false);
                });
                rzp1.open();
            } else {
                setError("Failed to initiate payment");
                setIsProcessing(false);
            }

        } catch (e) {
            setError("Something went wrong. Please try again.");
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFF4D6]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold font-fredoka mb-4">Your cart is empty</h1>
                    <Link href="/shop" className="text-blue-600 hover:underline">Return to Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FFF4D6] py-24 px-4 sm:px-6 lg:px-8">
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-fredoka font-bold text-center mb-12 text-neutral-900">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 h-fit">
                        <h2 className="text-xl font-bold mb-6 font-fredoka flex items-center gap-2">
                            Order Summary
                        </h2>
                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="relative w-16 h-16 bg-neutral-100 rounded-xl overflow-hidden shrink-0">
                                        {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{item.name}</p>
                                        <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>
                    </div>

                    {/* Points & Payment */}
                    <div className="space-y-6">

                        {/* Gamification Card */}
                        <div className="bg-gradient-to-br from-[#F4C752] to-[#FFD970] p-6 rounded-3xl shadow-lg shadow-[#F4C752]/20 text-neutral-900">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                    <Coins size={32} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold font-fredoka">Joy Rewards</h3>
                                    <p className="opacity-90 leading-snug text-sm mt-1">
                                        You will earn <span className="font-black text-lg">{potentialPoints} Points</span> with this purchase!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Selection */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <h2 className="text-xl font-bold mb-6 font-fredoka">Payment method</h2>
                            <p className="text-sm text-neutral-500 mb-6">
                                Secure payment via Razorpay.
                            </p>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2 text-sm">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                                className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay ₹{cartTotal} <CheckCircle size={18} />
                                    </>
                                )}
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}
