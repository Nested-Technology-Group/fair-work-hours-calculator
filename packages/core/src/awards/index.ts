import type { AwardDefinition, AwardType } from '../types.js';
import { retailAward } from './retail.js';
import { hospitalityAward } from './hospitality.js';
import { fastFoodAward } from './fast-food.js';
import { cleaningAward } from './cleaning.js';

export { retailAward } from './retail.js';
export { hospitalityAward } from './hospitality.js';
export { fastFoodAward } from './fast-food.js';
export { cleaningAward } from './cleaning.js';

/** Map of award type to its definition */
export const awards: Record<AwardType, AwardDefinition> = {
  retail: retailAward,
  hospitality: hospitalityAward,
  'fast-food': fastFoodAward,
  cleaning: cleaningAward,
};

/**
 * Get the award definition for a given award type.
 * @throws Error if award type is not supported
 */
export function getAward(type: AwardType): AwardDefinition {
  const award = awards[type];
  if (!award) throw new Error(`Unsupported award type: ${type}`);
  return award;
}
