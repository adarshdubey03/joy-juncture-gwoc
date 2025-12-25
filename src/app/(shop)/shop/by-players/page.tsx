"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/shop/product-card";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { products } from "@/lib/products";

export default function ShopByPlayersPage() {
    // All products with player count info
    const playerProducts = products;

    return (
        <main className="min-h-screen bg-secondary">
            <Navbar />

            <div className="pt-24 pb-12 bg-gradient-to-br from-primary to-accent text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop by Player Count</h1>
                    <p className="text-gray-200 max-w-2xl">
                        Whether you're playing solo, with a partner, or hosting a big group, find games that fit your crowd.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                <FilterSidebar />

                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {['2-4 Players', '4-6 Players', '6+ Players', 'Solo Playable'].map((range) => (
                            <button
                                key={range}
                                className="px-4 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-accent hover:bg-accent/5 transition-colors font-medium text-gray-700 hover:text-accent"
                            >
                                {range}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <p className="text-gray-500">Showing {playerProducts.length} games</p>
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
                        {playerProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

