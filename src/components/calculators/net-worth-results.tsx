"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, Info } from "lucide-react";
import { formatCurrency } from "@/lib/calculator-utils";
import type { NetWorthData } from "@/types/calculator";

interface NetWorthResultsProps {
  data: NetWorthData;
}

/**
 * Net Worth Results Component
 *
 * Displays detailed breakdown and analysis of net worth calculation:
 * - Asset and liability breakdowns
 * - Financial health indicators
 * - Educational information and tips
 * - Progress tracking suggestions
 */
export function NetWorthResults({ data }: NetWorthResultsProps) {
  const {
    totalAssets,
    totalLiabilities,
    netWorth,
    currency,
    assetsBreakdown,
    liabilitiesBreakdown,
  } = data;

  const assetToLiabilityRatio =
    totalLiabilities > 0
      ? totalAssets / totalLiabilities
      : totalAssets > 0
      ? Number.POSITIVE_INFINITY
      : 0;
  const isHealthy = assetToLiabilityRatio >= 1.5;

  return (
    <div className="space-y-6">
      {/* Financial Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            Financial Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Asset-to-Liability Ratio
              </div>
              <div
                className={`text-lg font-bold ${
                  isHealthy ? "text-success" : "text-orange-600"
                }`}
              >
                {assetToLiabilityRatio === Number.POSITIVE_INFINITY
                  ? "∞"
                  : assetToLiabilityRatio.toFixed(2)}
                :1
              </div>
              <div className="text-xs text-muted-foreground">
                {isHealthy
                  ? "Healthy ratio (≥1.5:1)"
                  : "Consider improving (target ≥1.5:1)"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Net Worth Status
              </div>
              <div
                className={`text-lg font-bold ${
                  netWorth >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {netWorth >= 0 ? "Positive" : "Negative"}
              </div>
              <div className="text-xs text-muted-foreground">
                {netWorth >= 0
                  ? "Assets exceed liabilities"
                  : "Liabilities exceed assets"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Details */}
      {(assetsBreakdown.length > 0 || liabilitiesBreakdown.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <PieChart className="h-5 w-5" />
              Detailed Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Assets Breakdown */}
              {assetsBreakdown.length > 0 && (
                <div>
                  <h4 className="font-semibold text-success mb-3">
                    Top Assets
                  </h4>
                  <div className="space-y-2">
                    {assetsBreakdown
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)
                      .map((asset) => (
                        <div
                          key={asset.id}
                          className="flex justify-between items-center py-2 border-b border-muted"
                        >
                          <span className="text-sm text-muted-foreground">
                            {asset.name}
                          </span>
                          <span className="font-medium text-success">
                            {formatCurrency(asset.value, currency)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Liabilities Breakdown */}
              {liabilitiesBreakdown.length > 0 && (
                <div>
                  <h4 className="font-semibold text-orange-600 mb-3">
                    Top Liabilities
                  </h4>
                  <div className="space-y-2">
                    {liabilitiesBreakdown
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)
                      .map((liability) => (
                        <div
                          key={liability.id}
                          className="flex justify-between items-center py-2 border-b border-muted"
                        >
                          <span className="text-sm text-muted-foreground">
                            {liability.name}
                          </span>
                          <span className="font-medium text-orange-600">
                            {formatCurrency(liability.value, currency)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Information */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Info className="h-5 w-5" />
            Understanding Your Net Worth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-primary mb-2">
                What This Means
              </h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Net worth = Total assets - Total liabilities</li>
                <li>• Positive net worth indicates financial stability</li>
                <li>• Track changes over time to measure progress</li>
                <li>• Use this as a baseline for financial planning</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-primary mb-2">Next Steps</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Calculate your net worth monthly or quarterly</li>
                <li>• Focus on increasing assets and reducing debt</li>
                <li>• Consider speaking with a financial advisor</li>
                <li>• Set specific financial goals based on these numbers</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Disclaimer:</strong> This
              calculator provides estimates for educational purposes. For
              decisions involving significant financial amounts, consult with a
              certified financial advisor or professional.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
