"use client";

import { useEffect, useRef } from "react";
import { formatCurrency } from "@/lib/calculator-utils";
import type {
  SavingsResults as SavingsResultsType,
  Milestone,
} from "@/types/calculator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface SavingsResultsProps {
  results: SavingsResultsType | null;
  currency: string;
  goalName: string;
  alert: { message: string; type: "warning" | "success" } | null;
}

/**
 * Results component for the savings calculator
 * Displays calculation results and milestones
 */
export default function SavingsResults({
  results,
  currency,
  goalName,
  alert,
}: SavingsResultsProps) {
  const monthlyAmountRef = useRef<HTMLDivElement>(null);

  // Add pulse animation when results change
  useEffect(() => {
    if (monthlyAmountRef.current && results) {
      monthlyAmountRef.current.classList.add("animate-pulse");
      const timer = setTimeout(() => {
        monthlyAmountRef.current?.classList.remove("animate-pulse");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [results]);

  if (!results) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          Enter your savings details to see results
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl p-6 space-y-6">
      {/* Monthly amount highlight */}
      <div
        ref={monthlyAmountRef}
        className="bg-white rounded-xl p-6 text-center shadow-sm relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-secondary"></div>
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          {formatCurrency(results.monthlySavings, currency)}
        </div>
        <div className="text-sm uppercase tracking-wider text-muted-foreground mt-2">
          Monthly Savings Needed
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-2 gap-4">
        <ResultCard
          value={results.totalMonths.toString()}
          label="Months to Goal"
        />
        <ResultCard
          value={formatCurrency(results.remainingAmount, currency)}
          label="Amount Needed"
        />
        <ResultCard
          value={formatCurrency(results.totalInterest, currency)}
          label="Interest Earned"
        />
        <ResultCard
          value={`${results.progressPercent.toFixed(1)}%`}
          label="Current Progress"
        />
      </div>

      {/* Milestones section */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-center">
          {goalName} - Savings Milestones
        </h3>

        <div className="space-y-3">
          {results.milestones.map((milestone) => (
            <MilestoneItem key={milestone.percentage} milestone={milestone} />
          ))}
        </div>
      </div>

      {/* Alert messages */}
      {alert && (
        <Alert
          variant={alert.type === "warning" ? "destructive" : "default"}
          className={
            alert.type === "success" ? "border-green-500 bg-green-50" : ""
          }
        >
          {alert.type === "warning" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          )}
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

/**
 * Individual result card component
 */
function ResultCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center transition-transform hover:-translate-y-1">
      <div className="text-xl font-bold text-slate-800">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}

/**
 * Milestone item component
 */
function MilestoneItem({ milestone }: { milestone: Milestone }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
      <span className="font-medium text-slate-700">
        {milestone.percentage}% Complete
      </span>
      <span className="text-primary font-semibold">
        {milestone.months > 0
          ? `${milestone.months} months`
          : "Already reached"}
      </span>
    </div>
  );
}
