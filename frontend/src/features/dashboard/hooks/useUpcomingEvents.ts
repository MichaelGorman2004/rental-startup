import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';
import type { UpcomingEvent } from '../types/dashboard.types';

/**
 * Mock events data for development.
 * Replace with actual API call when backend endpoint is ready.
 */
const MOCK_EVENTS: UpcomingEvent[] = [
  {
    id: '1',
    eventDate: '2026-03-20',
    eventStartTime: '20:00',
    eventEndTime: '23:00',
    eventName: 'Spring Rush Mixer',
    venueName: 'The Blue Dog Tavern',
    venueAddress: '123 Main St, College Town',
  },
  {
    id: '2',
    eventDate: '2026-03-28',
    eventStartTime: '19:00',
    eventEndTime: '22:00',
    eventName: 'Brotherhood Dinner',
    venueName: "Mario's Pizza & Pub",
    venueAddress: '456 Oak Ave, College Town',
  },
  {
    id: '3',
    eventDate: '2026-04-06',
    eventStartTime: '21:00',
    eventEndTime: '23:30',
    eventName: 'Alumni Reunion',
    venueName: 'Campus Sports Bar',
    venueAddress: '789 University Blvd',
  },
];

const sortByDateAscending = (a: UpcomingEvent, b: UpcomingEvent): number => {
  const dateA = new Date(`${a.eventDate}T${a.eventStartTime}`);
  const dateB = new Date(`${b.eventDate}T${b.eventStartTime}`);
  return dateA.getTime() - dateB.getTime();
};

/**
 * Hook to fetch upcoming events for the current organization.
 * Currently returns mock data; will be updated to fetch from API.
 */
export function useUpcomingEvents() {
  const fetchEvents = useCallback(async (): Promise<UpcomingEvent[]> => {
    // Simulate network delay for realistic loading state
    await new Promise((resolve) => { setTimeout(resolve, 500); });

    // TODO: Replace with actual API call when backend is ready
    // const token = await getToken();
    // const response = await fetch(DASHBOARD_CONSTANTS.API.BOOKINGS_ENDPOINT, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // const bookings = await response.json();

    return [...MOCK_EVENTS].sort(sortByDateAscending);
  }, []);

  const query = useQuery({
    queryKey: [DASHBOARD_CONSTANTS.QUERY_KEYS.UPCOMING_EVENTS],
    queryFn: fetchEvents,
    staleTime: DASHBOARD_CONSTANTS.CACHE_TIME_MS,
  });

  return {
    events: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
