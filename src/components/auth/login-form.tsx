"use client";

import * as z from "zod";
// ... imports
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { Social } from "@/components/auth/social";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { update } = useSession();

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
      login(values).then(async (data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
          await update();
          router.refresh();
          router.push(DEFAULT_LOGIN_REDIRECT);
        }
      });
    });
  };

  return (
    <>
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
        Don't have an account?{" "}
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


      <Social />

      {/* Trust line */}
      <p className="mt-8 text-xs text-black/60 font-geist text-center">
        We don't spam. We don't rush. You're in control.
      </p>
    </>
  );
};
