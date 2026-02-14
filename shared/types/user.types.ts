/**
 * User-related type definitions
 */

export enum UserRole {
  STUDENT_ORG = 'student_org',
  VENUE_ADMIN = 'venue_admin',
  PLATFORM_ADMIN = 'platform_admin',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentOrganization {
  id: string;
  userId: string;
  organizationName: string;
  organizationType: 'fraternity' | 'sorority' | 'club' | 'other';
  schoolName: string;
  // .edu email required for verification
  verifiedEmail: string;
  createdAt: string;
}

export interface VenueAdmin {
  id: string;
  userId: string;
  venueId: string;
  createdAt: string;
}
