"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import type { Product } from "@/lib/products";

interface StickyBuyBarProps {
    productName: string;
    price: number;
    isVisible: boolean;
    product: Product;
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export function StickyBuyBar({ productName, price, isVisible, product, quantity, setQuantity }: StickyBuyBarProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = React.useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, quantity);
        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] py-4 px-4 md:px-8"
                >
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="hidden md:block">
                            <h3 className="font-bold text-lg">{productName}</h3>
                            <p className="text-accent font-bold">{formatCurrency(price)}</p>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <Button 
                                className="flex-1 md:flex-none gap-2 rounded-full px-8"
                                onClick={handleAddToCart}
                                disabled={isAdding}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {isAdding ? "Adding..." : `Add to Cart - ${formatCurrency(price * quantity)}`}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
