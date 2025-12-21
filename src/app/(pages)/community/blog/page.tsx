"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

const posts = [
    {
        id: 1,
        title: "Top 10 Strategy Games for 2024",
        excerpt: "Discover the best strategy board games that will challenge your mind and test your friendships.",
        image: "bg-blue-200",
        author: "Alex Chen",
        date: "Dec 15, 2024",
        category: "Reviews",
    },
    {
        id: 2,
        title: "How to Host the Perfect Game Night",
        excerpt: "From snacks to seating, here's everything you need to know to throw a legendary game night.",
        image: "bg-orange-200",
        author: "Sarah Jones",
        date: "Dec 10, 2024",
        category: "Guides",
    },
    {
        id: 3,
        title: "The History of Board Games",
        excerpt: "Take a journey through time and explore the origins of your favorite tabletop games.",
        image: "bg-purple-200",
        author: "Mike Ross",
        date: "Dec 05, 2024",
        category: "History",
    },
    {
        id: 4,
        title: "Interview with a Game Designer",
        excerpt: "We sat down with the creator of 'Dead Man's Deck' to discuss inspiration and design challenges.",
        image: "bg-red-200",
        author: "Emily White",
        date: "Nov 28, 2024",
        category: "Interviews",
    },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-secondary">
            <Navbar />

            <section className="pt-32 pb-20 bg-primary text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6">Community Blog</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Stories, strategies, and news from the world of tabletop gaming.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 border-none shadow-md group">
                                <div className={`h-48 ${post.image} relative overflow-hidden`}>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                        {post.category}
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                </div>

                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {post.author}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 mb-6 line-clamp-3 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <Link href="#" className="inline-flex items-center text-accent font-bold hover:underline mt-auto">
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
