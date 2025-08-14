import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { webcrypto } from "crypto";

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

export function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    if (hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    }

    return ""; // fallback if not recognized
  } catch {
    return "";
  }
}

// Helper to extract thumbnail from YouTube URL
export const getYoutubeThumbnail = (url: string): string => {
  try {
    const parsedUrl = new URL(url);

    let videoId = "";

    if (parsedUrl.hostname === "youtu.be") {
      // Handle short URLs like https://youtu.be/VIDEO_ID
      videoId = parsedUrl.pathname.slice(1); // remove the leading "/"
    } else {
      // Handle long URLs like https://www.youtube.com/watch?v=VIDEO_ID
      videoId = parsedUrl.searchParams.get("v") || "";
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return "/placeholder.svg"; // fallback if URL parsing fails
  }
};

/**
 * Generates a unique alphanumeric ID of a specified length.
 * This function creates a UUID (Universally Unique Identifier), removes hyphens,
 * and returns the first `length` characters.
 *
 * @param {number} length - The desired length of the unique ID (must be ≤ 32, since UUIDs without hyphens are 32 chars long).
 * @returns {string} A truncated uppercase alphanumeric string from the UUID.
 *
 * @example
 * // Returns something like "3F7A9B2E" (first 8 chars of a UUID without hyphens)
 * const id = generateUniqueId(8);
 *
 * @example
 * // Can be used to generate request numbers like "WDR-3F7A9B2E"
 * const requestNumber = `WDR-${generateUniqueId(8).toUpperCase()}`;
 */
export function generateUniqueId(length: number) {
  // Generate a UUID and remove all hyphens
  const uuid = uuidv4().replace(/-/g, "");

  // Return the first 'length' characters
  return uuid.substring(0, length);
}

export async function encryptAES(
  data: string,
  token: string,
  nonce: string
): Promise<string> {
  if (nonce.length !== 12) {
    throw new Error("Nonce must be exactly 12 characters long");
  }

  const cryptoSubtle = globalThis.crypto?.subtle || webcrypto?.subtle;

  if (!cryptoSubtle) {
    throw new Error("Crypto API is not available in this environment.");
  }

  const decodedKeyBytes = Uint8Array.from(atob(token), (c) => c.charCodeAt(0));

  const key = await cryptoSubtle.importKey(
    "raw",
    decodedKeyBytes,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const iv = new TextEncoder().encode(nonce);

  const encryptedData = await cryptoSubtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    new TextEncoder().encode(data)
  );

  return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
}

/**
 * Encrypts the provided payload using Flutterwave's 3DES-ECB scheme.
 * NOTE: In production, this should live on the server.
 * @param {string} encryptionKey - Flutterwave encryption key (from env)
 * @param {unknown} payload - The request payload to encrypt
 * @returns {Promise<string>} base64 encoded encrypted payload
 */
export async function encrypt(
  encryptionKey: string,
  payload: any
): Promise<string> {
  const text = JSON.stringify(payload);

  // Dynamically import node-forge only when this function runs
  const forge = await import("node-forge");

  const cipher = forge.cipher.createCipher(
    "3DES-ECB",
    forge.util.createBuffer(encryptionKey)
  );
  cipher.start({ iv: "" });
  cipher.update(forge.util.createBuffer(text, "utf8")); // if it doesn't work, try "utf-8" as fallback cuz that is what flutterwave uses in their docs
  cipher.finish();
  const encrypted = cipher.output;

  return forge.util.encode64(encrypted.getBytes());
}
