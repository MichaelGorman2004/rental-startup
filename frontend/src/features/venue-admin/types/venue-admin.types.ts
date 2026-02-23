import type { BookingStatus } from '../../bookings/types/booking.types';

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
