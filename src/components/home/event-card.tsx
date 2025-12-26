"use client";

import React, { useState } from "react";
import { Heart, Share2, ChevronDown, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EventCardProps {
    title: string;
    date: string;
    description: string;
    imageClass: string;
    imageUrl?: string;
}

export function EventCard({ title, date, description, imageClass, imageUrl }: EventCardProps) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="w-full max-w-[345px] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            {/* Card Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-medium">
                        {title.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{title}</h3>
                        <p className="text-xs text-gray-500">{date}</p>
                    </div>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Card Media */}
            <div
                className={cn("h-[194px] w-full bg-gray-100", imageClass)}
                style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
                {/* Fallback pattern or gradient is handled by imageClass if image not present */}
            </div>

            {/* Card Content */}
            <div className="p-4">
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {description}
                </p>
            </div>

            {/* Card Actions */}
            <div className="px-2 pb-2 flex items-center justify-between mt-auto">
                <div className="flex gap-1">
                    <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
                <button
                    onClick={handleExpandClick}
                    className={cn(
                        "text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-transform duration-300",
                        expanded ? "rotate-180" : "rotate-0"
                    )}
                >
                    <ChevronDown className="w-5 h-5" />
                </button>
            </div>

            {/* Collapse Content */}
            <div
                className={cn(
                    "overflow-hidden transition-[max-height] duration-300 ease-in-out px-4",
                    expanded ? "max-h-[500px] mb-4" : "max-h-0"
                )}
            >
                <div className="border-t border-gray-100 pt-4">
                    <p className="mb-2 font-medium text-sm text-gray-900">Details:</p>
                    <p className="mb-2 text-sm text-gray-600">
                        Join us for an exciting session of strategy and fun.
                    </p>
                    <p className="mb-2 text-sm text-gray-600">
                        Whether you are a beginner or a pro, there is something for everyone. Don't miss out on the prizes!
                    </p>
                    <p className="text-sm text-gray-600">
                        Registration starts 30 mins before the event.
                    </p>
                </div>
            </div>
        </div>
    );
}
