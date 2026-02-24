import { UserRole, USER_ROLE_VALUES } from '../enums';

/**
 * Type guard for UserRole enum.
 *
 * Use for runtime validation of API responses or user input.
 *
 * @param value - Value to check
 * @returns True if value is a valid UserRole
 *
 * @example
 * ```ts
 * const role = response.role;
 * if (isUserRole(role)) {
 *   // role is typed as UserRole
 *   handleRole(role);
 * }
 * ```
 */
export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLE_VALUES.includes(value as UserRole);
}

/**
 * Assert that a value is a valid UserRole.
 *
 * Throws if the value is not a valid UserRole.
 *
 * @param value - Value to assert
 * @param message - Optional error message
 * @throws Error if value is not a valid UserRole
 */
export function assertUserRole(
  value: unknown,
  message = 'Invalid user role'
): asserts value is UserRole {
  if (!isUserRole(value)) {
    throw new Error(`${message}: ${String(value)}`);
  }
}
