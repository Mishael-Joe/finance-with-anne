import type { Metadata } from "next";
import InvestmentCalculator from "@/components/calculators/investment-calculator";

export const metadata: Metadata = {
  title: "Investment Calculator | Finance with Anne",
  description:
    "Plan your financial future with precision using our comprehensive investment calculator. Calculate compound interest, monthly contributions, and investment growth.",
  keywords: [
    "investment calculator",
    "compound interest",
    "financial planning",
    "investment growth",
    "retirement planning",
  ],
};

/**
 * Investment Calculator Page
 *
 * This page provides users with a comprehensive tool to calculate
 * investment growth over time, including compound interest and
 * regular monthly contributions.
 */
export default function InvestmentCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Investment Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your financial future with precision. Calculate how your
            investments will grow over time with compound interest and regular
            contributions.
          </p>
        </div>

        {/* Calculator Component */}
        <InvestmentCalculator />

        {/* Detailed Description */}
        <div className="max-w-7xl mx-auto my-12">
          <div className="bg-white rounded-lg shadow-md p-8 border border-secondary/20">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                This Investment Calculator is a powerful, real-time tool that
                shows exactly how your money can grow over time through compound
                interest. Simply enter your starting amount, monthly
                contributions, expected return rate and timeline to instantly
                see your projected final balance.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                With support for 10 global currencies and flexible compounding
                options (monthly, quarterly, semi-annual or annual), it provides
                accurate projections that update as you type.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                Perfect for retirement planning, the calculator demonstrates why
                starting early is crucial - beginning investments at 25 versus
                35 can nearly double your retirement fund. Whether you're saving
                for retirement, building an emergency fund or planning for major
                purchases, this tool transforms abstract financial concepts into
                concrete, achievable goals.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Use it to experiment with different scenarios and discover how
                small, consistent contributions can create substantial wealth
                through the power of compound interest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
