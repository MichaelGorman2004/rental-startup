import { PER_GUEST_COST_CENTS } from '../constants/booking-defaults';

/**
 * Calculate estimated event cost from base venue price and guest count.
 * Adds a per-guest surcharge on top of the venue's base price.
 *
 * @example calculateEstimatedCost(45000, 50) → 70000 ($450 base + $250 guests)
 */
export function calculateEstimatedCost(
  basePriceCents: number,
  guestCount: number | undefined,
): number {
  const guestSurcharge = (guestCount ?? 0) * PER_GUEST_COST_CENTS;
  return basePriceCents + guestSurcharge;
}
