"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface MomentsGalleryProps {
    sectionTitle: string;
    images: string[];
}

export default function MomentsGallery({
    sectionTitle,
    images,
}: MomentsGalleryProps) {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-[#FFE8B3] via-[#FFF4D6] to-white">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-neutral-900 text-center mb-4"
                >
                    {sectionTitle}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-neutral-600 text-lg mb-16"
                >
                    Real moments, real joy
                </motion.p>

                {/* Masonry-style grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${index % 7 === 0 || index % 7 === 3
                                ? "row-span-2 h-96"
                                : "h-48"
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`Moment ${index + 1}`}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
