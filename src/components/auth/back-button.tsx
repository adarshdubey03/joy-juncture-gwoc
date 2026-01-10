"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className="
        block w-full text-center
        text-sm font-normal
        text-black/70
        hover:text-black
        transition-colors
        underline-offset-4
        hover:underline
      "
    >
      {label}
    </Link>
  );
};
