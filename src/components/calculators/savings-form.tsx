"use client";

import type React from "react";

import { useState } from "react";
import {
  Calendar,
  DollarSign,
  Percent,
  Target,
  Globe,
  Tag,
} from "lucide-react";
import Input from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCY_OPTIONS } from "@/lib/calculator-constants";
import type { SavingsData } from "@/types/calculator";

interface SavingsFormProps {
  data: SavingsData;
  onInputChange: (data: Partial<SavingsData>) => void;
}

/**
 * Form component for the savings calculator
 * Handles all user inputs with validation
 */
export default function SavingsForm({ data, onInputChange }: SavingsFormProps) {
  const [focused, setFocused] = useState<string | null>(null);

  /**
   * Handle number input changes with validation
   */
  function handleNumberChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SavingsData,
    min: number,
    max?: number
  ) {
    const value = Number.parseFloat(e.target.value);
    if (!isNaN(value)) {
      const clampedValue =
        max !== undefined
          ? Math.min(Math.max(value, min), max)
          : Math.max(value, min);

      onInputChange({ [field]: clampedValue });
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`transition-transform ${
            focused === "currency" ? "transform -translate-y-1" : ""
          }`}
        >
          <Label
            htmlFor="currency"
            className="flex items-center gap-2 mb-2 font-semibold text-sm uppercase"
          >
            <Globe className="h-4 w-4 text-primary" />
            Currency
          </Label>
          <Select
            value={data.currency}
            onValueChange={(value) => onInputChange({ currency: value })}
          >
            <SelectTrigger
              id="currency"
              className="w-full p-3 h-auto"
              onFocus={() => setFocused("currency")}
              onBlur={() => setFocused(null)}
            >
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {CURRENCY_OPTIONS.map((option) => (
                <SelectItem key={option.code} value={option.code}>
                  {option.symbol} - {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div
          className={`transition-transform ${
            focused === "goalAmount" ? "transform -translate-y-1" : ""
          }`}
        >
          <Label
            htmlFor="goalAmount"
            className="flex items-center gap-2 mb-2 font-semibold text-sm uppercase"
          >
            <Target className="h-4 w-4 text-primary" />
            Savings Goal
          </Label>
          <Input
            id="goalAmount"
            type="number"
            value={data.goalAmount}
            onChange={(e) => handleNumberChange(e, "goalAmount", 1)}
            className="p-3 h-auto"
            onFocus={() => setFocused("goalAmount")}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      <div
        className={`transition-transform ${
          focused === "currentSavings" ? "transform -translate-y-1" : ""
        }`}
      >
        <Label
          htmlFor="currentSavings"
          className="flex items-center gap-2 mb-2 font-semibold text-sm uppercase"
        >
          <DollarSign className="h-4 w-4 text-primary" />
          Current Savings
        </Label>
        <Input
          id="currentSavings"
          type="number"
          value={data.currentSavings}
          onChange={(e) => handleNumberChange(e, "currentSavings", 0)}
          className="p-3 h-auto"
          onFocus={() => setFocused("currentSavings")}
          onBlur={() => setFocused(null)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`transition-transform ${
            focused === "targetDate" ? "transform -translate-y-1" : ""
          }`}
        >
          <Label
            htmlFor="targetDate"
            className="flex items-center gap-2 mb-2 font-semibold text-sm uppercase"
          >
            <Calendar className="h-4 w-4 text-primary" />
            Target Date
          </Label>
          <Input
            id="targetDate"
            type="date"
            value={data.targetDate}
            onChange={(e) => onInputChange({ targetDate: e.target.value })}
            className="p-3 h-auto"
            onFocus={() => setFocused("targetDate")}
            onBlur={() => setFocused(null)}
          />
        </div>

        <div
          className={`transition-transform ${
            focused === "interestRate" ? "transform -translate-y-1" : ""
          }`}
        >
          <Label
            htmlFor="interestRate"
            className="flex items-center gap-2 mb-2 font-semibold text-sm uppercase"
          >
            <Percent className="h-4 w-4 text-primary" />
            Interest Rate (%)
          </Label>
          <Input
            id="interestRate"
            type="number"
            value={data.interestRate}
            onChange={(e) => handleNumberChange(e, "interestRate", 0, 20)}
            step="0.1"
            className="p-3 h-auto"
            onFocus={() => setFocused("interestRate")}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      <div
        className={`transition-transform ${
          focused === "goalName" ? "transform -translate-y-1" : ""
        }`}
      >
        <Label
          htmlFor="goalName"
          className="flex items-center gap-2 mb-2 font-semibold text-sm uppercase"
        >
          <Tag className="h-4 w-4 text-primary" />
          Goal Name (Optional)
        </Label>
        <Input
          id="goalName"
          type="text"
          value={data.goalName}
          onChange={(e) => onInputChange({ goalName: e.target.value })}
          placeholder="e.g., Dream Vacation, Emergency Fund, New Car"
          className="p-3 h-auto"
          onFocus={() => setFocused("goalName")}
          onBlur={() => setFocused(null)}
        />
      </div>
    </div>
  );
}
