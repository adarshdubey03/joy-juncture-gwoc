"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/context/CartContext";
import { Check } from "lucide-react";

type AddToCartButtonProps = {
    product: {
        id: string;
        slug: string;
        name: string;
        price: number;
        image: string;
    };
    className?: string;
    variant?: "primary" | "outline";
};

export default function AddToCartButton({
    product,
    className = "",
    variant = "primary"
}: AddToCartButtonProps) {
    const { addToCart, items } = useCart(); // Added items from useCart
    const [isAdded, setIsAdded] = useState(false);
    const router = useRouter(); // Initialized useRouter

    const isInCart = items.some((item) => item.id === product.id); // Added isInCart check

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if inside a Link

        if (isInCart) { // Added conditional logic for isInCart
            router.push("/cart");
            return;
        }

        addToCart(product);

        // Quick feedback animation
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const baseStyles = "flex items-center justify-center text-sm font-medium py-3 rounded-full transition-all duration-200 active:scale-95";

    const variants = {
        primary: "bg-[#F4C752] text-black hover:opacity-90 hover:shadow-lg",
        outline: "border border-[#F4C752] text-black hover:bg-[#F4C752] hover:shadow-md",
    };

    return (
        <button
            onClick={handleClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {isInCart ? ( // Modified button content based on isInCart
                "Go to Cart"
            ) : isAdded ? (
                <span className="flex items-center gap-2">
                    <Check size={16} /> Added
                </span>
            ) : (
                "Add to cart"
            )}
        </button>
    );
}
