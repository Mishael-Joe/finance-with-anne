import type { InvestmentData, CalculationResults } from "@/types/calculator";

/**
 * Calculate investment growth with compound interest and regular contributions
 *
 * This function implements the compound interest formula along with
 * future value calculations for regular monthly contributions.
 *
 * @param data - Investment parameters
 * @returns Calculated investment results
 */
export function calculateInvestment(data: InvestmentData): CalculationResults {
  const {
    initialAmount,
    monthlyContribution,
    annualReturn,
    years,
    compoundingFrequency,
  } = data;

  // Convert annual return to decimal
  const annualReturnDecimal = annualReturn / 100;

  // Calculate monthly interest rate
  const monthlyRate = annualReturnDecimal / 12;

  // Total number of months
  const totalMonths = years * 12;

  // Calculate compound interest for initial amount
  // Formula: A = P(1 + r/n)^(nt)
  const finalInitialAmount =
    initialAmount *
    Math.pow(
      1 + annualReturnDecimal / compoundingFrequency,
      compoundingFrequency * years
    );

  // Calculate future value of monthly contributions (ordinary annuity)
  // Formula: FV = PMT × [((1 + r)^n - 1) / r]
  let monthlyContributionsFV = 0;
  if (monthlyRate > 0) {
    monthlyContributionsFV =
      (monthlyContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      monthlyRate;
  } else {
    // If no interest, just sum the contributions
    monthlyContributionsFV = monthlyContribution * totalMonths;
  }

  // Calculate totals
  const finalAmount = finalInitialAmount + monthlyContributionsFV;
  const monthlyContributionsTotal = monthlyContribution * totalMonths;
  const totalContributions = initialAmount + monthlyContributionsTotal;
  const interestEarned = finalAmount - totalContributions;

  // Calculate growth percentage
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
 * @param data - Investment data to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validateInvestmentData(data: InvestmentData): string[] {
  const errors: string[] = [];

  if (data.initialAmount < 0) {
    errors.push("Initial amount cannot be negative");
  }

  if (data.monthlyContribution < 0) {
    errors.push("Monthly contribution cannot be negative");
  }

  if (data.annualReturn < 0 || data.annualReturn > 50) {
    errors.push("Annual return must be between 0% and 50%");
  }

  if (data.years < 1 || data.years > 50) {
    errors.push("Investment period must be between 1 and 50 years");
  }

  return errors;
}
