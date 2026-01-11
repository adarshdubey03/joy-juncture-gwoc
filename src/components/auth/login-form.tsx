"use client";

import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) setError(data.error);
        if (data?.success) setSuccess(data.success);
      });
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Visual */}
      <div className="hidden md:block md:w-1/2 flex-none relative">
        <Image
          src="/joy-juncture-team.jpg"
          alt="Joy Juncture Team"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT — Login Form */}
      <div
        className="w-full md:w-1/2 flex-none flex items-center justify-center px-6"
        style={{ backgroundColor: "#F4C752" }}
      >
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-fredoka text-3xl text-black">
              Belong to the joy.
            </h1>
            <p className="mt-2 text-sm text-black/70 font-geist">
              Sign in to keep your moments, points, and play history together.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div>
                <input
                  type="text"
                  placeholder="Email or phone number"
                  disabled={isPending}
                  {...register("email")}
                  className="
                    w-full rounded-lg px-4 py-3 text-sm
                    bg-white border border-black/20
                    outline-none focus:border-black text-black
                    
                  "
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  disabled={isPending}
                  {...register("password")}
                  className="
                    w-full rounded-lg px-4 py-3 text-sm
                    bg-white border border-black/20
                    outline-none focus:border-black text-black
                  "
                />
                <div className="mt-1 text-right">
                  <Link
                    href="/reset"
                    className="text-xs text-black/70 hover:text-black underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
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
              {isPending ? "Signing in..." : "Continue"}
            </button>
          </form>

          {/* Register Prompt */}
          <p className="mt-6 text-center text-sm text-black/70 font-geist">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-black hover:underline underline-offset-4"
            >
              Create one
            </Link>
          </p>

          {/* OR Separator */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-black/20" />
            <span className="px-3 text-xs text-black/60 font-geist">
              OR
            </span>
            <div className="flex-1 h-px bg-black/20" />
          </div>

          {/* Google (visual only) */}
          <button
            type="button"
            className="
              w-full flex items-center justify-center gap-3
              bg-white text-black
              rounded-lg py-3
              font-medium
              transition hover:bg-white/90
              cursor-pointer
            "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.01 6.22C12.43 13.4 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.63-.15-3.2-.43-4.72H24v9.02h12.4c-.53 2.9-2.18 5.36-4.62 7.04l7.05 5.48C42.96 37.36 46.1 31.4 46.1 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.57 28.44c-.48-1.45-.76-2.99-.76-4.44s.27-2.99.76-4.44l-8.01-6.22C.92 16.06 0 19.95 0 24c0 4.05.92 7.94 2.56 11.22l8.01-6.78z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.05-5.48c-1.96 1.32-4.48 2.1-8.85 2.1-6.26 0-11.57-3.9-13.43-9.44l-8.01 6.78C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Trust line */}
          <p className="mt-8 text-xs text-black/60 font-geist text-center">
            We don’t spam. We don’t rush. You’re in control.
          </p>
        </div>
      </div>
    </div>
  );
};
