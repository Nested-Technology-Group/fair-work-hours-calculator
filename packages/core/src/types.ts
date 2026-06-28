/** Australian states and territories */
export type AustralianState = 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'NT' | 'ACT';

/** Supported Modern Awards */
export type AwardType = 'retail' | 'hospitality' | 'fast-food' | 'cleaning';

/** Employment type under the award */
export type EmploymentType = 'full-time' | 'part-time' | 'casual';

/** A single work shift */
export interface Shift {
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Start time in HH:mm 24-hour format */
  startTime: string;
  /** End time in HH:mm 24-hour format */
  endTime: string;
  /** Break duration in minutes (subtracted from worked hours) */
  breakMinutes?: number;
}

/** Options for the pay calculator */
export interface CalculateOptions {
  award: AwardType;
  employmentType: EmploymentType;
  /** Hourly base rate in dollars */
  baseRate: number;
  shifts: Shift[];
  state: AustralianState;
  /** Year for public holiday lookup (defaults to shift year) */
  year?: number;
}

/** Breakdown of a single shift's pay components */
export interface ShiftBreakdown {
  date: string;
  hoursWorked: number;
  ordinaryPay: number;
  penaltyPay: number;
  overtimePay: number;
  totalPay: number;
  isPublicHoliday: boolean;
  appliedRates: AppliedRate[];
}

/** A rate that was applied during calculation */
export interface AppliedRate {
  description: string;
  hours: number;
  multiplier: number;
  amount: number;
}

/** Final calculation result */
export interface CalculationResult {
  totalHours: number;
  totalPay: number;
  shifts: ShiftBreakdown[];
  summary: {
    ordinaryHours: number;
    overtimeHours: number;
    penaltyHours: number;
    publicHolidayHours: number;
  };
}

/** Day-of-week penalty rate definition */
export interface DayPenalty {
  multiplier: number;
  casualMultiplier: number;
}

/** Time-of-day penalty definition */
export interface TimePenalty {
  /** Start hour (0-23) */
  startHour: number;
  /** End hour (0-23, use 24 for midnight end) */
  endHour: number;
  /** Additional percentage loading (e.g., 0.25 for +25%) */
  loading: number;
  /** Description of this penalty */
  description: string;
  /** Days this penalty applies (0=Sunday, 6=Saturday) */
  applicableDays?: number[];
}

/** Award definition structure */
export interface AwardDefinition {
  name: string;
  casualLoading: number;
  dayPenalties: Record<string, DayPenalty>;
  timePenalties: TimePenalty[];
  overtime: {
    /** Multiplier for first 2 hours of overtime */
    first2Hours: number;
    /** Multiplier for hours after the first 2 overtime hours */
    after2Hours: number;
  };
  /** Daily ordinary hours threshold (triggers overtime) */
  ordinaryHoursThreshold: number;
}
