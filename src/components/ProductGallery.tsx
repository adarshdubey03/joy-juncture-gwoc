"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: string[];
    name: string;
    badges?: string[];
}

export function ProductGallery({ images, name, badges = [] }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="flex flex-col gap-6">
            {/* Main Image Stage */}
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white shadow-xl ring-1 ring-black/5 group">

                {/* Overlay Badges */}
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    {badges.map((badge, i) => (
                        <span
                            key={badge}
                            className="bg-[#F4C752] text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm"
                        >
                            {badge}
                        </span>
                    ))}
                </div>

                <div className="absolute inset-0 h-full w-full">
                    <Image
                        src={images[selectedIndex]}
                        alt={`${name} view ${selectedIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out"
                        priority
                    />
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`
                relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300
                ${selectedIndex === idx
                                    ? "border-black shadow-md scale-105 opacity-100 ring-2 ring-black/10 ring-offset-2"
                                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-105 bg-white scale-100"
                                }
              `}
                        >
                            <Image
                                src={img}
                                alt={`${name} thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
