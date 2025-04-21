import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to conditionally join class names
 * Combines clsx and tailwind-merge for optimal class handling
 *
 * @param inputs - Class values to be conditionally joined
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string into a more readable format
 *
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "April 15, 2023")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Get initials from a name
 *
 * @param name - Full name
 * @returns Initials (e.g., "JD" for "John Doe")
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

/**
 * Truncate text to a specified length
 *
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

/**
 * Calculate reading time for an article
 *
 * @param content - Article content
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
