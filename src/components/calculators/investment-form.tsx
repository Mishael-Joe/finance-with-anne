"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { InvestmentData } from "@/types/calculator";
import {
  CURRENCY_OPTIONS,
  COMPOUNDING_OPTIONS,
} from "@/lib/calculator-constants";
import { validateInvestmentData } from "@/lib/investment-calculations";
import { formatNumberWithCommas } from "@/lib/utils";

interface InvestmentFormProps {
  data: InvestmentData;
  onChange: (data: Partial<InvestmentData>) => void;
}

/**
 * Investment Form Component
 *
 * Renders all input fields for the investment calculator,
 * including currency selection, amounts, rates, and compounding frequency.
 * Automatically formats inputs like amounts and enforces valid numeric input.
 */
export default function InvestmentForm({
  data,
  onChange,
}: InvestmentFormProps) {
  const initialAmountRef = useRef<HTMLInputElement>(null);
  const monthlyContributionRef = useRef<HTMLInputElement>(null);

  // Get validation errors for display
  const validationErrors = validateInvestmentData(data);

  /**
   * Handle numeric input with formatting (for amounts).
   * Preserves cursor position and stores raw unformatted value in state.
   */
  const handleFormattedNumericChange = (
    field: keyof InvestmentData,
    value: string,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    // Allow only numbers, commas, and a single decimal point
    const cleanedValue = value
      .replace(/[^\d.,]/g, "")
      .replace(/(\..*)\./g, "$1");

    // Format with commas
    const formattedValue = formatNumberWithCommas(cleanedValue);

    // Store raw value without commas
    const rawValue = formattedValue.replace(/,/g, "");
    onChange({ [field]: rawValue });

    // Preserve cursor position after formatting
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart;
      setTimeout(() => {
        if (cursorPosition !== null) {
          const commaDiff = formattedValue.length - value.length;
          const newPosition = Math.max(0, cursorPosition + commaDiff);
          inputRef.current?.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    }
  };

  /**
   * Handle basic numeric input (no formatting).
   * Used for fields like annual return (%) and investment period (years).
   */
  const handleNumberFieldChange = (
    field: keyof InvestmentData,
    value: string
  ) => {
    const numericValue = value.replace(/[^\d.]/g, "");
    onChange({ [field]: numericValue });
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
            inputMode="numeric"
            type="text"
            ref={initialAmountRef}
            value={formatNumberWithCommas(getInputValue(data.initialAmount))}
            onChange={(e) =>
              handleFormattedNumericChange(
                "initialAmount",
                e.target.value,
                initialAmountRef
              )
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
          type="text"
          inputMode="numeric"
          ref={monthlyContributionRef}
          value={formatNumberWithCommas(
            getInputValue(data.monthlyContribution)
          )}
          onChange={(e) =>
            handleFormattedNumericChange(
              "monthlyContribution",
              e.target.value,
              monthlyContributionRef
            )
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
          type="text"
          inputMode="decimal"
          value={getInputValue(data.annualReturn)}
          onChange={(e) =>
            handleNumberFieldChange("annualReturn", e.target.value)
          }
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
          type="text"
          inputMode="numeric"
          value={getInputValue(data.years)}
          onChange={(e) => handleNumberFieldChange("years", e.target.value)}
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
