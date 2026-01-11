"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductCardBadges } from "./ProductCardBadges";

interface ProductCardProps {
    product: Product;
    variant?: "default" | "compact";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`bg-white rounded-[2rem] border border-neutral-100 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-[#F4C752]/20 transition-all group h-full ${variant === "default" ? "p-4" : "p-3"}`}
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
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Quick Add Overlay */}
                <div className="absolute bottom-3 right-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-[#F4C752] transition-colors">
                        <ShoppingCart size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 px-2 pb-2">
                <div className="flex justify-between items-start gap-2">
                    <h2 className={`font-fredoka text-black leading-tight group-hover:text-[#dba926] transition-colors ${variant === "default" ? "text-2xl" : "text-xl"}`}>
                        {product.name}
                    </h2>
                    <div className="text-right shrink-0">
                        <p className={`font-bold ${variant === "default" ? "text-lg" : "text-base"}`}>₹{product.price}</p>
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
                    className={`mt-auto flex items-center justify-center gap-2 w-full rounded-xl font-bold transition-all group/btn ${variant === "default"
                            ? "py-3 bg-neutral-50 border border-neutral-100 text-neutral-900 hover:bg-black hover:text-[#F4C752] mt-4"
                            : "py-2 bg-transparent text-[#F4C752] hover:text-black hover:bg-neutral-50 text-sm mt-2"
                        }`}
                >
                    {variant === "default" ? "View Details" : "View Details"}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.article>
    );
}
