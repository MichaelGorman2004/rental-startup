import type { BookingStatus } from '@/features/bookings/types';
import type {
  CreateBookingRequest,
  BookingConfirmation,
} from '@/features/bookings/types/booking.types';
import type { AdminBooking, VenueStats } from '@/features/venue-admin/types';
import { apiClient } from '../client';

/** Frontend shape for a booking with details (my bookings list). */
export interface MyBooking {
  id: string;
  venueId: string;
  organizationId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  status: BookingStatus;
  specialRequests?: string;
  venueName: string;
  organizationName: string;
  createdAt: string;
  updatedAt: string;
}

/** Paginated my bookings response. */
export interface MyBookingsResponse {
  items: MyBooking[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Backend snake_case shape for my bookings. */
interface MyBookingApiResponse {
  id: string;
  venue_id: string;
  organization_id: string;
  event_name: string;
  event_date: string;
  event_time: string;
  guest_count: number;
  status: BookingStatus;
  special_requests: string | null;
  venue_name: string;
  organization_name: string;
  created_at: string;
  updated_at: string;
}

interface PaginatedApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

/** Backend snake_case booking shape returned from the API. */
interface BookingApiResponse {
  id: string;
  reference_number: string;
  venue_name: string;
  event_name: string;
  event_date: string;
  event_time: string;
  guest_count: number;
  estimated_cost_cents: number;
  status: BookingStatus;
}

/** Backend snake_case admin booking shape. */
interface AdminBookingApiResponse {
  id: string;
  organization_name: string;
  event_name: string;
  event_date: string;
  event_time: string;
  guest_count: number;
  status: BookingStatus;
  created_at: string;
}

/** Backend snake_case venue stats shape. */
interface VenueStatsApiResponse {
  bookings_this_month: number;
  revenue_cents: number;
  average_rating: number | null;
  occupancy_percent: number;
}

/** Transform a backend booking response to frontend shape. */
function toBookingConfirmation(raw: BookingApiResponse): BookingConfirmation {
  return {
    id: raw.id,
    referenceNumber: raw.reference_number,
    venueName: raw.venue_name,
    eventName: raw.event_name,
    eventDate: raw.event_date,
    eventTime: raw.event_time,
    guestCount: raw.guest_count,
    estimatedCostCents: raw.estimated_cost_cents,
    status: raw.status,
  };
}

/** Transform a backend admin booking to frontend shape. */
function toAdminBooking(raw: AdminBookingApiResponse): AdminBooking {
  return {
    id: raw.id,
    organizationName: raw.organization_name,
    eventName: raw.event_name,
    eventDate: raw.event_date,
    eventTime: raw.event_time,
    guestCount: raw.guest_count,
    status: raw.status,
    createdAt: raw.created_at,
  };
}

/** Transform backend venue stats to frontend shape. */
function toVenueStats(raw: VenueStatsApiResponse): VenueStats {
  return {
    bookingsThisMonth: raw.bookings_this_month,
    revenueCents: raw.revenue_cents,
    averageRating: raw.average_rating,
    occupancyPercent: raw.occupancy_percent,
  };
}

/** POST /bookings — Create a new booking request. */
export async function createBooking(
  request: CreateBookingRequest,
): Promise<BookingConfirmation> {
  const { data } = await apiClient.post<BookingApiResponse>(
    '/bookings',
    {
      venue_id: request.venueId,
      event_name: request.eventName,
      event_date: request.eventDate,
      event_time: request.eventTime,
      guest_count: request.guestCount,
      special_requests: request.specialRequests,
      budget_cents: request.budgetCents,
    },
  );
  return toBookingConfirmation(data);
}

/** GET /venues/:id/bookings — List bookings for a venue (admin). */
export async function getVenueBookings(
  venueId: string,
): Promise<AdminBooking[]> {
  const { data } = await apiClient.get<AdminBookingApiResponse[]>(
    `/venues/${venueId}/bookings`,
  );
  return data.map(toAdminBooking);
}

/** GET /venues/:id/stats — Get venue performance stats (admin). */
export async function getVenueStats(venueId: string): Promise<VenueStats> {
  const { data } = await apiClient.get<VenueStatsApiResponse>(
    `/venues/${venueId}/stats`,
  );
  return toVenueStats(data);
}

/** PATCH /bookings/:id/accept — Accept a booking request. */
export async function acceptBooking(bookingId: string): Promise<void> {
  await apiClient.patch(`/bookings/${bookingId}/accept`);
}

/** PATCH /bookings/:id/decline — Decline a booking request. */
export async function declineBooking(bookingId: string): Promise<void> {
  await apiClient.patch(`/bookings/${bookingId}/decline`);
}

/** Transform a backend my booking to frontend shape. */
function toMyBooking(raw: MyBookingApiResponse): MyBooking {
  return {
    id: raw.id,
    venueId: raw.venue_id,
    organizationId: raw.organization_id,
    eventName: raw.event_name,
    eventDate: raw.event_date,
    eventTime: raw.event_time,
    guestCount: raw.guest_count,
    status: raw.status,
    specialRequests: raw.special_requests ?? undefined,
    venueName: raw.venue_name,
    organizationName: raw.organization_name,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

/** GET /bookings/me — List current user's org bookings. */
export async function getMyBookings(params?: {
  status?: BookingStatus;
  page?: number;
  page_size?: number;
}): Promise<MyBookingsResponse> {
  const { data } = await apiClient.get<PaginatedApiResponse<MyBookingApiResponse>>(
    '/bookings/me',
    { params },
  );
  return {
    items: data.items.map(toMyBooking),
    total: data.total,
    page: data.page,
    pageSize: data.page_size,
    totalPages: data.total_pages,
  };
}

/** PATCH /bookings/:id/cancel — Cancel a booking. */
export async function cancelBooking(bookingId: string): Promise<MyBooking> {
  const { data } = await apiClient.patch<MyBookingApiResponse>(
    `/bookings/${bookingId}/cancel`,
  );
  return toMyBooking(data);
}
