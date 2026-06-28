import type { AwardDefinition } from '../types.js';

/** Cleaning Services Award 2020 */
export const cleaningAward: AwardDefinition = {
  name: 'Cleaning Services Award 2020',
  casualLoading: 0.25,
  dayPenalties: {
    monday: { multiplier: 1.0, casualMultiplier: 1.25 },
    tuesday: { multiplier: 1.0, casualMultiplier: 1.25 },
    wednesday: { multiplier: 1.0, casualMultiplier: 1.25 },
    thursday: { multiplier: 1.0, casualMultiplier: 1.25 },
    friday: { multiplier: 1.0, casualMultiplier: 1.25 },
    saturday: { multiplier: 1.50, casualMultiplier: 1.75 },
    sunday: { multiplier: 2.0, casualMultiplier: 2.0 },
    publicHoliday: { multiplier: 2.5, casualMultiplier: 2.75 },
  },
  timePenalties: [],
  overtime: { first2Hours: 1.5, after2Hours: 2.0 },
  ordinaryHoursThreshold: 7.6,
};
