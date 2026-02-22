/**
 * Format a capacity number with locale-aware comma separators.
 *
 * @example formatCapacity(80) → "80"
 * @example formatCapacity(1200) → "1,200"
 */
export function formatCapacity(capacity: number): string {
  return new Intl.NumberFormat('en-US').format(capacity);
}
