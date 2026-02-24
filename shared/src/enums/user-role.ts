/**
 * User role types for role-based access control (RBAC).
 *
 * Values must match PostgreSQL `user_role` ENUM exactly.
 * @see backend/app/core/constants/enums.py#UserRole
 */
export enum UserRole {
  /** College student organization administrator */
  StudentOrg = 'student_org',
  /** Venue owner/manager with listing management permissions */
  VenueAdmin = 'venue_admin',
}

/** Array of all valid UserRole values for iteration/validation. */
export const USER_ROLE_VALUES = Object.values(UserRole) as UserRole[];
