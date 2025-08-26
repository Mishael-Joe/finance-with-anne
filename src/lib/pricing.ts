/**
 * Defines the pricing structure for different countries.
 * Each country code maps to an object containing the amount, currency code, and symbol.
 * A 'default' entry is provided for countries not explicitly listed.
 */
export const pricing = {
  // NG: { amount: 11999, currency: "NGN", symbol: "₦" },
  NG: { amount: 500, currency: "NGN", symbol: "₦" },
  US: { amount: 12.99, currency: "USD", symbol: "$" },
  GB: { amount: 12.99, currency: "GBP", symbol: "£" },
  // default: { amount: 12.99, currency: "USD", symbol: "$" },
  default: { amount: 1000, currency: "NGN", symbol: "₦" },
};

/**
 * Retrieves the price details for a given country code.
 * If the country code is not found in the pricing list, the default price is returned.
 *
 * @param countryCode - The two-letter ISO country code (e.g., "US", "NG").
 * @returns An object containing the amount, currency code, and symbol for the detected country, or the default.
 */
export function getPriceByCountry(countryCode: string) {
  const priceEntry = pricing[countryCode as keyof typeof pricing];
  return priceEntry || pricing.default;
}
