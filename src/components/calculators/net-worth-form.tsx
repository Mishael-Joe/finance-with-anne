"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/calculator-utils";
import type { FinancialItem } from "@/types/calculator";

interface NetWorthFormProps {
  title: string;
  subtitle: string;
  items: FinancialItem[];
  onUpdateItem: (
    id: string,
    field: keyof FinancialItem,
    value: string | number
  ) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  currency: string;
  type: "assets" | "liabilities";
}

/**
 * Net Worth Form Component
 *
 * Renders a form section for either assets or liabilities with:
 * - List of financial items with name and value inputs
 * - Add/remove functionality for custom items
 * - Real-time total calculation
 * - Currency formatting
 * - Visual indicators for positive/negative values
 */
export function NetWorthForm({
  title,
  subtitle,
  items,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
  currency,
  type,
}: NetWorthFormProps) {
  const total = items.reduce((sum, item) => sum + (item.value || 0), 0);
  const isAssets = type === "assets";

  return (
    <Card
      className={`border-2 ${
        isAssets ? "border-success/30" : "border-orange-200"
      } hover:shadow-lg transition-shadow`}
    >
      <CardHeader
        className={`${
          isAssets ? "bg-success/10" : "bg-orange-50"
        } rounded-t-lg`}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isAssets ? (
              <TrendingUp className="h-6 w-6 text-primary" />
            ) : (
              <TrendingDown className="h-6 w-6 text-primary" />
            )}
            <div>
              <h3 className="text-xl font-bold text-primary">{title}</h3>
              <p className="text-sm text-muted-foreground font-normal">
                {subtitle}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total</div>
            <div
              className={`text-lg font-bold ${
                isAssets ? "text-success" : "text-orange-600"
              }`}
            >
              {formatCurrency(total, currency)}
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="group">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Item Name Input */}
              <div className="space-y-1">
                <Input
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) =>
                    onUpdateItem(item.id, "name", e.target.value)
                  }
                  className="border-muted-foreground/20 focus:border-primary"
                />
              </div>

              {/* Value Input with Remove Button */}
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item.value || ""}
                    onChange={(e) =>
                      onUpdateItem(
                        item.id,
                        "value",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                    className="border-muted-foreground/20 focus:border-primary"
                    min="0"
                    step="0.01"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity border-destructive/20 hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Show formatted value if entered */}
            {item.value > 0 && (
              <div className="text-sm text-muted-foreground mt-1 text-right">
                {formatCurrency(item.value, currency)}
              </div>
            )}
          </div>
        ))}

        {/* Add New Item Button */}
        <Button
          onClick={onAddItem}
          variant="outline"
          className={`w-full border-dashed ${
            isAssets
              ? "border-success hover:border-success/75 hover:bg-success/5"
              : "border-orange-300 hover:border-orange-400 hover:bg-orange-50"
          }`}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {isAssets ? "Asset" : "Liability"}
        </Button>
      </CardContent>
    </Card>
  );
}
