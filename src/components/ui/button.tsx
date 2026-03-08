import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Button({
  variant = "default",
  size = "default",
  href,
  className,
  children,
  ...props
}: {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "premium";
  size?: "default" | "sm" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const isPremium = variant === "premium";

  const baseStyles = cn(
    "relative inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background overflow-hidden group",
    {
      // Variant styles
      "bg-primary text-white hover:bg-primary/90": variant === "primary",
      "bg-secondary text-white hover:bg-secondary/90 rounded":
        variant === "secondary",
      "bg-primary-light text-white hover:bg-primary-light/90":
        variant === "default",
      "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground":
        variant === "outline",
      "hover:bg-accent hover:text-accent-foreground text-foreground":
        variant === "ghost",

      // Premium base background (NO hover color here)
      "bg-primary text-white": isPremium,

      // Size styles
      "h-10 py-2 px-4": size === "default",
      "h-9 px-3 text-sm": size === "sm",
      "h-11 px-8 text-base": size === "lg",
    },
    className,
  );

  const content = isPremium ? (
    <>
      {/* Sliding dark overlay */}
      <span
        className="
          absolute inset-0
          bg-[#0A001C]
          translate-y-full
          transition-transform duration-500 ease-out
          group-hover:translate-y-0
          z-0
        "
      />

      {/* Text content */}
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[1px]">
        {children}
      </span>
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {content}
    </button>
  );
}
