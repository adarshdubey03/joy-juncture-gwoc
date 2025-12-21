"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filters = [
    {
        id: "occasion",
        name: "Occasion",
        options: ["Party", "Family Night", "Date Night", "Travel", "Drinking"],
    },
    {
        id: "players",
        name: "Players",
        options: ["2 Players", "3-5 Players", "6+ Players", "Solo"],
    },
    {
        id: "mood",
        name: "Mood/Vibe",
        options: ["Strategy", "Funny", "Ice Breaker", "Competitive", "Cooperative"],
    },
    {
        id: "price",
        name: "Price",
        options: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "Above ₹2000"],
    },
];

export function FilterSidebar() {
    const [openSections, setOpenSections] = React.useState<string[]>(["occasion", "players"]);

    const toggleSection = (id: string) => {
        setOpenSections((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between lg:hidden mb-4">
                    <h2 className="font-bold text-lg">Filters</h2>
                    <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                </div>

                <div className="hidden lg:block space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-xl">Filters</h2>
                        <button className="text-sm text-accent hover:underline">Clear All</button>
                    </div>

                    {filters.map((section) => (
                        <div key={section.id} className="border-b border-gray-100 pb-4">
                            <button
                                className="flex items-center justify-between w-full py-2 font-medium text-left hover:text-accent transition-colors"
                                onClick={() => toggleSection(section.id)}
                            >
                                {section.name}
                                {openSections.includes(section.id) ? (
                                    <ChevronUp className="w-4 h-4" />
                                ) : (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </button>

                            {openSections.includes(section.id) && (
                                <div className="mt-2 space-y-2">
                                    {section.options.map((option) => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
