import { VenueType, VENUE_TYPE_VALUES } from '../enums';

/**
 * Type guard for VenueType enum.
 *
 * Use for runtime validation of API responses or user input.
 *
 * @param value - Value to check
 * @returns True if value is a valid VenueType
 *
 * @example
 * ```ts
 * const type = searchParams.get('type');
 * if (isVenueType(type)) {
 *   // type is typed as VenueType
 *   setFilter(type);
 * }
 * ```
 */
export function isVenueType(value: unknown): value is VenueType {
  return typeof value === 'string' && VENUE_TYPE_VALUES.includes(value as VenueType);
}

/**
 * Assert that a value is a valid VenueType.
 *
 * Throws if the value is not a valid VenueType.
 *
 * @param value - Value to assert
 * @param message - Optional error message
 * @throws Error if value is not a valid VenueType
 */
export function assertVenueType(
  value: unknown,
  message = 'Invalid venue type'
): asserts value is VenueType {
  if (!isVenueType(value)) {
    throw new Error(`${message}: ${String(value)}`);
  }
}
