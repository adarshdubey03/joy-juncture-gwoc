"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase/client";

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema.extend({
    name: z.string().min(2, "Name is required"),
});

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: "login" | "register";
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
    const [activeTab, setActiveTab] = React.useState(defaultTab);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const {
        register: registerRegister,
        handleSubmit: handleSubmitRegister,
        formState: { errors: registerErrors },
    } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    });

    const onLogin = async (data: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        setError("");
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        setIsLoading(false);
        if (error) {
            setError(error.message);
        } else {
            onClose();
        }
    };

    const onRegister = async (data: z.infer<typeof registerSchema>) => {
        setIsLoading(true);
        setError("");
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    full_name: data.name,
                },
            },
        });
        setIsLoading(false);
        if (error) {
            setError(error.message);
        } else {
            onClose();
        }
    };

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
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="flex border-b border-gray-100">
                            <button
                                className={`flex-1 py-4 font-bold text-sm transition-colors ${activeTab === "login" ? "text-accent border-b-2 border-accent" : "text-gray-500 hover:text-gray-900"
                                    }`}
                                onClick={() => setActiveTab("login")}
                            >
                                Login
                            </button>
                            <button
                                className={`flex-1 py-4 font-bold text-sm transition-colors ${activeTab === "register" ? "text-accent border-b-2 border-accent" : "text-gray-500 hover:text-gray-900"
                                    }`}
                                onClick={() => setActiveTab("register")}
                            >
                                Register
                            </button>
                        </div>

                        <div className="p-6">
                            {error && (
                                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4">
                                    {error}
                                </div>
                            )}

                            {activeTab === "login" ? (
                                <form onSubmit={handleSubmitLogin(onLogin)} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input {...registerLogin("email")} className="pl-10" placeholder="your@email.com" />
                                        </div>
                                        {loginErrors.email && <p className="text-xs text-red-500">{loginErrors.email.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input {...registerLogin("password")} type="password" className="pl-10" placeholder="••••••••" />
                                        </div>
                                        {loginErrors.password && <p className="text-xs text-red-500">{loginErrors.password.message}</p>}
                                    </div>

                                    <Button type="submit" className="w-full" isLoading={isLoading}>
                                        Login
                                    </Button>
                                </form>
                            ) : (
                                <form onSubmit={handleSubmitRegister(onRegister)} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input {...registerRegister("name")} className="pl-10" placeholder="John Doe" />
                                        </div>
                                        {registerErrors.name && <p className="text-xs text-red-500">{registerErrors.name.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input {...registerRegister("email")} className="pl-10" placeholder="your@email.com" />
                                        </div>
                                        {registerErrors.email && <p className="text-xs text-red-500">{registerErrors.email.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input {...registerRegister("password")} type="password" className="pl-10" placeholder="••••••••" />
                                        </div>
                                        {registerErrors.password && <p className="text-xs text-red-500">{registerErrors.password.message}</p>}
                                    </div>

                                    <Button type="submit" className="w-full" isLoading={isLoading}>
                                        Create Account
                                    </Button>
                                </form>
                            )}

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-gray-100" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="w-full">
                                        <Github className="w-4 h-4 mr-2" />
                                        GitHub
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Google
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
