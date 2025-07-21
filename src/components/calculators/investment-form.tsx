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
import { validateInvestmentData } from "@/lib/investment-calculations";

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
  // Get validation errors for display
  const validationErrors = validateInvestmentData(data);

  /**
   * Handle numeric input changes - now preserves empty strings
   */
  const handleNumericChange = (field: keyof InvestmentData, value: string) => {
    // Allow empty strings and preserve them in state
    if (value === "") {
      onChange({ [field]: "" });
      return;
    }

    // For non-empty values, store as string to preserve user input
    // The calculation function will safely convert to numbers
    onChange({ [field]: value });
  };

  /**
   * Handle compounding frequency selection
   */
  const handleCompoundingChange = (frequency: number) => {
    onChange({ compoundingFrequency: frequency });
  };

  /**
   * Get display value for input - handles both string and number types
   */
  const getInputValue = (value: string | number): string => {
    if (value === "" || value === null || value === undefined) {
      return "";
    }
    return value.toString();
  };

  return (
    <div className="space-y-6">
      {/* Validation Errors Display */}
      {validationErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-red-800 mb-2">
            Please fix the following issues:
          </h4>
          <ul className="text-sm text-red-700 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

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
            value={getInputValue(data.initialAmount)}
            onChange={(e) =>
              handleNumericChange("initialAmount", e.target.value)
            }
            min="0"
            step="100"
            className="border-border focus:border-primary"
            placeholder="Enter initial amount"
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
          value={getInputValue(data.monthlyContribution)}
          onChange={(e) =>
            handleNumericChange("monthlyContribution", e.target.value)
          }
          min="0"
          step="50"
          className="border-border focus:border-primary"
          placeholder="Enter monthly contribution"
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
          value={getInputValue(data.annualReturn)}
          onChange={(e) => handleNumericChange("annualReturn", e.target.value)}
          min="0"
          max="50"
          step="0.1"
          className="border-border focus:border-primary"
          placeholder="Enter expected annual return"
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
          value={getInputValue(data.years)}
          onChange={(e) => handleNumericChange("years", e.target.value)}
          min="1"
          max="50"
          step="1"
          className="border-border focus:border-primary"
          placeholder="Enter investment period"
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
