/**
 * Booking-related type definitions
 */

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export interface Booking {
  id: string;
  venueId: string;
  organizationId: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  status: BookingStatus;
  totalAmount: number;
  bookingFee: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingRequest {
  venueId: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  notes?: string;
}
