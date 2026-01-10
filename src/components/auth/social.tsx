"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full">
      <button
        type="button"
        onClick={() => onClick("google")}
        className="
          flex w-full items-center justify-center gap-3
          rounded-lg border border-black/20
          bg-white py-3
          transition
          hover:bg-black/5
          active:scale-[0.98]
          cursor-pointer
        "
      >
        <FcGoogle className="h-5 w-5" />
        <span className="text-sm font-medium text-black">
          Continue with Google
        </span>
      </button>
    </div>
  );
};
