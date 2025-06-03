import type { CurrencyOption, CompoundingOption } from "@/types/calculator";

/**
 * Currency symbols for formatting
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
  ZAR: "R",
  KES: "KSh",
};

/**
 * Currency options for dropdown selection
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
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
];

/**
 * Compounding frequency options
 */
export const COMPOUNDING_OPTIONS: CompoundingOption[] = [
  {
    frequency: 12,
    label: "Monthly",
    description: "Interest compounded every month",
  },
  {
    frequency: 4,
    label: "Quarterly",
    description: "Interest compounded every 3 months",
  },
  {
    frequency: 2,
    label: "Semi-Annual",
    description: "Interest compounded twice a year",
  },
  {
    frequency: 1,
    label: "Annual",
    description: "Interest compounded once a year",
  },
];
