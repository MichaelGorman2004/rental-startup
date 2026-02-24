/**
 * Dashboard types - re-exported from shared package for backward compatibility.
 *
 * NOTE: Prefer importing directly from '@venuelink/shared' for new code.
 * This file maintains backward compatibility during migration.
 */

import type { Icon } from '@tabler/icons-react';

// Re-export shared types
export { OrganizationType } from '@venuelink/shared';
export type { OrganizationSummary, UpcomingEvent } from '@venuelink/shared';

// Local types (UI-specific)

/**
 * Configuration for a quick action card in the dashboard grid.
 */
export interface QuickAction {
  /** Unique identifier for the action */
  id: string;
  /** Display title for the action card */
  title: string;
  /** Route to navigate to when clicked */
  route: string;
  /** Tabler icon component to display */
  icon: Icon;
  /** Mantine color for the icon background */
  color: string;
}

/**
 * Organization data extracted from Clerk metadata.
 * Uses the shared OrganizationType enum.
 */
export interface OrganizationData {
  /** Organization ID from the database */
  id: string;
  /** Organization display name */
  name: string;
  /** Organization type (fraternity, sorority, club, other) */
  type: import('@venuelink/shared').OrganizationType;
  /** University name */
  university: string;
}
