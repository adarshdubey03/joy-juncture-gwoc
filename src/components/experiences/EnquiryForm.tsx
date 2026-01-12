"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface EnquiryFormProps {
    headline: string;
    subtext: string;
    ctaText: string;
    experienceType: string;
}

export default function EnquiryForm({
    headline,
    subtext,
    ctaText,
    experienceType,
}: EnquiryFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        guestCount: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", { ...formData, experienceType });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="py-20 px-6 bg-gradient-to-br from-[#FFF4D6] via-[#FFE8B3] to-[#F4C752]/30">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">
                        {headline}
                    </h2>
                    <p className="text-xl text-neutral-700 font-medium">{subtext}</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl p-10 shadow-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-neutral-900 mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#F4C752] focus:outline-none transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-neutral-900 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#F4C752] focus:outline-none transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-neutral-900 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#F4C752] focus:outline-none transition-colors"
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-neutral-900 mb-2">
                                Event Date
                            </label>
                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#F4C752] focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-neutral-900 mb-2">
                                Expected Guest Count
                            </label>
                            <input
                                type="number"
                                name="guestCount"
                                value={formData.guestCount}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#F4C752] focus:outline-none transition-colors"
                                placeholder="50"
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-bold text-neutral-900 mb-2">
                            Tell us about your event
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-[#F4C752] focus:outline-none transition-colors resize-none"
                            placeholder="Share your vision, special requirements, or any questions..."
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-[#F4C752] text-neutral-900 font-black text-lg py-5 rounded-xl shadow-[0_8px_24px_rgba(244,199,82,0.4)] hover:shadow-[0_12px_32px_rgba(244,199,82,0.6)] transition-all duration-300"
                    >
                        {ctaText}
                    </motion.button>

                    <p className="text-center text-sm text-neutral-600 mt-6">
                        We'll get back to you within 24 hours! 🎉
                    </p>
                </motion.form>
            </div>
        </section>
    );
}
