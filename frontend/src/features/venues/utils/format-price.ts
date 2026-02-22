/**
 * Format a price in cents to a display currency string.
 * Uses USD locale formatting with no decimal places for clean display.
 *
 * @example formatPrice(45000) → "$450"
 * @example formatPrice(100000) → "$1,000"
 */
export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
}
