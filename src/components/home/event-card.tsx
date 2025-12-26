"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EventCardProps {
    title: string;
    date: string;
    subtitle?: string;
    description?: string;
    imageUrl: string;
}

export function EventCard({ title, date, subtitle, description, imageUrl }: EventCardProps) {
    return (
        <div className="relative grid h-[32rem] w-full max-w-[24rem] items-end justify-center overflow-hidden text-center rounded-xl bg-gray-900 shadow-xl group cursor-pointer transition-transform hover:-translate-y-1">
            {/* Background Image */}
            <div
                className="absolute inset-0 m-0 h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${imageUrl}')` }}
            >
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative py-14 px-6 md:px-12 flex flex-col items-center justify-end h-full">
                <h2 className="mb-4 text-2xl md:text-3xl font-medium leading-[1.2] text-white font-heading">
                    {title}
                </h2>
                <div className="mb-4 flex flex-col gap-1">
                    <span className="text-lg font-bold text-accent">
                        {date}
                    </span>
                    {subtitle && (
                        <span className="text-sm text-gray-300 font-medium uppercase tracking-wider">
                            {subtitle}
                        </span>
                    )}
                </div>

                {/* Optional Avatar/Icon placeholder if needed later */}
                {/* <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-500" /> */}
            </div>
        </div>
    );
}
