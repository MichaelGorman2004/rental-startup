import type { Icon } from '@tabler/icons-react';

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
 * Represents an upcoming event/booking for display in the dashboard.
 */
export interface UpcomingEvent {
  /** Unique booking identifier */
  id: string;
  /** Event date in ISO 8601 format (YYYY-MM-DD) */
  eventDate: string;
  /** Event time in HH:MM format */
  eventTime: string;
  /** Display name for the event */
  eventName: string;
  /** Name of the venue */
  venueName: string;
  /** Venue address for display */
  venueAddress: string;
}

/**
 * Organization data extracted from Clerk metadata.
 */
export interface OrganizationData {
  /** Organization ID from the database */
  id: string;
  /** Organization display name */
  name: string;
  /** Organization type (fraternity, sorority, club, other) */
  type: string;
  /** University name */
  university: string;
}
