import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Button component that can be rendered as a button element or a Link
 *
 * Features:
 * - Multiple variants (primary, secondary, outline, ghost)
 * - Multiple sizes (default, sm, lg)
 * - Can be rendered as a button or a link
 * - Supports all button attributes
 *
 * @param variant - The button style variant
 * @param size - The button size
 * @param href - Optional URL to render as a Link
 * @param className - Additional CSS classes
 * @param children - Button content
 * @param props - Any additional button attributes
 */
export function Button({
  variant = "default",
  size = "default",
  href,
  className,
  children,
  ...props
}: {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  // Define the base styles for the button
  const baseStyles = cn(
    "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
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

      // Size styles
      "h-10 py-2 px-4": size === "default",
      "h-9 px-3 text-sm": size === "sm",
      "h-11 px-8 text-base": size === "lg",
    },
    className
  );

  // If href is provided, render as a Link
  if (href) {
    return (
      <Link href={href} className={baseStyles} {...props}>
        {children}
      </Link>
    );
  }

  // Otherwise render as a button
  return (
    <button className={baseStyles} {...props}>
      {children}
    </button>
  );
}
