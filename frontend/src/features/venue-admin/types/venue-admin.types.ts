/**
 * Venue admin types - re-exported from shared package for backward compatibility.
 *
 * NOTE: Prefer importing directly from '@venuelink/shared' for new code.
 * This file maintains backward compatibility during migration.
 */

import type { BookingStatus } from '@venuelink/shared';

// Re-export shared types
export { BookingStatus } from '@venuelink/shared';
export type { AdminBookingView, VenueStatsResponse } from '@venuelink/shared';

/** Venue performance stats displayed on the admin dashboard. */
export interface VenueStats {
  bookingsThisMonth: number;
  revenueCents: number;
  averageRating: number | null;
  occupancyPercent: number;
}

/** A booking request visible to venue admins. */
export interface AdminBooking {
  id: string;
  organizationName: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  status: BookingStatus;
  createdAt: string;
}

/** Possible actions a venue admin can take on a booking. */
export type BookingAction = 'accept' | 'decline';

/** Payload for a booking accept/decline mutation. */
export interface ActionPayload {
  bookingId: string;
  action: BookingAction;
  venueId: string;
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
  booking: AdminBooking;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isActionPending: boolean;
}

/** Props for the BookingsList component. */
export interface BookingsListProps {
  bookings: AdminBooking[];
  isLoading: boolean;
  isError: boolean;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isPending: boolean;
  activeBookingId: string | null;
}
