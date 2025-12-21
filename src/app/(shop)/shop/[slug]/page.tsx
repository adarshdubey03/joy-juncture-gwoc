"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StickyBuyBar } from "@/components/shop/sticky-buy-bar";
import { formatCurrency, cn } from "@/lib/utils";
import { Star, Minus, Plus, ShoppingCart, Check, PlayCircle, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Dummy Data
const product = {
    id: "1",
    name: "Dead Man's Deck",
    price: 999,
    description: "A high-stakes card game where you bluff, bet, and survive. Perfect for parties and game nights.",
    images: ["bg-red-900", "bg-red-800", "bg-red-700"],
    rating: 4.8,
    reviews: 124,
    features: ["2-6 Players", "30-45 Mins", "Ages 14+"],
    story: "Legend has it that this deck was found on a ghost ship...",
    howToPlay: [
        "Deal 5 cards to each player.",
        "Place your bets using the gold coins.",
        "Bluff your way to victory or fold.",
    ],
};

export default function ProductPage({ params }: { params: { slug: string } }) {
    const [activeTab, setActiveTab] = React.useState("story");
    const [quantity, setQuantity] = React.useState(1);
    const [showStickyBar, setShowStickyBar] = React.useState(false);
    const heroRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyBar(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24" ref={heroRef}>
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-3xl bg-gray-100 relative overflow-hidden group">
                            <div className={`w-full h-full ${product.images[0]} transition-transform duration-500 group-hover:scale-110`} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {product.images.map((img, i) => (
                                <div key={i} className="aspect-square rounded-xl bg-gray-100 cursor-pointer overflow-hidden hover:ring-2 ring-accent transition-all">
                                    <div className={`w-full h-full ${img}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="accent">Bestseller</Badge>
                            <div className="flex items-center text-yellow-500 text-sm font-bold">
                                <Star className="w-4 h-4 fill-current mr-1" />
                                {product.rating} ({product.reviews} reviews)
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{product.name}</h1>
                        <p className="text-2xl font-bold text-accent mb-6">{formatCurrency(product.price)}</p>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {product.features.map((feature, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl text-center">
                                    {i === 0 ? <Users className="w-6 h-6 mb-2 text-primary" /> : i === 1 ? <Clock className="w-6 h-6 mb-2 text-primary" /> : <Check className="w-6 h-6 mb-2 text-primary" />}
                                    <span className="font-bold text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center border border-gray-200 rounded-full px-4 py-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <Button size="lg" className="flex-1 rounded-full h-14 text-lg gap-2 shadow-xl shadow-accent/20">
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                        {["Story", "How to Play", "Reviews"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={cn(
                                    "px-8 py-4 text-lg font-bold transition-colors border-b-2 whitespace-nowrap",
                                    activeTab === tab.toLowerCase()
                                        ? "border-accent text-accent"
                                        : "border-transparent text-gray-400 hover:text-primary"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[300px]">
                        {activeTab === "story" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-lg max-w-none">
                                <p>{product.story}</p>
                                <p>More detailed story content would go here, immersing the player in the world of the game.</p>
                            </motion.div>
                        )}
                        {activeTab === "how to play" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                {product.howToPlay.map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Step {i + 1}</h3>
                                            <p className="text-gray-600 text-lg">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                        {activeTab === "reviews" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="bg-gray-50 rounded-2xl p-8 text-center mb-8">
                                    <h3 className="text-2xl font-bold mb-2">Customer Reviews</h3>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="fill-current" />)}
                                        </div>
                                        <span className="font-bold text-xl">4.8 out of 5</span>
                                    </div>
                                    <p className="text-gray-500">Based on 124 reviews</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <StickyBuyBar productName={product.name} price={product.price} isVisible={showStickyBar} />
            <Footer />
        </main>
    );
}
