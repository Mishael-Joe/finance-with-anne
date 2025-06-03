"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/calculator-utils";
import type { NetWorthData } from "@/types/calculator";

interface NetWorthSummaryProps {
  data: NetWorthData;
}

/**
 * Net Worth Summary Component
 *
 * Displays key financial metrics in an easy-to-read card format:
 * - Total assets
 * - Total liabilities
 * - Net worth (with color coding)
 * - Visual indicators for positive/negative values
 */
export function NetWorthSummary({ data }: NetWorthSummaryProps) {
  const { totalAssets, totalLiabilities, netWorth, currency } = data;

  const isPositiveNetWorth = netWorth >= 0;
  const netWorthColor = isPositiveNetWorth
    ? "text-success"
    : "text-destructive";
  const netWorthBg = isPositiveNetWorth ? "bg-success/5" : "bg-destructive/5";

  return (
    <div className="space-y-4">
      {/* Total Assets */}
      <Card className="border-success/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-success">
            <TrendingUp className="h-5 w-5" />
            Total Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            {formatCurrency(totalAssets, currency)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">What you own</p>
        </CardContent>
      </Card>

      {/* Total Liabilities */}
      <Card className="border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <TrendingDown className="h-5 w-5" />
            Total Liabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(totalLiabilities, currency)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">What you owe</p>
        </CardContent>
      </Card>

      {/* Net Worth */}
      <Card
        className={`border-2 ${
          isPositiveNetWorth ? "border-success" : "border-destructive"
        }`}
      >
        <CardHeader className={`${netWorthBg} rounded-t-lg pb-3`}>
          <CardTitle
            className={`flex items-center gap-2 ${
              isPositiveNetWorth ? "text-success" : "text-destructive"
            }`}
          >
            <Calculator className="h-5 w-5" />
            Your Net Worth
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className={`text-3xl font-bold ${netWorthColor}`}>
            {formatCurrency(netWorth, currency)}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {isPositiveNetWorth
              ? "Great! Your assets exceed your liabilities."
              : "Focus on reducing debt or increasing assets."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
