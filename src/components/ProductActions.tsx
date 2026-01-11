"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";

interface ProductActionsProps {
    price: number;
    originalPrice?: number;
    productName: string;
}

export function ProductActions({ price, originalPrice, productName }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQty = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        // In a real app, this would use a cart context
        console.log(`Added ${quantity} of ${productName} to cart`);
        alert(`Added ${quantity} ${productName}(s) to cart!`);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Price Display for Mobile (optional, usually handled in parent but good just in case) */}

            <div className="flex gap-4 items-stretch h-14">
                {/* Quantity Selector */}
                <div className="flex items-center bg-white rounded-xl px-2 border-2 border-neutral-300 shadow-sm">
                    <button
                        onClick={decreaseQty}
                        className="w-10 h-full flex items-center justify-center text-black hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={20} className="font-bold" />
                    </button>

                    <span className="w-8 text-center font-black text-xl text-black">{quantity}</span>

                    <button
                        onClick={increaseQty}
                        className="w-10 h-full flex items-center justify-center text-black hover:bg-neutral-100 rounded-lg transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus size={20} className="font-bold" />
                    </button>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#F4C752] hover:bg-[#F2B928] text-black font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                    <ShoppingCart size={20} />
                    <span>Add to Cart - ₹{price * quantity}</span>
                </button>

                {/* Wishlist Button */}
                <button
                    className="w-14 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                    aria-label="Add to wishlist"
                >
                    <Heart size={24} />
                </button>
            </div>
        </div>
    );
}
