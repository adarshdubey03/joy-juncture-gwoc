"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/shop/product-card";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { products } from "@/lib/products";

export default function ShopByOccasionPage() {
    // Filter products by occasion tags (in real app, this would come from database)
    const occasionProducts = products.filter(p => 
        p.occasion?.some(o => 
            ['Party', 'Family', 'Date Night', 'Wedding', 'Corporate', 'Birthday'].includes(o)
        )
    );

    return (
        <main className="min-h-screen bg-secondary">
            <Navbar />

            <div className="pt-24 pb-12 bg-gradient-to-br from-primary to-accent text-white">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop by Occasion</h1>
                    <p className="text-gray-200 max-w-2xl">
                        Find the perfect game for your next celebration, gathering, or special moment.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                <FilterSidebar />

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-gray-500">Showing {occasionProducts.length} games for special occasions</p>
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
                        {occasionProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

