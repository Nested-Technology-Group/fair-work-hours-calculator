import type { AwardDefinition, EmploymentType, TimePenalty, AppliedRate } from './types.js';

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

/**
 * Get the day-of-week multiplier for a given date.
 * @param date - Date object
 * @param award - Award definition
 * @param employmentType - Employment type
 * @param isPublicHoliday - Whether the date is a public holiday
 * @returns The applicable multiplier
 */
export function getDayMultiplier(
  date: Date,
  award: AwardDefinition,
  employmentType: EmploymentType,
  isPublicHoliday: boolean
): number {
  if (isPublicHoliday) {
    const ph = award.dayPenalties['publicHoliday'];
    return employmentType === 'casual' ? ph.casualMultiplier : ph.multiplier;
  }
  const dayName = DAY_NAMES[date.getDay()];
  const penalty = award.dayPenalties[dayName];
  return employmentType === 'casual' ? penalty.casualMultiplier : penalty.multiplier;
}

/**
 * Calculate time-of-day penalty loading for a shift segment.
 * Returns the highest applicable loading for each hour worked.
 * @param startHour - Fractional start hour (e.g., 18.5 = 6:30pm)
 * @param endHour - Fractional end hour
 * @param dayOfWeek - Day of week (0=Sunday, 6=Saturday)
 * @param timePenalties - Array of time penalty definitions
 * @returns Total additional loading amount per hour segments
 */
export function calculateTimePenalties(
  startHour: number,
  endHour: number,
  dayOfWeek: number,
  timePenalties: TimePenalty[]
): { totalLoadingHours: number; rates: AppliedRate[]; baseRate: number }[] {
  const rates: AppliedRate[] = [];

  for (const penalty of timePenalties) {
    if (penalty.applicableDays && !penalty.applicableDays.includes(dayOfWeek)) continue;

    const overlapStart = Math.max(startHour, penalty.startHour);
    const overlapEnd = Math.min(endHour, penalty.endHour);
    const overlapHours = Math.max(0, overlapEnd - overlapStart);

    if (overlapHours > 0) {
      rates.push({
        description: penalty.description,
        hours: overlapHours,
        multiplier: penalty.loading,
        amount: 0, // calculated later with base rate
      });
    }
  }

  return [{ totalLoadingHours: 0, rates, baseRate: 0 }];
}

/**
 * Get applicable time penalty rates for a shift.
 * @param startHour - Start time as fractional hours
 * @param endHour - End time as fractional hours
 * @param dayOfWeek - Day of week (0=Sunday)
 * @param timePenalties - Award time penalties
 * @param baseRate - Dollar base rate
 * @returns Array of applied penalty rates with calculated amounts
 */
export function getTimePenaltyRates(
  startHour: number,
  endHour: number,
  dayOfWeek: number,
  timePenalties: TimePenalty[],
  baseRate: number
): AppliedRate[] {
  const rates: AppliedRate[] = [];

  for (const penalty of timePenalties) {
    if (penalty.applicableDays && !penalty.applicableDays.includes(dayOfWeek)) continue;

    const overlapStart = Math.max(startHour, penalty.startHour);
    const overlapEnd = Math.min(endHour, penalty.endHour);
    const overlapHours = Math.max(0, overlapEnd - overlapStart);

    if (overlapHours > 0) {
      rates.push({
        description: penalty.description,
        hours: overlapHours,
        multiplier: penalty.loading,
        amount: round(overlapHours * baseRate * penalty.loading),
      });
    }
  }

  return rates;
}

/**
 * Calculate overtime pay for hours exceeding the ordinary threshold.
 * @param totalHours - Total hours worked in the shift
 * @param threshold - Ordinary hours threshold (e.g., 7.6)
 * @param award - Award definition for overtime rates
 * @param effectiveRate - The effective hourly rate (base * day multiplier)
 * @param baseRate - The raw base rate for overtime calculation
 * @returns Overtime breakdown
 */
export function calculateOvertime(
  totalHours: number,
  threshold: number,
  award: AwardDefinition,
  baseRate: number
): { overtimeHours: number; overtimePay: number; rates: AppliedRate[] } {
  if (totalHours <= threshold) {
    return { overtimeHours: 0, overtimePay: 0, rates: [] };
  }

  const overtimeHours = totalHours - threshold;
  const first2 = Math.min(overtimeHours, 2);
  const after2 = Math.max(0, overtimeHours - 2);
  const rates: AppliedRate[] = [];

  if (first2 > 0) {
    rates.push({
      description: 'Overtime (first 2hrs)',
      hours: first2,
      multiplier: award.overtime.first2Hours,
      amount: round(first2 * baseRate * award.overtime.first2Hours),
    });
  }

  if (after2 > 0) {
    rates.push({
      description: 'Overtime (after 2hrs)',
      hours: after2,
      multiplier: award.overtime.after2Hours,
      amount: round(after2 * baseRate * award.overtime.after2Hours),
    });
  }

  const overtimePay = rates.reduce((sum, r) => sum + r.amount, 0);
  return { overtimeHours, overtimePay, rates };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
