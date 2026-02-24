/**
 * Auth types - re-exported from shared package for backward compatibility.
 *
 * NOTE: Prefer importing directly from '@venuelink/shared' for new code.
 * This file maintains backward compatibility during migration.
 */

import type { UserRole as UserRoleEnum } from '@venuelink/shared';
import { z } from 'zod';

import { loginSchema, signupSchema } from '../constants';

// Re-export shared types
export { UserRole } from '@venuelink/shared';
export type { AuthenticatedUser } from '@venuelink/shared';

/**
 * User interface for local usage.
 * Uses the shared UserRole enum.
 */
export interface User {
  id: string;
  email: string;
  role: UserRoleEnum;
  firstName?: string;
  lastName?: string;
}

/**
 * Auth state for the auth context/store.
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  role: UserRoleEnum | null;
}

/** Login form data inferred from Zod schema. */
export type LoginFormData = z.infer<typeof loginSchema>;

/** Signup form data inferred from Zod schema. */
export type SignupFormData = z.infer<typeof signupSchema>;
