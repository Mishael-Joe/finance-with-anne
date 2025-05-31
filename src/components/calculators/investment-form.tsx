"use client";

import { Label } from "@/components/ui/label";
import Input from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/ui/button";
import type { InvestmentData } from "@/types/calculator";
import {
  CURRENCY_OPTIONS,
  COMPOUNDING_OPTIONS,
} from "@/lib/calculator-constants";

interface InvestmentFormProps {
  data: InvestmentData;
  onChange: (data: Partial<InvestmentData>) => void;
}

/**
 * Investment Form Component
 *
 * Renders all input fields for the investment calculator,
 * including currency selection, amounts, rates, and compounding frequency.
 */
export default function InvestmentForm({
  data,
  onChange,
}: InvestmentFormProps) {
  /**
   * Handle numeric input changes with validation
   */
  const handleNumericChange = (field: keyof InvestmentData, value: string) => {
    const numericValue = Number.parseFloat(value) || 0;
    onChange({ [field]: numericValue });
  };

  /**
   * Handle compounding frequency selection
   */
  const handleCompoundingChange = (frequency: number) => {
    onChange({ compoundingFrequency: frequency });
  };

  return (
    <div className="space-y-6">
      {/* Currency and Initial Amount Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="currency"
            className="text-sm font-medium text-primary"
          >
            Currency
          </Label>
          <Select
            value={data.currency}
            onValueChange={(value) => onChange({ currency: value })}
          >
            <SelectTrigger className="border-border focus:border-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCY_OPTIONS.map((option) => (
                <SelectItem key={option.code} value={option.code}>
                  {option.code} ({option.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="initialAmount"
            className="text-sm font-medium text-primary"
          >
            Initial Investment
          </Label>
          <Input
            id="initialAmount"
            type="number"
            value={data.initialAmount}
            onChange={(e) =>
              handleNumericChange("initialAmount", e.target.value)
            }
            min="0"
            step="100"
            className="border-border focus:border-primary"
          />
        </div>
      </div>

      {/* Monthly Contribution */}
      <div className="space-y-2">
        <Label
          htmlFor="monthlyContribution"
          className="text-sm font-medium text-primary"
        >
          Monthly Contribution
        </Label>
        <Input
          id="monthlyContribution"
          type="number"
          value={data.monthlyContribution}
          onChange={(e) =>
            handleNumericChange("monthlyContribution", e.target.value)
          }
          min="0"
          step="50"
          className="border-border focus:border-primary"
        />
      </div>

      {/* Annual Return */}
      <div className="space-y-2">
        <Label
          htmlFor="annualReturn"
          className="text-sm font-medium text-primary"
        >
          Annual Return (%)
        </Label>
        <Input
          id="annualReturn"
          type="number"
          value={data.annualReturn}
          onChange={(e) => handleNumericChange("annualReturn", e.target.value)}
          min="0"
          max="50"
          step="0.1"
          className="border-border focus:border-primary"
        />
      </div>

      {/* Investment Period */}
      <div className="space-y-2">
        <Label htmlFor="years" className="text-sm font-medium text-primary">
          Investment Period (Years)
        </Label>
        <Input
          id="years"
          type="number"
          value={data.years}
          onChange={(e) => handleNumericChange("years", e.target.value)}
          min="1"
          max="50"
          step="1"
          className="border-border focus:border-primary"
        />
      </div>

      {/* Compounding Frequency */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-primary">
          Compounding Frequency
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {COMPOUNDING_OPTIONS.map((option) => (
            <Button
              key={option.frequency}
              variant={
                data.compoundingFrequency === option.frequency
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => handleCompoundingChange(option.frequency)}
              className={`transition-all duration-200 ${
                data.compoundingFrequency === option.frequency
                  ? "bg-primary hover:bg-primary-light text-white"
                  : "border-primary text-primary hover:bg-primary/10"
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
