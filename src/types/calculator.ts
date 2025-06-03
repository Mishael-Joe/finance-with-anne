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

/**
 * Savings calculator input data
 */
export interface SavingsData {
  currency: string;
  goalAmount: number;
  currentSavings: number;
  targetDate: string;
  interestRate: number;
  goalName: string;
}

/**
 * Savings calculation results
 */
export interface SavingsResults {
  monthlySavings: number;
  totalMonths: number;
  remainingAmount: number;
  totalInterest: number;
  progressPercent: number;
  milestones: Milestone[];
}

/**
 * Savings milestone
 */
export interface Milestone {
  percentage: number;
  months: number;
}

/**
 * Financial item for net worth calculator
 */
export interface FinancialItem {
  id: string;
  name: string;
  value: number;
  category: string;
}

/**
 * Net worth calculation data
 */
export interface NetWorthData {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  currency: string;
  assetsBreakdown: FinancialItem[];
  liabilitiesBreakdown: FinancialItem[];
}
