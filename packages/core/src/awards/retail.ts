import type { AwardDefinition } from '../types.js';

/** General Retail Industry Award 2020 */
export const retailAward: AwardDefinition = {
  name: 'General Retail Industry Award 2020',
  casualLoading: 0.25,
  dayPenalties: {
    monday: { multiplier: 1.0, casualMultiplier: 1.25 },
    tuesday: { multiplier: 1.0, casualMultiplier: 1.25 },
    wednesday: { multiplier: 1.0, casualMultiplier: 1.25 },
    thursday: { multiplier: 1.0, casualMultiplier: 1.25 },
    friday: { multiplier: 1.0, casualMultiplier: 1.25 },
    saturday: { multiplier: 1.25, casualMultiplier: 1.50 },
    sunday: { multiplier: 2.0, casualMultiplier: 2.0 },
    publicHoliday: { multiplier: 2.5, casualMultiplier: 2.75 },
  },
  timePenalties: [
    { startHour: 18, endHour: 24, loading: 0.25, description: 'Evening (6pm-midnight)' },
    { startHour: 0, endHour: 7, loading: 0.25, description: 'Early morning (midnight-7am)' },
  ],
  overtime: { first2Hours: 1.5, after2Hours: 2.0 },
  ordinaryHoursThreshold: 7.6,
};
