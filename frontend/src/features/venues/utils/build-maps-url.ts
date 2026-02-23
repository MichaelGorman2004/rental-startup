/**
 * Build a Google Maps search URL from venue address components.
 * Encodes the full address as a query parameter for reliable resolution.
 *
 * @example buildMapsUrl("123 Main St", "Austin", "TX", "78701")
 *   → "https://www.google.com/maps/search/?api=1&query=123+Main+St%2C+Austin%2C+TX+78701"
 */
export function buildMapsUrl(
  street: string,
  city: string,
  state: string,
  zip: string,
): string {
  const address = `${street}, ${city}, ${state} ${zip}`;
  const encoded = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
}
