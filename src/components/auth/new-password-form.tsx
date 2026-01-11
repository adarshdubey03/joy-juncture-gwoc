"use client";

import * as z from "zod";
import Link from "next/link";
import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { NewPasswordSchema } from "@/schemas";
import { newPassword } from "@/actions/new-password";

const NewPasswordFormContent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [password, setPassword] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const validation = NewPasswordSchema.safeParse({ password });
        if (!validation.success) {
            setError(validation.error.issues[0].message);
            return;
        }

        startTransition(() => {
            newPassword(validation.data, token)
                .then((data) => {
                    if (data?.error) setError(data.error);
                    if (data?.success) setSuccess(data.success);
                });
        });
    };

    return (
        <>
            {/* Heading */}
            <div className="mb-10">
                <h1 className="font-fredoka text-3xl text-black">
                    Enter a new password
                </h1>
                <p className="mt-2 text-sm text-black/70 font-geist">
                    Choose a strong password to secure your account.
                </p>
            </div>

            {/* FORM */}
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <input
                        type="password"
                        placeholder="New password"
                        disabled={isPending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                            w-full rounded-lg px-4 py-3 text-sm
                            bg-white border border-black/20
                            outline-none focus:border-black text-black
                        "
                    />
                </div>

                {/* Server feedback */}
                {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                )}
                {success && (
                    <p className="text-sm text-green-700 text-center">{success}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="
                        w-full rounded-lg py-3
                        text-sm font-medium
                        bg-black text-white
                        transition hover:bg-black/90
                        disabled:opacity-60
                        cursor-pointer
                    "
                >
                    {isPending ? "Resetting..." : "Reset password"}
                </button>
            </form>

            {/* Back to login */}
            <p className="mt-6 text-center text-sm text-black/70 font-geist">
                <Link
                    href="/login"
                    className="font-medium text-black hover:underline underline-offset-4"
                >
                    Back to login
                </Link>
            </p>

            {/* Trust line */}
            <p className="mt-8 text-xs text-black/60 font-geist text-center">
                We don't spam. We don't rush. You're in control.
            </p>
        </>
    );
};

export const NewPasswordForm = () => {
    return (
        <Suspense fallback={
            <div className="text-center">
                <p className="text-sm text-black/70">Loading...</p>
            </div>
        }>
            <NewPasswordFormContent />
        </Suspense>
    );
};
