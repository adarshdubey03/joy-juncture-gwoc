"use client";

import { motion } from "framer-motion";
import { Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking on buttons or links
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) {
            return;
        }
        router.push(`/shop/${product.slug}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAdding(true);
        addToCart(product, 1);
        setTimeout(() => setIsAdding(false), 500);
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/shop/${product.slug}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={handleCardClick}
            >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                        {product.badges?.map((badge) => (
                            <Badge key={badge} variant="accent" className="shadow-sm">
                                {badge}
                            </Badge>
                        ))}
                    </div>

                    {/* Image with Parallax/Zoom Effect */}
                    <Link href={`/shop/${product.slug}`} onClick={(e) => e.stopPropagation()}>
                        {product.image?.startsWith('/') ? (
                            <motion.img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            />
                        ) : (
                            <motion.div
                                className={`w-full h-full bg-cover bg-center cursor-pointer ${product.image.startsWith('bg-') ? product.image : ''}`}
                                style={!product.image.startsWith('bg-') ? { backgroundImage: `url(${product.image})` } : undefined}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            />
                        )}
                    </Link>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <Button
                            size="icon"
                            className="rounded-full bg-white text-primary hover:bg-accent hover:text-white transition-colors"
                            title="Quick View"
                            onClick={handleQuickView}
                        >
                            <Eye className="w-5 h-5" />
                        </Button>
                        <Button
                            size="icon"
                            className={`rounded-full bg-white text-primary hover:bg-accent hover:text-white transition-colors ${isAdding ? 'scale-110' : ''}`}
                            title="Add to Cart"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <Link href={`/shop/${product.slug}`} onClick={(e) => e.stopPropagation()}>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">{formatCurrency(product.price)}</span>
                        <div className="flex gap-1">
                            {/* Rating stars could go here */}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
