"use client";

import { TrendingUp, PiggyBank, Target } from "lucide-react";
import type { InvestmentData, CalculationResults } from "@/types/calculator";
import { formatCurrency } from "@/lib/calculator-utils";
import { cn } from "@/lib/utils";
import { safeToNumber } from "@/lib/investment-calculations";

interface InvestmentResultsProps {
  data: InvestmentData;
  results: CalculationResults;
  isCalculating: boolean;
}

/**
 * Investment Results Component
 *
 * Displays the calculated investment results including final amount,
 * contributions, interest earned, and detailed breakdown.
 */
export default function InvestmentResults({
  data,
  results,
  isCalculating,
}: InvestmentResultsProps) {
  return (
    <div className="space-y-6">
      {/* Main Results Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Final Amount - Featured Result */}
        <div
          className={cn(
            "bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 transition-all duration-300",
            isCalculating && "animate-pulse"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                Final Amount
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary mb-1">
            {formatCurrency(results.finalAmount, data.currency)}
          </div>
          <div className="text-sm text-success font-medium">
            +{results.totalGrowthPercent.toFixed(1)}% total growth
          </div>
        </div>

        {/* Secondary Results */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <PiggyBank className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Total Contributions
              </span>
            </div>
            <div className="text-lg font-semibold text-primary">
              {formatCurrency(results.totalContributions, data.currency)}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-xs font-medium text-muted-foreground">
                Interest Earned
              </span>
            </div>
            <div className="text-lg font-semibold text-success">
              {formatCurrency(results.interestEarned, data.currency)}
            </div>
          </div>
        </div>
      </div>

      {/* Investment Breakdown */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          {/* <DollarSign className="h-5 w-5 mr-2" /> */}
          Investment Breakdown
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">
              Initial Investment:
            </span>
            <span className="font-medium text-primary">
              {formatCurrency(safeToNumber(data.initialAmount), data.currency)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">
              Monthly Contributions:
            </span>
            <span className="font-medium text-primary">
              {formatCurrency(results.monthlyContributionsTotal, data.currency)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted-foreground">
              Compound Interest:
            </span>
            <span className="font-medium text-success">
              {formatCurrency(results.interestEarned, data.currency)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 bg-primary/5 rounded-md px-3">
            <span className="font-semibold text-primary">Total Value:</span>
            <span className="font-bold text-lg text-primary">
              {formatCurrency(results.finalAmount, data.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="text-xs text-muted-foreground bg-muted/20 rounded-lg p-4">
        <p className="mb-2">
          <strong>Investment Summary:</strong> Over {data.years} years, your
          initial investment of{" "}
          {formatCurrency(Number(data.initialAmount), data.currency)} plus
          monthly contributions of{" "}
          {formatCurrency(Number(data.monthlyContribution), data.currency)} will
          grow to {formatCurrency(results.finalAmount, data.currency)} at{" "}
          {data.annualReturn}% annual return.
        </p>
        <p className="text-xs">
          * This calculator provides estimates based on the inputs provided.
          Actual investment returns may vary due to market conditions and other
          factors.
        </p>
      </div>
    </div>
  );
}
