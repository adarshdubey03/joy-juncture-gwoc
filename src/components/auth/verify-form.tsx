"use client";

import { useState, useTransition } from "react";
import { verify } from "@/actions/verify";
import Link from "next/link";

export const VerifyForm = () => {
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();

  const onVerifyEmail = () => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      verify(emailOtp, "email")
        .then((data) => {
          if (data?.error) setError(data.error);
          if (data?.success) {
            setSuccess(data.success);
            setEmailVerified(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const onVerifyPhone = () => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      verify(phoneOtp, "phone")
        .then((data) => {
          if (data?.error) setError(data.error);
          if (data?.success) {
            setSuccess(data.success);
            setPhoneVerified(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const isComplete = emailVerified && phoneVerified;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#F4C752" }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-fredoka text-2xl text-black">
            Verify your account
          </h1>
          <p className="mt-2 text-sm text-black/70">
            Enter the OTPs sent to your email and phone
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Verification */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-black">
              Email Verification
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                disabled={isPending || emailVerified}
                className="
                  flex-1 rounded-lg px-4 py-3 text-sm
                  border border-black/20
                  outline-none
                  focus:border-black
                  disabled:bg-black/5
                "
              />

              <button
                type="button"
                onClick={onVerifyEmail}
                disabled={isPending || emailVerified || !emailOtp}
                className={`
                  rounded-lg px-4 py-3 text-sm font-medium
                  transition
                  ${
                    emailVerified
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:bg-black/90"
                  }
                  disabled:opacity-60
                  cursor-pointer
                `}
              >
                {emailVerified ? "✓" : "Verify"}
              </button>
            </div>
          </div>

          {/* Phone Verification */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-black">
              Phone Verification
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Phone OTP"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                disabled={isPending || phoneVerified}
                className="
                  flex-1 rounded-lg px-4 py-3 text-sm
                  border border-black/20
                  outline-none
                  focus:border-black
                  disabled:bg-black/5
                "
              />

              <button
                type="button"
                onClick={onVerifyPhone}
                disabled={isPending || phoneVerified || !phoneOtp}
                className={`
                  rounded-lg px-4 py-3 text-sm font-medium
                  transition
                  ${
                    phoneVerified
                      ? "bg-green-600 text-white"
                      : "bg-black text-white hover:bg-black/90"
                  }
                  disabled:opacity-60
                  cursor-pointer
                `}
              >
                {phoneVerified ? "✓" : "Verify"}
              </button>
            </div>
          </div>

          {/* Feedback */}
          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-700 text-center">
              {success}
            </p>
          )}

          {/* Complete */}
          {isComplete && (
            <button
              type="button"
              onClick={() => (window.location.href = "/login")}
              className="
                w-full rounded-lg py-3
                text-sm font-medium
                bg-black text-white
                transition hover:bg-black/90
                cursor-pointer
              "
            >
              Go to Login
            </button>
          )}

          {/* Back */}
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-black/70 hover:text-black underline-offset-4 hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
