"use client";

import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";

import { ResetSchema, NewPasswordSchema } from "@/schemas";
import { reset } from "@/actions/reset";
import { newPassword } from "@/actions/new-password";

export const ResetForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [resendCountdown, setResendCountdown] = useState(0);

  /* ---------------- Step 1: Request reset ---------------- */

  const requestForm = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onRequestSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      reset(values).then((data) => {
        if (data?.error) setError(data.error);
        if (data?.success) {
          setSuccess("Code sent! Please check your email/phone.");
          setResendCountdown(60);
          setTimeout(() => setStep(2), 800);
        }
      });
    });
  };

  /* ---------------- Step 2: New password ---------------- */

  const passwordForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "" },
  });

  const onResetSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    startTransition(() => {
      newPassword(values, otp).then((data) => {
        if (data?.error) setError(data.error);
        if (data?.success) setSuccess(data.success);
      });
    });
  };

  /* ---------------- Resend countdown ---------------- */

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(
      () => setResendCountdown((c) => c - 1),
      1000
    );
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const onResend = () => {
    const values = requestForm.getValues();
    startTransition(() => {
      reset(values).then(() => {
        setResendCountdown(60);
        setSuccess("Code sent again!");
      });
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Visual */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/joy-juncture-team.jpg"
          alt="Joy Juncture Team"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT — Form */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center px-6"
        style={{ backgroundColor: "#F4C752" }}
      >
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-fredoka text-3xl text-black">
              {step === 1 ? "Forgot your password?" : "Reset your password"}
            </h1>
            <p className="mt-2 text-sm text-black/70 font-geist">
              {step === 1
                ? "We’ll send you a verification code."
                : "Enter the code and choose a new password."}
            </p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form
              onSubmit={requestForm.handleSubmit(onRequestSubmit)}
              className="space-y-6"
            >
              <input
                type="text"
                placeholder="Email or phone number"
                {...requestForm.register("email")}
                disabled={isPending}
                className="w-full rounded-lg px-4 py-3 text-sm bg-white border border-black/20 outline-none focus:border-black"
              />
              {requestForm.formState.errors.email && (
                <p className="text-xs text-red-600">
                  {requestForm.formState.errors.email.message}
                </p>
              )}

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-700 text-center">{success}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg py-3 bg-black text-white hover:bg-black/90"
              >
                Send Code
              </button>

              <p className="text-xs text-center text-black/60">
                <Link href="/login" className="underline">
                  Back to login
                </Link>
              </p>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form
              onSubmit={passwordForm.handleSubmit(onResetSubmit)}
              className="space-y-6"
            >
              <input
                type="text"
                placeholder="6-digit verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                disabled={isPending}
                className="w-full rounded-lg px-4 py-3 text-sm bg-white border border-black/20 outline-none focus:border-black text-center tracking-widest"
              />

              <input
                type="password"
                placeholder="New password"
                {...passwordForm.register("password")}
                disabled={isPending}
                className="w-full rounded-lg px-4 py-3 text-sm bg-white border border-black/20 outline-none focus:border-black"
              />
              {passwordForm.formState.errors.password && (
                <p className="text-xs text-red-600">
                  {passwordForm.formState.errors.password.message}
                </p>
              )}

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-700 text-center">{success}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg py-3 bg-black text-white hover:bg-black/90"
              >
                Reset Password
              </button>

              <div className="text-center text-sm text-black/60">
                {resendCountdown > 0 ? (
                  <p>Resend code in {resendCountdown}s</p>
                ) : (
                  <button
                    type="button"
                    onClick={onResend}
                    className="underline"
                    disabled={isPending}
                  >
                    Resend code
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Trust line */}
          <p className="mt-8 text-xs text-black/60 font-geist text-center">
            We don’t spam. We don’t rush. You’re in control.
          </p>
        </div>
      </div>
    </div>
  );
};
