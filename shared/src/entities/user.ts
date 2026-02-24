import type { UserRole } from '../enums';

/**
 * User entity as stored in the database.
 *
 * Represents an authenticated user with role-based access.
 * @see backend/app/modules/users/models.py#User
 */
export interface User {
  /** UUID v4 primary key */
  id: string;
  /** User's email address (unique) */
  email: string;
  /** Whether the email has been verified */
  emailVerified: boolean;
  /** User's role determining access permissions */
  role: UserRole;
  /** ISO 8601 timestamp of account creation */
  createdAt: string;
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Minimal user info for display purposes.
 *
 * Used when full user data is not needed (e.g., in booking cards).
 */
export interface UserSummary {
  /** UUID v4 identifier */
  id: string;
  /** User's email address */
  email: string;
  /** User's role */
  role: UserRole;
}

/**
 * User data from Clerk authentication provider.
 *
 * Extended user info including profile data from Clerk.
 */
export interface AuthenticatedUser {
  /** UUID v4 identifier (synced with database) */
  id: string;
  /** User's email address */
  email: string;
  /** User's role */
  role: UserRole;
  /** First name from Clerk profile (optional) */
  firstName?: string;
  /** Last name from Clerk profile (optional) */
  lastName?: string;
}
