import { OrganizationType, ORGANIZATION_TYPE_VALUES } from '../enums';

/**
 * Type guard for OrganizationType enum.
 *
 * Use for runtime validation of API responses or user input.
 *
 * @param value - Value to check
 * @returns True if value is a valid OrganizationType
 *
 * @example
 * ```ts
 * const type = response.organizationType;
 * if (isOrganizationType(type)) {
 *   // type is typed as OrganizationType
 *   handleOrgType(type);
 * }
 * ```
 */
export function isOrganizationType(value: unknown): value is OrganizationType {
  return (
    typeof value === 'string' &&
    ORGANIZATION_TYPE_VALUES.includes(value as OrganizationType)
  );
}

/**
 * Assert that a value is a valid OrganizationType.
 *
 * Throws if the value is not a valid OrganizationType.
 *
 * @param value - Value to assert
 * @param message - Optional error message
 * @throws Error if value is not a valid OrganizationType
 */
export function assertOrganizationType(
  value: unknown,
  message = 'Invalid organization type'
): asserts value is OrganizationType {
  if (!isOrganizationType(value)) {
    throw new Error(`${message}: ${String(value)}`);
  }
}
