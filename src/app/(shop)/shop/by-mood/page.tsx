"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/shop/product-card";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { products } from "@/lib/products";

export default function ShopByMoodPage() {
    // All products available for mood filtering
    const moodProducts = products;

    const moods = [
        { name: "Fun & Silly", emoji: "😂", color: "from-yellow-400 to-orange-500" },
        { name: "Strategic", emoji: "🧠", color: "from-blue-500 to-indigo-600" },
        { name: "Cozy & Chill", emoji: "☕", color: "from-purple-400 to-pink-500" },
        { name: "Competitive", emoji: "⚡", color: "from-red-500 to-orange-600" },
        { name: "Cooperative", emoji: "🤝", color: "from-green-500 to-emerald-600" },
        { name: "Mystery", emoji: "🔍", color: "from-gray-700 to-gray-900" },
    ];

    return (
        <main className="min-h-screen bg-secondary">
            <Navbar />

            <div className="pt-24 pb-12 bg-gradient-to-br from-primary to-accent text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop by Mood / Vibe</h1>
                    <p className="text-gray-200 max-w-2xl">
                        Find games that match the energy you're looking for. Whether you want laughs, strategy, or mystery.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                <FilterSidebar />

                <div className="flex-1">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Choose Your Vibe</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {moods.map((mood) => (
                                <button
                                    key={mood.name}
                                    className={`p-6 rounded-2xl bg-gradient-to-br ${mood.color} text-white hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl`}
                                >
                                    <div className="text-4xl mb-2">{mood.emoji}</div>
                                    <div className="font-bold text-lg">{mood.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <p className="text-gray-500">Showing {moodProducts.length} games</p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select className="bg-transparent border-none font-medium focus:ring-0 cursor-pointer">
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {moodProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

