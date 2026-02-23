import { useUser } from '@clerk/clerk-react';
import { useVenueStats } from './useVenueStats';
import { useVenueBookings } from './useVenueBookings';
import { useBookingActions } from './useBookingActions';

/** Placeholder venue ID for development. Replace with real venue ownership lookup. */
const MOCK_VENUE_ID = '1';

/**
 * Orchestrates the venue admin dashboard: auth check, stats, bookings, actions.
 * Extracts all logic from AdminDashboard component.
 */
export function useAdminDashboard() {
  const { user } = useUser();
  const isVenueAdmin = user?.unsafeMetadata?.['role'] === 'venue_admin';

  const venueId = MOCK_VENUE_ID;
  const stats = useVenueStats(venueId);
  const bookings = useVenueBookings(venueId);
  const actions = useBookingActions(venueId);

  return {
    isVenueAdmin,
    stats: stats.stats,
    isStatsLoading: stats.isLoading,
    isStatsError: stats.isError,
    bookings: bookings.bookings,
    isBookingsLoading: bookings.isLoading,
    isBookingsError: bookings.isError,
    refetchBookings: bookings.refetch,
    ...actions,
  };
}
