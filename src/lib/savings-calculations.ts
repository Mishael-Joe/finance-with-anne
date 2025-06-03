import type { Milestone } from "@/types/calculator";

/**
 * Calculate monthly savings needed with compound interest
 *
 * @param goalAmount - Target savings amount
 * @param currentSavings - Current savings amount
 * @param totalMonths - Total months until target date
 * @param monthlyRate - Monthly interest rate (decimal)
 * @returns Object containing monthly savings amount and total interest earned
 */
export function calculateMonthlySavings(
  goalAmount: number,
  currentSavings: number,
  totalMonths: number,
  monthlyRate: number
): { monthlySavings: number; totalInterest: number } {
  // If no interest, simple calculation
  if (monthlyRate <= 0) {
    const monthlySavings = (goalAmount - currentSavings) / totalMonths;
    return { monthlySavings, totalInterest: 0 };
  }

  // Calculate future value of current savings with compound interest
  const futureValueCurrent =
    currentSavings * Math.pow(1 + monthlyRate, totalMonths);
  const adjustedGoal = goalAmount - futureValueCurrent;

  // If current savings will grow to exceed goal
  if (adjustedGoal <= 0) {
    return {
      monthlySavings: 0,
      totalInterest: futureValueCurrent - currentSavings,
    };
  }

  // PMT formula for regular savings with compound interest
  const monthlySavings =
    (adjustedGoal * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

  // Calculate total contributions and interest
  const totalContributions = monthlySavings * totalMonths + currentSavings;
  const totalInterest = goalAmount - totalContributions;

  return { monthlySavings, totalInterest };
}

/**
 * Calculate savings milestones (25%, 50%, 75%, 100%)
 *
 * @param monthlySavings - Monthly savings amount
 * @param currentSavings - Current savings amount
 * @param totalMonths - Total months until target date
 * @param monthlyRate - Monthly interest rate (decimal)
 * @param goalAmount - Target savings amount
 * @returns Array of milestone objects with percentage and months needed
 */
export function calculateMilestones(
  monthlySavings: number,
  currentSavings: number,
  totalMonths: number,
  monthlyRate: number,
  goalAmount: number
): Milestone[] {
  const milestones: Milestone[] = [];
  const percentages = [25, 50, 75, 100];

  percentages.forEach((percentage) => {
    const targetAmount = (goalAmount * percentage) / 100;
    let monthsNeeded = 0;
    let runningTotal = currentSavings;

    // If already reached this milestone
    if (runningTotal >= targetAmount) {
      milestones.push({ percentage, months: 0 });
      return;
    }

    // Calculate months needed to reach this milestone
    for (let month = 1; month <= totalMonths; month++) {
      if (monthlyRate > 0) {
        runningTotal = (runningTotal + monthlySavings) * (1 + monthlyRate);
      } else {
        runningTotal += monthlySavings;
      }

      if (runningTotal >= targetAmount) {
        monthsNeeded = month;
        break;
      }
    }

    milestones.push({ percentage, months: monthsNeeded });
  });

  return milestones;
}
