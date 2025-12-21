"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    experienceTitle: string;
}

export function EnquiryModal({ isOpen, onClose, experienceTitle }: EnquiryModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-secondary">
                            <h3 className="font-bold text-xl">Book {experienceTitle}</h3>
                            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 text-center">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Feature Unavailable</h4>
                            <p className="text-gray-600">The enquiry form is currently under maintenance.</p>
                            {/* Placeholder for 404 code component request */}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
