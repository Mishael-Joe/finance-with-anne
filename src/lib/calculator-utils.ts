import { CURRENCY_SYMBOLS } from "./calculator-constants";

/**
 * Format a number as currency with proper symbol and locale formatting
 *
 * @param amount - The amount to format
 * @param currency - The currency code (e.g., 'USD', 'EUR')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] || "$";

  // Handle very large numbers
  if (amount >= 1000000) {
    return `${symbol}${(amount / 1000000).toFixed(1)}M`;
  }

  if (amount >= 1000) {
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }

  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Format a percentage with proper decimal places
 *
 * @param percentage - The percentage to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercentage(percentage: number, decimals = 1): string {
  return `${percentage.toFixed(decimals)}%`;
}

/**
 * Parse a string input to a safe number
 *
 * @param value - String value to parse
 * @param defaultValue - Default value if parsing fails
 * @returns Parsed number or default value
 */
export function parseNumericInput(value: string, defaultValue = 0): number {
  const parsed = Number.parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Clamp a number between min and max values
 *
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
