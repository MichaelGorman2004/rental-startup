/**
 * Venue admin types - re-exported from shared package for backward compatibility.
 *
 * NOTE: Prefer importing directly from '@venuelink/shared' for new code.
 * This file maintains backward compatibility during migration.
 */

import type { AdminBookingView } from '@venuelink/shared';

// Re-export shared types
export { BookingStatus } from '@venuelink/shared';
export type {
  AdminBookingView,
  VenueStatsResponse,
  BookingActionPayload,
  BookingActionType as BookingAction,
} from '@venuelink/shared';

/** Venue performance stats displayed on the admin dashboard. */
export interface VenueStats {
  bookingsThisMonth: number;
  revenueCents: number;
  occupancyPercent: number;
}

/** Props for the StatCard component. */
export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  subtitle?: string;
}

/** Props for the StatsGrid component. */
export interface StatsGridProps {
  stats: VenueStats | null;
  isLoading: boolean;
  isError?: boolean;
}

/** Props for the BookingCard component. */
export interface BookingCardProps {
  booking: AdminBookingView;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isActionPending: boolean;
}

/** Props for the BookingsList component. */
export interface BookingsListProps {
  bookings: AdminBookingView[];
  isLoading: boolean;
  isError: boolean;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isPending: boolean;
  activeBookingId: string | null;
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}
