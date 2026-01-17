"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { ProductCardBadges } from "./ProductCardBadges";

interface ProductCardProps {
    product: Product;
    variant?: "default" | "compact";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
    return (
        <article
            className={`bg-white rounded-[2rem] border border-neutral-100 flex flex-col gap-4 shadow-sm h-full ${variant === "default" ? "p-4" : "p-3"}`}
        >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] bg-[#FFF9E9] rounded-2xl overflow-hidden">
                {/* Top Badges (Sales/New) */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {product.badges?.map((badge) => {
                        if (["Sale", "New", "Bestseller"].includes(badge)) {
                            return (
                                <span key={badge} className="px-2.5 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-lg text-xs font-bold text-black border border-black/5">
                                    {badge}
                                </span>
                            )
                        }
                        return null;
                    })}
                </div>

                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 px-2 pb-2">
                <div className="flex justify-between items-start gap-2">
                    <h2 className={`font-fredoka text-black leading-tight ${variant === "default" ? "text-2xl" : "text-xl"}`}>
                        {product.name}
                    </h2>
                    <div className="text-right shrink-0">
                        <p className={`font-black tracking-tight text-neutral-900 ${variant === "default" ? "text-xl" : "text-lg"}`}>₹{product.price}</p>
                        {product.originalPrice && (
                            <p className="text-xs text-neutral-400 line-through">₹{product.originalPrice}</p>
                        )}
                    </div>
                </div>

                {variant === "default" && (
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 min-h-[40px] mt-1">
                        {product.description}
                    </p>
                )}

                {/* Scalable Badge System - Only for Default */}
                {variant === "default" && (
                    <div className="mt-auto pt-3">
                        <ProductCardBadges product={product} />
                    </div>
                )}

                {/* View Details Button */}
                <Link
                    href={`/shop/${product.slug}`}
                    className={`mt-auto flex items-center justify-center gap-2 w-full rounded-xl font-bold transition-all ${variant === "default"
                        ? "py-3 bg-[#F4C752] border border-[#F4C752] text-neutral-900 mt-4 shadow-sm"
                        : "py-2 bg-transparent text-[#F4C752] text-sm mt-2"
                        }`}
                >
                    {variant === "default" ? "View Details" : "View Details"}
                    <ArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
}
