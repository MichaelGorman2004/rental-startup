/**
 * Format venue address fields into a single display string.
 *
 * @example formatAddress("123 Main St", "Austin", "TX") → "123 Main St, Austin, TX"
 */
export function formatAddress(street: string, city: string, state: string): string {
  return `${street}, ${city}, ${state}`;
}
