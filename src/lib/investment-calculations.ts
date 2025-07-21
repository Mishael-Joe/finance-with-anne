import type { InvestmentData, CalculationResults } from "@/types/calculator";

/**
 * DEVELOPER NOTE: Updated to handle string | number input types
 *
 * This file has been modified to support form inputs that can be either strings or numbers,
 * allowing for truly empty input fields without forcing them back to 0. The calculation
 * logic remains identical, but all numeric inputs are now safely converted using the
 * safeToNumber() helper function.
 *
 * Key changes:
 * - Added safeToNumber() utility for safe string-to-number conversion
 * - Updated calculateInvestment() to handle string | number inputs
 * - Updated validateInvestmentData() to work with mixed input types
 * - Preserved all original calculation formulas and business logic
 */

/**
 * Safely converts a string or number value to a number for calculations
 *
 * This utility handles the common form input scenario where fields can be
 * empty strings, null, undefined, or contain invalid numeric data.
 *
 * @param value - The input value to convert (string, number, null, or undefined)
 * @returns A valid number (0 for empty/invalid inputs)
 */
function safeToNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  if (typeof value === "number") {
    return isNaN(value) ? 0 : value;
  }

  const parsed = Number.parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Calculate investment growth with compound interest and regular contributions
 *
 * This function implements the compound interest formula along with
 * future value calculations for regular monthly contributions.
 *
 * UPDATED: Now safely handles string | number inputs from form fields
 * while preserving all original calculation logic and formulas.
 *
 * @param data - Investment parameters (supports string | number for numeric fields)
 * @returns Calculated investment results
 */
export function calculateInvestment(data: InvestmentData): CalculationResults {
  // UPDATED: Safe conversion of potentially string inputs to numbers
  // This allows form fields to be empty without breaking calculations
  const initialAmount = safeToNumber(data.initialAmount);
  const monthlyContribution = safeToNumber(data.monthlyContribution);
  const annualReturn = safeToNumber(data.annualReturn);
  const years = safeToNumber(data.years);
  const compoundingFrequency = data.compoundingFrequency; // Always number

  // Early return for invalid scenarios (preserves original business logic)
  if (years <= 0 || (initialAmount === 0 && monthlyContribution === 0)) {
    return {
      finalAmount: 0,
      totalContributions: initialAmount,
      interestEarned: 0,
      totalGrowthPercent: 0,
      monthlyContributionsTotal: 0,
    };
  }

  // Convert annual return to decimal (unchanged calculation logic)
  const annualReturnDecimal = annualReturn / 100;

  // Calculate monthly interest rate (unchanged calculation logic)
  const monthlyRate = annualReturnDecimal / 12;

  // Total number of months (unchanged calculation logic)
  const totalMonths = years * 12;

  // Calculate compound interest for initial amount (unchanged formula)
  // Formula: A = P(1 + r/n)^(nt)
  const finalInitialAmount =
    initialAmount *
    Math.pow(
      1 + annualReturnDecimal / compoundingFrequency,
      compoundingFrequency * years
    );

  // Calculate future value of monthly contributions (unchanged formula)
  // Formula: FV = PMT × [((1 + r)^n - 1) / r] (ordinary annuity)
  let monthlyContributionsFV = 0;
  if (monthlyRate > 0) {
    monthlyContributionsFV =
      (monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      monthlyRate;
  } else {
    // If no interest, just sum the contributions (unchanged logic)
    monthlyContributionsFV = monthlyContribution * totalMonths;
  }

  // Calculate totals (unchanged calculation logic)
  const finalAmount = finalInitialAmount + monthlyContributionsFV;
  const monthlyContributionsTotal = monthlyContribution * totalMonths;
  const totalContributions = initialAmount + monthlyContributionsTotal;
  const interestEarned = finalAmount - totalContributions;

  // Calculate growth percentage (unchanged calculation logic)
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
 * Validate investment input data
 *
 * UPDATED: Now handles string | number inputs from form fields
 * while maintaining the same validation rules and error messages.
 *
 * @param data - Investment data to validate (supports string | number inputs)
 * @returns Array of validation errors (empty if valid)
 */
export function validateInvestmentData(data: InvestmentData): string[] {
  const errors: string[] = [];

  // UPDATED: Safe conversion for validation (preserves original validation logic)
  const initialAmount = safeToNumber(data.initialAmount);
  const monthlyContribution = safeToNumber(data.monthlyContribution);
  const annualReturn = safeToNumber(data.annualReturn);
  const years = safeToNumber(data.years);

  // Original validation rules preserved
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

  // UPDATED: Additional validation for meaningful investment scenarios
  if (initialAmount === 0 && monthlyContribution === 0) {
    errors.push(
      "Either initial investment or monthly contribution must be greater than 0"
    );
  }

  return errors;
}
