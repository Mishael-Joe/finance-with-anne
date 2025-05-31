/**
 * Type definitions for the Investment Calculator
 */

/**
 * Investment input data structure
 */
export interface InvestmentData {
  currency: string;
  initialAmount: number;
  monthlyContribution: number;
  annualReturn: number;
  years: number;
  compoundingFrequency: number;
}

/**
 * Calculation results structure
 */
export interface CalculationResults {
  finalAmount: number;
  totalContributions: number;
  interestEarned: number;
  totalGrowthPercent: number;
  monthlyContributionsTotal: number;
}

/**
 * Currency option for dropdown
 */
export interface CurrencyOption {
  code: string;
  symbol: string;
  name: string;
}

/**
 * Compounding frequency option
 */
export interface CompoundingOption {
  frequency: number;
  label: string;
  description: string;
}
