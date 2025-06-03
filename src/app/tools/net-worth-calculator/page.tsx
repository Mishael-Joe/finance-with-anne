import type { Metadata } from "next";
import NetWorthCalculator from "@/components/calculators/net-worth-calculator";

export const metadata: Metadata = {
  title: "Net Worth Calculator | Finance with Anne",
  description:
    "Calculate your net worth by tracking assets and liabilities. Get a clear picture of your financial health with our comprehensive calculator tool.",
  keywords: [
    "net worth calculator",
    "financial health",
    "assets",
    "liabilities",
    "wealth tracking",
    "financial planning",
  ],
};

/**
 * Net Worth Calculator Page
 *
 * A comprehensive tool for calculating personal net worth by tracking
 * assets and liabilities. Helps users understand their financial position
 * and track progress over time.
 */
export default function NetWorthCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Net Worth Calculator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your financial health by calculating the difference between
            your assets and liabilities
          </p>
        </div>

        {/* Calculator Description */}
        <div className="p-6 md:p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              This Net Worth Calculator is a powerful and easy-to-use tool that
              helps you assess your current financial standing by calculating
              the difference between your total assets and liabilities. It comes
              preloaded with a comprehensive list of common asset and liability
              categories—including cash, investments, real estate, house rent
              and business debt—making it quick to get started. You can also add
              or remove custom fields, allowing full flexibility to reflect your
              unique financial situation.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              By using this calculator regularly, you gain valuable insight into
              your financial progress over time. It supports better budgeting,
              goal setting and informed decision-making, especially when
              planning for investments, reducing debt or preparing for major
              life events. It's an essential tool for anyone aiming to build
              long-term financial stability and achieve financial independence.
            </p>
          </div>
        </div>

        {/* Calculator Component */}
        <NetWorthCalculator />
      </div>
    </div>
  );
}
