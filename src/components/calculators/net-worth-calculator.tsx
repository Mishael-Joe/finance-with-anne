"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NetWorthForm } from "./net-worth-form";
import { NetWorthResults } from "./net-worth-results";
import { NetWorthSummary } from "./net-worth-summary";
import type { FinancialItem, NetWorthData } from "@/types/calculator";

/**
 * Default asset categories with common financial items
 */
const defaultAssets: FinancialItem[] = [
  { id: "1", name: "Cash", value: 0, category: "liquid" },
  { id: "2", name: "Savings Account", value: 0, category: "liquid" },
  { id: "3", name: "Other Accounts", value: 0, category: "liquid" },
  {
    id: "4",
    name: "Investments (Stocks/Bonds)",
    value: 0,
    category: "investment",
  },
  { id: "5", name: "Real Estate", value: 0, category: "property" },
  { id: "6", name: "Vehicles", value: 0, category: "property" },
  {
    id: "7",
    name: "Retirement Accounts (e.g., PFA, RSA)",
    value: 0,
    category: "retirement",
  },
  { id: "8", name: "Business Interests", value: 0, category: "business" },
  { id: "9", name: "Jewelry or Valuables", value: 0, category: "personal" },
];

/**
 * Default liability categories with common debt types
 */
const defaultLiabilities: FinancialItem[] = [
  { id: "1", name: "House Rent", value: 0, category: "housing" },
  { id: "2", name: "Office/Shop Rent", value: 0, category: "business" },
  { id: "3", name: "Mortgage", value: 0, category: "housing" },
  { id: "4", name: "Car Loan", value: 0, category: "vehicle" },
  { id: "5", name: "Personal Loan", value: 0, category: "personal" },
  { id: "6", name: "Outstanding Bills", value: 0, category: "bills" },
  { id: "7", name: "Business Debt", value: 0, category: "business" },
  { id: "8", name: "Family Loan", value: 0, category: "personal" },
];

/**
 * Net Worth Calculator Component
 *
 * A comprehensive calculator that helps users track their financial health
 * by calculating net worth (assets minus liabilities). Features include:
 * - Pre-loaded common asset and liability categories
 * - Ability to add/remove custom items
 * - Real-time calculations
 * - Visual breakdown of financial position
 * - Currency formatting and validation
 */
export default function NetWorthCalculator() {
  const [assets, setAssets] = useState<FinancialItem[]>(defaultAssets);
  const [liabilities, setLiabilities] =
    useState<FinancialItem[]>(defaultLiabilities);
  const [currency, setCurrency] = useState("NGN");

  /**
   * Calculate total value for a list of financial items
   */
  const calculateTotal = (items: FinancialItem[]): number => {
    return items.reduce((sum, item) => sum + (item.value || 0), 0);
  };

  /**
   * Calculate net worth data including totals and breakdown
   */
  const getNetWorthData = (): NetWorthData => {
    const totalAssets = calculateTotal(assets);
    const totalLiabilities = calculateTotal(liabilities);
    const netWorth = totalAssets - totalLiabilities;

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      currency,
      assetsBreakdown: assets.filter((item) => item.value > 0),
      liabilitiesBreakdown: liabilities.filter((item) => item.value > 0),
    };
  };

  /**
   * Update an item in the assets or liabilities list
   */
  const updateItem = (
    type: "assets" | "liabilities",
    id: string,
    field: keyof FinancialItem,
    value: string | number
  ) => {
    const updateList = type === "assets" ? assets : liabilities;
    const setList = type === "assets" ? setAssets : setLiabilities;

    const updatedList = updateList.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setList(updatedList);
  };

  /**
   * Add a new item to assets or liabilities
   */
  const addItem = (type: "assets" | "liabilities") => {
    const newItem: FinancialItem = {
      id: Date.now().toString(),
      name: "",
      value: 0,
      category: "other",
    };

    if (type === "assets") {
      setAssets([...assets, newItem]);
    } else {
      setLiabilities([...liabilities, newItem]);
    }
  };

  /**
   * Remove an item from assets or liabilities
   */
  const removeItem = (type: "assets" | "liabilities", id: string) => {
    if (type === "assets") {
      setAssets(assets.filter((item) => item.id !== id));
    } else {
      setLiabilities(liabilities.filter((item) => item.id !== id));
    }
  };

  const netWorthData = getNetWorthData();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Currency Selection */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <span>💰</span>
            Currency Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              Select Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="NGN">NGN (₦)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Main Calculator Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Assets Section */}
        <NetWorthForm
          title="Assets"
          subtitle="What you own"
          items={assets}
          onUpdateItem={(id, field, value) =>
            updateItem("assets", id, field, value)
          }
          onAddItem={() => addItem("assets")}
          onRemoveItem={(id) => removeItem("assets", id)}
          currency={currency}
          type="assets"
        />

        {/* Liabilities Section */}
        <NetWorthForm
          title="Liabilities"
          subtitle="What you owe"
          items={liabilities}
          onUpdateItem={(id, field, value) =>
            updateItem("liabilities", id, field, value)
          }
          onAddItem={() => addItem("liabilities")}
          onRemoveItem={(id) => removeItem("liabilities", id)}
          currency={currency}
          type="liabilities"
        />
      </div>

      {/* Results Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Summary Cards */}
        <NetWorthSummary data={netWorthData} />

        {/* Detailed Results */}
        <div className="lg:col-span-2">
          <NetWorthResults data={netWorthData} />
        </div>
      </div>
    </div>
  );
}
