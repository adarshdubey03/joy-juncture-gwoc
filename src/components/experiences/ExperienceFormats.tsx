"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface ExperienceFormat {
    title: string;
    whatItIs: string;
    whenItWorks: string;
    whoItsFor: string;
    imagePath: string;
}

interface ExperienceFormatsProps {
    sectionTitle: string;
    formats: ExperienceFormat[];
}

export default function ExperienceFormats({
    sectionTitle,
    formats,
}: ExperienceFormatsProps) {
    return (
        <section className="py-20 px-6 bg-[#FFF4D6]">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-neutral-900 text-center mb-16"
                >
                    {sectionTitle}
                </motion.h2>

                <div className="space-y-12">
                    {formats.map((format, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } gap-8 items-center bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300`}
                        >
                            {/* Image */}
                            <div className="w-full md:w-2/5 h-80 relative overflow-hidden rounded-2xl">
                                <Image
                                    src={format.imagePath}
                                    alt={format.title}
                                    fill
                                    unoptimized
                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-3/5 p-10">
                                <h3 className="text-3xl font-black text-neutral-900 mb-6">
                                    {format.title}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#F4C752] flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-lg">✨</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-neutral-900 mb-1">What it is</h4>
                                            <p className="text-neutral-700">{format.whatItIs}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#F4C752] flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-lg">⏰</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-neutral-900 mb-1">When it works best</h4>
                                            <p className="text-neutral-700">{format.whenItWorks}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#F4C752] flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-lg">👥</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-neutral-900 mb-1">Who it's for</h4>
                                            <p className="text-neutral-700">{format.whoItsFor}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
