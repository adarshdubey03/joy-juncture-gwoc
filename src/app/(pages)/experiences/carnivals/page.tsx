"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/experiences/enquiry-modal";
import { motion } from "framer-motion";
import { Tent, Users, Clock, CheckCircle } from "lucide-react";

export default function CarnivalsPage() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: "url('/contour-pattern.svg')", backgroundSize: "300px" }} />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                            <Tent className="w-4 h-4" />
                            <span className="text-sm font-bold">Carnivals & Game Zones</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Transform Any Event into a Carnival
                        </h1>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl">
                            Large-format games, interactive setups, and immersive experiences that draw crowds and create unforgettable moments.
                        </p>
                        <Button
                            size="lg"
                            className="rounded-full px-8 text-lg h-14 bg-white text-purple-600 hover:bg-white/90"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Plan Your Carnival
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Problem → Solution */}
            <section className="py-24 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">The Challenge</h2>
                            <ul className="space-y-4 text-gray-600 text-lg">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span>Events that fail to engage attendees</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span>Lack of interactive elements and photo ops</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span>Difficulty creating a festive atmosphere</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span>Need to appeal to diverse age groups</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Solution</h2>
                            <ul className="space-y-4 text-gray-600 text-lg">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 mt-1 w-6 h-6 flex-shrink-0" />
                                    <span>Large-format games that create spectacle</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 mt-1 w-6 h-6 flex-shrink-0" />
                                    <span>Multiple game zones for different interests</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 mt-1 w-6 h-6 flex-shrink-0" />
                                    <span>Professional setup and breakdown</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 mt-1 w-6 h-6 flex-shrink-0" />
                                    <span>Guaranteed to draw crowds and create buzz</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">What's Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { icon: Tent, title: "Large Setup", desc: "Multiple zones and stations" },
                            { icon: Clock, title: "Full Day", desc: "Setup to breakdown included" },
                            { icon: Users, title: "Game Masters", desc: "On-site facilitators" },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center p-8 bg-secondary rounded-2xl"
                                >
                                    <Icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create a Spectacle?</h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Let's transform your event into an unforgettable carnival experience
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-8 text-lg h-14 bg-white text-purple-600 hover:bg-white/90"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Get Started
                    </Button>
                </div>
            </section>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                experienceTitle="Carnivals & Game Zones"
            />
            <Footer />
        </main>
    );
}

