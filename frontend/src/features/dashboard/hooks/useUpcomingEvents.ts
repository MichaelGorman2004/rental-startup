import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getUpcomingBookings } from '@/lib/api/endpoints/bookings';
import type { MyBooking } from '@/lib/api/endpoints/bookings';
import { queryKeys } from '@/lib/react-query/keys';
import { STALE_TIMES } from '@/lib/react-query/constants';
import type { UpcomingEvent } from '../types/dashboard.types';

function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function toUpcomingEvent(booking: MyBooking): UpcomingEvent {
  return {
    id: booking.id,
    eventDate: booking.eventDate,
    eventStartTime: booking.eventStartTime,
    eventEndTime: booking.eventEndTime,
    eventName: booking.eventName,
    venueName: booking.venueName,
    venueAddress: '',
  };
}

/**
 * Fetches upcoming confirmed events for the current org.
 * Calls GET /bookings/me?status=confirmed&from_date=today&sort_by=event_date.
 */
export function useUpcomingEvents() {
  const query = useQuery({
    queryKey: queryKeys.dashboard.events(),
    queryFn: () => getUpcomingBookings({
      status: 'confirmed',
      from_date: getTodayISO(),
      sort_by: 'event_date',
    }),
    staleTime: STALE_TIMES.EVENTS,
  });

  const events = useMemo<UpcomingEvent[]>(
    () => (query.data?.items ?? []).map(toUpcomingEvent),
    [query.data],
  );

  return {
    events,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
