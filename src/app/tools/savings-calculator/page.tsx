import type { Metadata } from "next";
import SavingsCalculator from "@/components/calculators/savings-calculator";

export const metadata: Metadata = {
  title: "Savings Goal Calculator | Finance with Anne",
  description:
    "Calculate how much you need to save monthly to reach your financial goals with our interactive savings calculator.",
  openGraph: {
    title: "Savings Goal Calculator | Finance with Anne",
    description:
      "Plan your savings journey with our interactive calculator that helps you determine exactly how much to save each month.",
    images: [{ url: "/images/og-savings-calculator.jpg" }],
  },
};

export default function SavingsCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Savings Goal Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Turn your dreams into achievable monthly savings targets
          </p>
        </div>

        {/* Main calculator component */}
        <SavingsCalculator />

        {/* Description section */}
        <div className="mt-12 bg-white p-6 rounded-lg border border-border">
          <div className="prose prose-slate max-w-none text-muted-foreground">
            <h2 className="text-2xl font-bold mb-4">Savings Goal Calculator</h2>

            <p>
              Transform your financial dreams into actionable monthly targets
              with our intelligent Savings Goal Calculator. Whether you are
              saving for a dream vacation, emergency fund, new car or real
              estate investment, this powerful tool shows you exactly how much
              to save each month to reach your goal by your target date. With
              support for 12 global currencies and real-time calculations,
              you&apos;ll instantly see your personalized savings roadmap as you
              adjust your inputs.
            </p>

            <p>
              The calculator goes beyond basic math by factoring in compound
              interest on your existing savings and future contributions, giving
              you the most accurate projections possible. Watch your progress
              unfold with milestone tracking that shows when you&apos;ll reach
              25%, 50%, 75%, and 100% of your goal. Stop wondering &quot;how
              much do I need to save?&quot; and start taking action with a
              clear, achievable plan that turns your biggest financial goals
              into manageable monthly habits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
