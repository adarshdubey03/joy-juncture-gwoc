"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/experiences/enquiry-modal";
import { motion } from "framer-motion";
import { Briefcase, Heart, PartyPopper, Tent } from "lucide-react";

const experiences = [
    {
        id: "corporate",
        title: "Corporate Engagement",
        description: "Boost team morale and collaboration with our curated board game sessions. Perfect for ice-breakers, team building, and stress relief.",
        icon: Briefcase,
        color: "bg-blue-500",
        image: "bg-blue-100",
    },
    {
        id: "weddings",
        title: "Weddings",
        description: "Add a touch of fun to your special day. Keep guests entertained during transitions or host a dedicated game zone for the kids (and adults!).",
        icon: Heart,
        color: "bg-pink-500",
        image: "bg-pink-100",
    },
    {
        id: "birthdays",
        title: "Birthdays & Anniversaries",
        description: "Celebrate milestones with laughter and friendly competition. We bring the games and the game masters to you.",
        icon: PartyPopper,
        color: "bg-yellow-500",
        image: "bg-yellow-100",
    },
    {
        id: "carnivals",
        title: "Carnivals & Game Zones",
        description: "Transform any event into a carnival with our large-format games and interactive setups. Guaranteed to draw a crowd.",
        icon: Tent,
        color: "bg-purple-500",
        image: "bg-purple-100",
    },
];

export default function ExperiencesPage() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedExperience, setSelectedExperience] = React.useState("");

    const handleEnquire = (title: string) => {
        setSelectedExperience(title);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-secondary">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 bg-primary text-white text-center">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Custom Game Experiences
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        We don't just sell games; we create unforgettable moments. Let us curate the perfect gaming experience for your next event.
                    </motion.p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            >
                                <div className={`h-64 ${exp.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                    <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                                        <exp.icon className={`w-8 h-8 ${exp.color.replace("bg-", "text-")}`} />
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-3xl font-bold mb-4 group-hover:text-accent transition-colors">
                                        {exp.title}
                                    </h3>
                                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                        {exp.description}
                                    </p>
                                    <Button
                                        size="lg"
                                        className="w-full rounded-xl text-lg font-bold"
                                        onClick={() => handleEnquire(exp.title)}
                                    >
                                        Enquire Now
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                experienceTitle={selectedExperience}
            />

            <Footer />
        </main>
    );
}
