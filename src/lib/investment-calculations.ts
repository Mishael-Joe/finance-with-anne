import type { InvestmentData, CalculationResults } from "@/types/calculator";

/**
 * DEVELOPER NOTE: Updated to handle string | number input types from form fields.
 *
 * This file has been modified to gracefully handle numeric input as either string or number,
 * accounting for real-world cases like user-entered commas, decimals, empty fields, etc.
 *
 * Key features:
 * - Added safeToNumber() to safely parse strings like "1,000.50" into numbers
 * - calculateInvestment() supports flexible inputs while preserving original math logic
 * - validateInvestmentData() checks for invalid formatting and enforces business rules
 * - All calculations and validation rules now safely guard against malformed or missing data
 */

/**
 * Safely converts a string or number value to a valid number for calculations.
 *
 * This utility handles:
 * - Empty values ("" / null / undefined)
 * - Formatted numbers (e.g., "1,000.50")
 * - Invalid strings that fail to parse (returns 0 instead of NaN)
 *
 * @param value - The input to convert
 * @returns Parsed number, or 0 for invalid inputs
 */
export function safeToNumber(
  value: string | number | null | undefined
): number {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  if (typeof value === "number") {
    return isNaN(value) ? 0 : value;
  }

  const cleanedValue = value.replace(/,/g, "").trim(); // Remove commas, trim whitespace
  const parsed = Number.parseFloat(cleanedValue);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Calculate investment growth over time using compound interest and recurring contributions.
 *
 * This function supports form inputs with mixed types (string | number) and performs
 * the full investment projection calculation:
 * - Compound interest on initial amount
 * - Future value of monthly contributions
 * - Total interest, contributions, and percentage growth
 *
 * @param data - Investment parameters from form
 * @returns Final results for use in UI/graphs
 */
export function calculateInvestment(data: InvestmentData): CalculationResults {
  // Convert form inputs safely for use in math
  const initialAmount = safeToNumber(data.initialAmount);
  const monthlyContribution = safeToNumber(data.monthlyContribution);
  const annualReturn = safeToNumber(data.annualReturn);
  const years = safeToNumber(data.years);
  const compoundingFrequency = data.compoundingFrequency;

  // Skip calculations for invalid scenarios
  if (years <= 0 || (initialAmount === 0 && monthlyContribution === 0)) {
    return {
      finalAmount: 0,
      totalContributions: initialAmount,
      interestEarned: 0,
      totalGrowthPercent: 0,
      monthlyContributionsTotal: 0,
    };
  }

  const annualReturnDecimal = annualReturn / 100;
  const monthlyRate = annualReturnDecimal / 12;
  const totalMonths = years * 12;

  // Compound interest on the initial investment
  const finalInitialAmount =
    initialAmount *
    Math.pow(
      1 + annualReturnDecimal / compoundingFrequency,
      compoundingFrequency * years
    );

  // Future value of monthly contributions
  let monthlyContributionsFV = 0;
  if (monthlyRate > 0) {
    monthlyContributionsFV =
      (monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      monthlyRate;
  } else {
    // If return rate is 0%, fallback to basic total
    monthlyContributionsFV = monthlyContribution * totalMonths;
  }

  // Totals
  const finalAmount = finalInitialAmount + monthlyContributionsFV;
  const monthlyContributionsTotal = monthlyContribution * totalMonths;
  const totalContributions = initialAmount + monthlyContributionsTotal;
  const interestEarned = finalAmount - totalContributions;

  // Percent growth relative to total contributions
  const totalGrowthPercent =
    totalContributions > 0 ? (interestEarned / totalContributions) * 100 : 0;

  return {
    finalAmount,
    totalContributions,
    interestEarned,
    totalGrowthPercent,
    monthlyContributionsTotal,
  };
}

/**
 * Validate user-entered investment data.
 *
 * This function performs both format-level and business-rule validation.
 * It supports mixed input types (string | number) and returns helpful error messages.
 *
 * Validation includes:
 * - Proper numeric formatting (only digits, commas, decimals)
 * - No negative values
 * - Return rate and investment years must fall within accepted ranges
 * - At least one contribution method must be non-zero
 *
 * @param data - Raw input from form
 * @returns Array of validation error strings
 */
export function validateInvestmentData(data: InvestmentData): string[] {
  const errors: string[] = [];

  // Disallow any non-numeric characters (except commas and dots)
  if (
    typeof data.initialAmount === "string" &&
    /[^0-9.,]/.test(data.initialAmount)
  ) {
    errors.push("Initial investment contains invalid characters");
  }

  if (
    typeof data.monthlyContribution === "string" &&
    /[^0-9.,]/.test(data.monthlyContribution)
  ) {
    errors.push("Monthly contribution contains invalid characters");
  }

  // Convert for numeric validation
  const initialAmount = safeToNumber(data.initialAmount);
  const monthlyContribution = safeToNumber(data.monthlyContribution);
  const annualReturn = safeToNumber(data.annualReturn);
  const years = safeToNumber(data.years);

  // Business rule enforcement
  if (initialAmount < 0) {
    errors.push("Initial amount cannot be negative");
  }

  if (monthlyContribution < 0) {
    errors.push("Monthly contribution cannot be negative");
  }

  if (annualReturn < 0 || annualReturn > 50) {
    errors.push("Annual return must be between 0% and 50%");
  }

  if (years < 1 || years > 50) {
    errors.push("Investment period must be between 1 and 50 years");
  }

  if (initialAmount === 0 && monthlyContribution === 0) {
    errors.push(
      "Either initial investment or monthly contribution must be greater than 0"
    );
  }

  return errors;
}
