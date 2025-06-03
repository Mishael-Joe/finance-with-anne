"use client";

import { useState, useEffect } from "react";
import SavingsForm from "./savings-form";
import SavingsResults from "./savings-results";
import {
  calculateMonthlySavings,
  calculateMilestones,
} from "@/lib/savings-calculations";
import type {
  SavingsData,
  SavingsResults as SavingsResultsType,
} from "@/types/calculator";

/**
 * Main Savings Calculator component
 * Manages state and calculations between the form and results components
 */
export default function SavingsCalculator() {
  // Initialize with default values
  const [savingsData, setSavingsData] = useState<SavingsData>({
    currency: "USD",
    goalAmount: 50000,
    currentSavings: 5000,
    targetDate: getDefaultTargetDate(),
    interestRate: 2,
    goalName: "Your Goal",
  });

  const [results, setResults] = useState<SavingsResultsType | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    type: "warning" | "success";
  } | null>(null);

  // Calculate results whenever inputs change
  useEffect(() => {
    calculateResults();
  }, [savingsData]);

  /**
   * Calculate savings results based on current inputs
   */
  function calculateResults() {
    const { goalAmount, currentSavings, targetDate, interestRate } =
      savingsData;

    // Validate inputs
    if (!targetDate || goalAmount <= 0) {
      setAlert({
        message: "Please enter a valid goal amount and target date.",
        type: "warning",
      });
      return;
    }

    // Calculate months between now and target date
    const currentDate = new Date();
    const targetDateObj = new Date(targetDate);
    const timeDiff = targetDateObj.getTime() - currentDate.getTime();
    const totalMonths = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30.44));

    if (totalMonths <= 0) {
      setAlert({
        message: "Target date must be in the future.",
        type: "warning",
      });
      return;
    }

    const remainingAmount = goalAmount - currentSavings;
    const progressPercent = (currentSavings / goalAmount) * 100;

    if (remainingAmount <= 0) {
      setAlert({
        message: "Congratulations! You've already reached your savings goal!",
        type: "success",
      });
      setResults({
        monthlySavings: 0,
        totalMonths,
        remainingAmount: 0,
        totalInterest: 0,
        progressPercent,
        milestones: [],
      });
      return;
    }

    // Calculate monthly savings with compound interest
    const monthlyRate = interestRate / 100 / 12;
    const { monthlySavings, totalInterest } = calculateMonthlySavings(
      goalAmount,
      currentSavings,
      totalMonths,
      monthlyRate
    );

    // Generate milestone timeline
    const milestones = calculateMilestones(
      monthlySavings,
      currentSavings,
      totalMonths,
      monthlyRate,
      goalAmount
    );

    // Update results
    setResults({
      monthlySavings,
      totalMonths,
      remainingAmount,
      totalInterest: Math.max(0, totalInterest),
      progressPercent,
      milestones,
    });

    // Clear any previous alerts
    setAlert(null);
  }

  /**
   * Handle form input changes
   */
  function handleInputChange(newData: Partial<SavingsData>) {
    setSavingsData((prev) => ({ ...prev, ...newData }));
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-border">
      <div className="bg-gradient-to-r from-primary to-primary-light text-white p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-accent">
            Savings Goal Calculator
          </h2>
          <p className="text-white/90">
            Turn your dreams into achievable monthly savings targets
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-float"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
        <SavingsForm data={savingsData} onInputChange={handleInputChange} />

        <SavingsResults
          results={results}
          currency={savingsData.currency}
          goalName={savingsData.goalName}
          alert={alert}
        />
      </div>
    </div>
  );
}

/**
 * Get default target date (2 years from now)
 */
function getDefaultTargetDate(): string {
  const today = new Date();
  const futureDate = new Date(
    today.getFullYear() + 2,
    today.getMonth(),
    today.getDate()
  );
  return futureDate.toISOString().split("T")[0];
}
