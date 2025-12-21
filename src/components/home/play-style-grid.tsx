import Link from "next/link";
import { cn } from "@/lib/utils";

const playStyles = [
    {
        title: "Solo Adventures",
        href: "/play/solo",
        gradient: "from-[#0a5f7b] to-[#1e8ab6]", // Teal/Blue bio-theme
    },
    {
        title: "Group Quests",
        href: "/play/group",
        gradient: "from-purple-700 to-indigo-500",
    },
    {
        title: "Competitive Arenas",
        href: "/play/competitive",
        gradient: "from-orange-600 to-red-500",
    },
    {
        title: "Creative Workshops",
        href: "/play/creative",
        gradient: "from-pink-600 to-rose-400",
    },
];

export function PlayStyleGrid() {
    return (
        <section className="py-20 bg-transparent">
            <div className="container mx-auto px-6 max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Choose Your Play Style</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {playStyles.map((style, index) => (
                        <Link
                            key={index}
                            href={style.href}
                            className={cn(
                                "group card block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative h-[350px]",
                                `bg-gradient-to-b ${style.gradient}`
                            )}
                        >
                            {/* Optional Image Overlay - Placeholder logic */}
                            {/* In a real app, we'd use Next.js Image component here if images existed */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-300 mix-blend-overlay"
                            // style={{ backgroundImage: `url(${style.image})` }}
                            />

                            {/* Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-end justify-center p-8 text-center text-white pb-12">
                                <h4 className="text-2xl md:text-3xl font-bold mb-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
                                    {style.title}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
