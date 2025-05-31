import type { CurrencyOption, CompoundingOption } from "@/types/calculator";

/**
 * Available currency options with their symbols
 */
export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
];

/**
 * Currency symbol mapping for quick lookup
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "Fr",
  CNY: "¥",
  INR: "₹",
  NGN: "₦",
};

/**
 * Compounding frequency options
 */
export const COMPOUNDING_OPTIONS: CompoundingOption[] = [
  {
    frequency: 12,
    label: "Monthly",
    description: "Interest compounds 12 times per year",
  },
  {
    frequency: 4,
    label: "Quarterly",
    description: "Interest compounds 4 times per year",
  },
  {
    frequency: 2,
    label: "Semi-Annual",
    description: "Interest compounds 2 times per year",
  },
  {
    frequency: 1,
    label: "Annual",
    description: "Interest compounds once per year",
  },
];
