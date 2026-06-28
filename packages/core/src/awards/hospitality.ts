import type { AwardDefinition } from '../types.js';

/** Hospitality Industry (General) Award 2020 */
export const hospitalityAward: AwardDefinition = {
  name: 'Hospitality Industry (General) Award 2020',
  casualLoading: 0.25,
  dayPenalties: {
    monday: { multiplier: 1.0, casualMultiplier: 1.25 },
    tuesday: { multiplier: 1.0, casualMultiplier: 1.25 },
    wednesday: { multiplier: 1.0, casualMultiplier: 1.25 },
    thursday: { multiplier: 1.0, casualMultiplier: 1.25 },
    friday: { multiplier: 1.0, casualMultiplier: 1.25 },
    saturday: { multiplier: 1.25, casualMultiplier: 1.50 },
    sunday: { multiplier: 1.50, casualMultiplier: 1.75 },
    publicHoliday: { multiplier: 2.5, casualMultiplier: 2.75 },
  },
  timePenalties: [
    {
      startHour: 19,
      endHour: 24,
      loading: 0.15,
      description: 'Evening penalty (7pm-midnight Mon-Fri, Level 1)',
      applicableDays: [1, 2, 3, 4, 5],
    },
  ],
  overtime: { first2Hours: 1.5, after2Hours: 2.0 },
  ordinaryHoursThreshold: 7.6,
};
