import { useUser } from '@clerk/clerk-react';
import { useMyVenue } from './useMyVenue';
import { useVenueStats } from './useVenueStats';
import { useVenueBookings } from './useVenueBookings';
import { useBookingActions } from './useBookingActions';

/**
 * Orchestrates the venue admin dashboard: auth check, venue lookup, stats, bookings, actions.
 * Extracts all logic from AdminDashboard component.
 */
export function useAdminDashboard() {
  const { user } = useUser();
  const isVenueAdmin = user?.publicMetadata?.['role'] === 'venue_admin';

  const myVenue = useMyVenue();
  const { venueId } = myVenue;

  const stats = useVenueStats(venueId);
  const bookings = useVenueBookings(venueId);
  const actions = useBookingActions(venueId);

  return {
    isVenueAdmin,
    venue: myVenue.venue,
    isVenueLoading: myVenue.isLoading,
    isVenueNotFound: myVenue.isNotFound,
    stats: stats.stats,
    isStatsLoading: stats.isLoading,
    isStatsError: stats.isError,
    bookings: bookings.bookings,
    bookingsTotalPages: bookings.totalPages,
    bookingsPage: bookings.page,
    setBookingsPage: bookings.setPage,
    isBookingsLoading: bookings.isLoading,
    isBookingsError: bookings.isError,
    refetchBookings: bookings.refetch,
    ...actions,
  };
}
