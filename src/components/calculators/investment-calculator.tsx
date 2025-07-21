"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InvestmentForm from "./investment-form";
import InvestmentResults from "./investment-results";
import type { InvestmentData, CalculationResults } from "@/types/calculator";
import { calculateInvestment } from "@/lib/investment-calculations";

/**
 * Main Investment Calculator Component
 *
 * This component orchestrates the investment calculation functionality,
 * managing state between the form inputs and results display.
 */
export default function InvestmentCalculator() {
  // Investment input state - now allows string values for number inputs
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    currency: "USD",
    initialAmount: "10000",
    monthlyContribution: "500",
    annualReturn: "7",
    years: "10",
    compoundingFrequency: 2, // Semi-annual
  });

  // Calculation results state
  const [results, setResults] = useState<CalculationResults>({
    finalAmount: 0,
    totalContributions: 0,
    interestEarned: 0,
    totalGrowthPercent: 0,
    monthlyContributionsTotal: 0,
  });

  // Loading state for smooth transitions
  const [isCalculating, setIsCalculating] = useState(false);

  /**
   * Recalculate investment results whenever input data changes
   */
  useEffect(() => {
    const performCalculation = async () => {
      setIsCalculating(true);

      // Add slight delay for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const calculationResults = calculateInvestment(investmentData);
      setResults(calculationResults);
      setIsCalculating(false);
    };

    performCalculation();
  }, [investmentData]);

  /**
   * Handle form data updates
   */
  const handleDataChange = (newData: Partial<InvestmentData>) => {
    setInvestmentData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-white">
              Investment Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <InvestmentForm data={investmentData} onChange={handleDataChange} />
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-success to-success-light text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-white">
              Investment Projection
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <InvestmentResults
              data={investmentData}
              results={results}
              isCalculating={isCalculating}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
