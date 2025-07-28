import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join class names
 * Combines clsx and tailwind-merge for optimal class handling
 *
 * @param inputs - Class values to be conditionally joined
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
    .toUpperCase();
}

/**
 * Truncate text to a specified length
 *
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Calculate reading time for an article
 *
 * @param content - Article content
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Formats a date string or Date object into a readable format
 * @param date - Date to format (string or Date object)
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  // Check if date is valid
  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generates a slug from a string
 * @param str - String to convert to slug
 * @returns Slug string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Formats a numeric string by inserting commas as thousand separators.
 *
 * This function also:
 * - Removes any non-numeric characters except the decimal point.
 * - Ensures only one decimal point is retained.
 * - Returns the formatted number as a string, preserving decimal values if present.
 *
 * @param value - A string representing a number (may include commas or symbols)
 * @returns A formatted string with commas for thousands (e.g., "1234567.89" → "1,234,567.89")
 */
export function formatNumberWithCommas(value: string): string {
  // Return early if input is an empty string
  if (value === "") return "";

  // Remove all characters except digits and the first decimal point
  const sanitizedValue = value.replace(/[^\d.]/g, "");

  // Split the sanitized string into integer and decimal parts
  const [integerPart, decimalPart] = sanitizedValue.split(".");

  // Add commas to the integer part (e.g., 1000000 -> 1,000,000)
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Reattach the decimal part if it exists
  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
}
