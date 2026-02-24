import type { OrganizationType } from '../enums';

/**
 * Organization entity as stored in the database.
 *
 * Represents a student organization that can book venues.
 * @see backend/app/modules/organizations/models.py#Organization
 */
export interface Organization {
  /** UUID v4 primary key */
  id: string;
  /** Organization display name */
  name: string;
  /** Organization classification */
  type: OrganizationType;
  /** University name (e.g., "University of Michigan") */
  university: string;
  /** UUID of the user who owns/administers this organization */
  ownerId: string;
  /** ISO 8601 timestamp of creation */
  createdAt: string;
  /** ISO 8601 timestamp of last update */
  updatedAt: string;
}

/**
 * Organization summary for display in cards and lists.
 *
 * Minimal organization data extracted from Clerk metadata or API.
 */
export interface OrganizationSummary {
  /** UUID v4 identifier */
  id: string;
  /** Organization display name */
  name: string;
  /** Organization classification */
  type: OrganizationType;
  /** University name */
  university: string;
}

/**
 * Extended organization profile with optional fields.
 *
 * Includes additional fields that may be added in future (VL-018).
 */
export interface OrganizationProfile extends Organization {
  /** Organization description/bio (optional) */
  description?: string;
  /** Public contact email (optional) */
  contactEmail?: string;
  /** Contact phone number (optional) */
  contactPhone?: string;
  /** Organization size (optional) */
  memberCount?: number;
  /** Organization website URL (optional) */
  websiteUrl?: string;
  /** Organization logo/avatar URL (optional) */
  logoUrl?: string;
}
