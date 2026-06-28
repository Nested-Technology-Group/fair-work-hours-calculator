import type {
  CalculateOptions,
  CalculationResult,
  Shift,
  ShiftBreakdown,
  AppliedRate,
  AwardDefinition,
  EmploymentType,
} from './types.js';
import { getAward } from './awards/index.js';
import { isPublicHoliday } from './public-holidays.js';
import { getDayMultiplier, getTimePenaltyRates, calculateOvertime } from './penalties.js';

/**
 * Calculate total pay for a set of shifts under a given Australian Modern Award.
 *
 * Handles:
 * - Public holiday detection per state
 * - Day-of-week penalty rates
 * - Time-of-day penalty loadings
 * - Overtime (daily hours exceeding 7.6 for full-time/part-time)
 * - Casual loading
 * - Break deductions
 *
 * @param options - Calculation options including award, shifts, and employment type
 * @returns Detailed breakdown of pay for each shift and totals
 *
 * @example
 * ```ts
 * const result = calculate({
 *   award: 'retail',
 *   employmentType: 'casual',
 *   baseRate: 25.00,
 *   state: 'NSW',
 *   shifts: [{ date: '2025-04-25', startTime: '09:00', endTime: '17:00', breakMinutes: 30 }],
 * });
 * ```
 */
export function calculate(options: CalculateOptions): CalculationResult {
  const { award: awardType, employmentType, baseRate, shifts, state } = options;
  const award = getAward(awardType);

  const shiftBreakdowns: ShiftBreakdown[] = shifts.map((shift) =>
    calculateShift(shift, award, employmentType, baseRate, state)
  );

  const totalHours = round(shiftBreakdowns.reduce((s, b) => s + b.hoursWorked, 0));
  const totalPay = round(shiftBreakdowns.reduce((s, b) => s + b.totalPay, 0));

  const summary = shiftBreakdowns.reduce(
    (acc, b) => {
      if (b.isPublicHoliday) acc.publicHolidayHours += b.hoursWorked;
      const otHours = b.appliedRates
        .filter((r) => r.description.startsWith('Overtime'))
        .reduce((s, r) => s + r.hours, 0);
      acc.overtimeHours += otHours;
      const penaltyHours = b.appliedRates
        .filter((r) => !r.description.startsWith('Overtime') && !r.description.startsWith('Ordinary'))
        .reduce((s, r) => s + r.hours, 0);
      acc.penaltyHours += penaltyHours;
      acc.ordinaryHours += b.hoursWorked - otHours;
      return acc;
    },
    { ordinaryHours: 0, overtimeHours: 0, penaltyHours: 0, publicHolidayHours: 0 }
  );

  return {
    totalHours,
    totalPay,
    shifts: shiftBreakdowns,
    summary: {
      ordinaryHours: round(summary.ordinaryHours),
      overtimeHours: round(summary.overtimeHours),
      penaltyHours: round(summary.penaltyHours),
      publicHolidayHours: round(summary.publicHolidayHours),
    },
  };
}

function calculateShift(
  shift: Shift,
  award: AwardDefinition,
  employmentType: EmploymentType,
  baseRate: number,
  state: string
): ShiftBreakdown {
  const date = parseDate(shift.date);
  const dayOfWeek = date.getDay();
  const pubHoliday = isPublicHoliday(shift.date, state as any);

  const startMinutes = parseTime(shift.startTime);
  const endMinutes = parseTime(shift.endTime);
  const breakMin = shift.breakMinutes ?? 0;

  // Handle overnight shifts
  let totalMinutes = endMinutes - startMinutes;
  if (totalMinutes <= 0) totalMinutes += 24 * 60;
  totalMinutes -= breakMin;
  const hoursWorked = round(totalMinutes / 60);

  const startHour = startMinutes / 60;
  let endHour = endMinutes / 60;
  if (endHour <= startHour) endHour += 24;

  // Day multiplier (penalty rate for the day type)
  const dayMultiplier = getDayMultiplier(date, award, employmentType, pubHoliday);

  // Ordinary hours (capped at threshold for non-casual)
  const ordinaryThreshold =
    employmentType === 'casual' ? Infinity : award.ordinaryHoursThreshold;
  const ordinaryHours = Math.min(hoursWorked, ordinaryThreshold);

  const appliedRates: AppliedRate[] = [];

  // Ordinary pay at day multiplier
  const ordinaryPay = round(ordinaryHours * baseRate * dayMultiplier);
  appliedRates.push({
    description: `Ordinary hours (${dayMultiplier}x)`,
    hours: ordinaryHours,
    multiplier: dayMultiplier,
    amount: ordinaryPay,
  });

  // Time-of-day penalties (applied on top of base rate, not compounded with day multiplier)
  const timePenaltyRates = getTimePenaltyRates(
    startHour,
    Math.min(endHour, startHour + hoursWorked + breakMin / 60),
    dayOfWeek,
    award.timePenalties,
    baseRate
  );
  const penaltyPay = round(timePenaltyRates.reduce((s, r) => s + r.amount, 0));
  appliedRates.push(...timePenaltyRates);

  // Overtime (only for non-casual employees)
  let overtimePay = 0;
  if (employmentType !== 'casual') {
    const ot = calculateOvertime(hoursWorked, award.ordinaryHoursThreshold, award, baseRate);
    overtimePay = ot.overtimePay;
    appliedRates.push(...ot.rates);
  }

  const totalPay = round(ordinaryPay + penaltyPay + overtimePay);

  return {
    date: shift.date,
    hoursWorked,
    ordinaryPay,
    penaltyPay,
    overtimePay,
    totalPay,
    isPublicHoliday: pubHoliday,
    appliedRates,
  };
}

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function parseTime(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
