"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useTransition } from "react";
import { submitExperienceEnquiry } from "@/actions/enquiry-actions";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

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
        setStatus('idle');

        startTransition(async () => {
            const result = await submitExperienceEnquiry({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                type: experienceType,
                message: formData.message,
                guestCount: formData.guestCount,
                preferredDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
            });

            if (result.success) {
                setStatus('success');
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    eventDate: "",
                    guestCount: "",
                    message: "",
                });
            } else {
                setStatus('error');
                setErrorMessage(result.error || "Something went wrong. Please try again.");
            }
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[#FFF4D6] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4C752]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 font-fredoka">
                        {headline}
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                        {subtext}
                    </p>
                </motion.div>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-neutral-100 relative overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#F4C752]" />

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <CheckCircle2 size={40} strokeWidth={3} />
                                </div>
                                <h3 className="text-3xl font-bold text-neutral-900 mb-2 font-fredoka">Enquiry Received!</h3>
                                <p className="text-neutral-600 max-w-sm">
                                    We've got your details. Our team will get back to you within 24 hours to plan your perfect experience.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-neutral-900 font-bold underline hover:text-[#daa520] transition-colors"
                                >
                                    Send another enquiry
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Your Name <span className="text-[#F4C752]">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            disabled={isPending}
                                            className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#F4C752] focus:ring-4 focus:ring-[#F4C752]/10 outline-none transition-all duration-200 font-medium disabled:opacity-50"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Email Address <span className="text-[#F4C752]">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={isPending}
                                            className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#F4C752] focus:ring-4 focus:ring-[#F4C752]/10 outline-none transition-all duration-200 font-medium disabled:opacity-50"
                                            placeholder="john@company.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Phone Number <span className="text-[#F4C752]">*</span></label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            disabled={isPending}
                                            className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#F4C752] focus:ring-4 focus:ring-[#F4C752]/10 outline-none transition-all duration-200 font-medium disabled:opacity-50"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Event Date</label>
                                        <input
                                            type="date"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            onChange={handleChange}
                                            disabled={isPending}
                                            className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#F4C752] focus:ring-4 focus:ring-[#F4C752]/10 outline-none transition-all duration-200 font-medium disabled:opacity-50 text-neutral-600"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Approx. Guest Count</label>
                                        <input
                                            type="number"
                                            name="guestCount"
                                            value={formData.guestCount}
                                            onChange={handleChange}
                                            disabled={isPending}
                                            className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#F4C752] focus:ring-4 focus:ring-[#F4C752]/10 outline-none transition-all duration-200 font-medium disabled:opacity-50"
                                            placeholder="e.g. 50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Your Vision</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        disabled={isPending}
                                        className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#F4C752] focus:ring-4 focus:ring-[#F4C752]/10 outline-none transition-all duration-200 font-medium disabled:opacity-50 resize-none"
                                        placeholder="Tell us about your team, preferred outcomes, or special requests..."
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2">
                                        <AlertCircle size={18} />
                                        {errorMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-[#F4C752] text-neutral-900 font-bold text-lg py-5 rounded-2xl shadow-[0_8px_30px_rgba(244,199,82,0.4)] hover:shadow-[0_12px_40px_rgba(244,199,82,0.5)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Sending Request...
                                        </>
                                    ) : ctaText}
                                </button>

                                <p className="text-center text-xs text-neutral-400 font-medium uppercase tracking-widest mt-4">
                                    100% Spam Free • 24h Response Time
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
