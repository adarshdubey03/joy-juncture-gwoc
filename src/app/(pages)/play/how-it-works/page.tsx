"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HowItWorks } from "@/components/play/how-it-works";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-secondary to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
                            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">JJ Games</span> Work
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Joy Juncture is more than games. It's a complete ecosystem where every play counts, every event matters, and every moment creates joy.
                        </p>
                    </motion.div>
                </div>
            </section>

            <HowItWorks />

            {/* The 4 Pillars Section */}
            <section className="py-24 bg-gradient-to-b from-white to-secondary">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Four Pillars</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Everything we do revolves around these four core experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Games & Products",
                                description: "Shop physical and digital games",
                                icon: ShoppingBag,
                                href: "/shop",
                                color: "from-blue-500 to-cyan-500",
                            },
                            {
                                title: "Events & Experiences",
                                description: "Join live game nights and workshops",
                                icon: Users,
                                href: "/events",
                                color: "from-purple-500 to-pink-500",
                            },
                            {
                                title: "Custom Experiences",
                                description: "Corporate, weddings, and special occasions",
                                icon: Users,
                                href: "/experiences",
                                color: "from-orange-500 to-red-500",
                            },
                            {
                                title: "Community & Gamification",
                                description: "Earn points, unlock rewards, connect",
                                icon: Play,
                                href: "/community/wallet",
                                color: "from-pink-500 to-rose-500",
                            },
                        ].map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={pillar.href}
                                        className="block h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-accent transition-colors">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-accent font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            Explore <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Playing?</h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Join thousands of players who are already earning points and having fun
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/shop">
                            <Button size="lg" className="rounded-full px-8 text-lg h-14">
                                Shop Games
                            </Button>
                        </Link>
                        <Link href="/play/free-games">
                            <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-14 border-white/20 text-white hover:bg-white/10">
                                Play Free Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

