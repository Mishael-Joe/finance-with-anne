import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Input component for text input fields
 *
 * Features:
 * - Consistent styling with the design system
 * - Supports all input attributes
 * - Forwards ref to the input element
 *
 * @param className - Additional CSS classes
 * @param props - Any input attributes
 */
const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"

export default Input
