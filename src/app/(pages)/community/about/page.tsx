"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const timeline = [
    { year: "2020", title: "The Beginning", description: "Joy Juncture was founded with a simple mission: to bring people together through games." },
    { year: "2021", title: "First Game Launch", description: "We launched our first original game, 'The Bloody Inheritance', which became an instant hit." },
    { year: "2022", title: "Community Growth", description: "Our community grew to over 10,000 members, and we hosted our first national tournament." },
    { year: "2023", title: "Going Digital", description: "We launched our online platform, allowing players to compete and connect globally." },
];

const team = [
    { name: "Adarsh Dubey", role: "Founder & CEO", image: "bg-blue-500" },
    { name: "Khusboo Meena", role: "Creative Director", image: "bg-pink-500" },
    { name: "Rohan Das", role: "Head of Product", image: "bg-green-500" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-20 bg-secondary text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-6">Our Story</h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        We believe that games are more than just entertainment. They are a way to connect, to learn, and to create lasting memories. At Joy Juncture, we are dedicated to crafting experiences that bring joy to your life.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Our Journey</h2>
                    <div className="max-w-4xl mx-auto relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />

                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row items-center gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                <div className="flex-1 text-center md:text-left">
                                    <div className={`p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                                        <span className="text-accent font-bold text-xl block mb-2">{item.year}</span>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-500">{item.description}</p>
                                    </div>
                                </div>

                                <div className="w-4 h-4 rounded-full bg-accent relative z-10 ring-4 ring-white" />

                                <div className="flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-secondary">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className={`w-48 h-48 mx-auto rounded-full ${member.image} mb-6 overflow-hidden relative shadow-xl`}>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-gray-500">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
