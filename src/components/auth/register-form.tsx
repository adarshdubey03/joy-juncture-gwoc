"use client";

import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { RegisterSchema } from "@/schemas";
import { register as registerAction } from "@/actions/register";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      registerAction(values).then((data) => {
        if (data?.error) setError(data.error);
        if (data?.success) {
          setSuccess(data.success);
          if (data.redirect) {
            window.location.href = "/verify";
          }
        }
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

      {/* RIGHT — Register Form */}
      <div
        className="w-full md:w-1/2 flex-none flex items-center justify-center px-6"
        style={{ backgroundColor: "#F4C752" }}
      >
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-fredoka text-3xl text-black">
              Join the joy.
            </h1>
            <p className="mt-2 text-sm text-black/70 font-geist">
              Create an account to save moments, earn points, and play together.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  disabled={isPending}
                  {...register("name")}
                  className="
                    w-full rounded-lg px-4 py-3 text-sm
                    bg-white border border-black/20
                    outline-none focus:border-black
                  "
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  disabled={isPending}
                  {...register("email")}
                  className="
                    w-full rounded-lg px-4 py-3 text-sm
                    bg-white border border-black/20
                    outline-none focus:border-black
                  "
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <PhoneInput
                  defaultCountry="IN"
                  placeholder="Phone number"
                  disabled={isPending}
                  onChange={(value) =>
                    setValue("phoneNumber", value ?? "")
                  }
                  className="
                    w-full rounded-lg px-4 py-3 text-sm
                    bg-white border border-black/20
                    focus-within:border-black
                  "
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phoneNumber.message}
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
                    outline-none focus:border-black
                  "
                />
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
              {isPending ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login Prompt */}
          <p className="mt-6 text-center text-sm text-black/70 font-geist">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>

          {/* Trust line */}
          <p className="mt-8 text-xs text-black/60 font-geist text-center">
            We respect your privacy. No noise, no pressure.
          </p>
        </div>
      </div>
    </div>
  );
};
