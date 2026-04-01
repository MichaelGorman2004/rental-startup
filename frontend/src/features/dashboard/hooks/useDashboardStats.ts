import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getMyBookingSummary } from '@/lib/api/endpoints/bookings';
import type { BookingSummary } from '@/lib/api/endpoints/bookings';
import { queryKeys } from '@/lib/react-query/keys';
import { STALE_TIMES } from '@/lib/react-query/constants';
import { formatPrice } from '@/features/venues/utils';

interface DashboardStat {
  label: string;
  value: string;
  trend: string;
}

interface UseDashboardStatsReturn {
  stats: DashboardStat[];
  budgetUsedCents: number;
  isLoading: boolean;
  isError: boolean;
}

const STAT_LABELS = {
  UPCOMING: 'Upcoming Events',
  TOTAL: 'Total Bookings',
  BUDGET: 'Budget Used',
} as const;

function toStats(summary: BookingSummary): DashboardStat[] {
  return [
    {
      label: STAT_LABELS.UPCOMING,
      value: String(summary.upcomingEventsCount),
      trend: '',
    },
    {
      label: STAT_LABELS.TOTAL,
      value: String(summary.totalBookings),
      trend: '',
    },
    {
      label: STAT_LABELS.BUDGET,
      value: formatPrice(summary.budgetUsedCents),
      trend: '',
    },
  ];
}

/**
 * Fetches org dashboard summary stats from the backend.
 * Returns formatted stat cards for the DashboardStats component.
 */
export function useDashboardStats(): UseDashboardStatsReturn {
  const query = useQuery<BookingSummary>({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: getMyBookingSummary,
    staleTime: STALE_TIMES.STATS,
  });

  const stats = useMemo(
    () => (query.data ? toStats(query.data) : []),
    [query.data],
  );

  return {
    stats,
    budgetUsedCents: query.data?.budgetUsedCents ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
