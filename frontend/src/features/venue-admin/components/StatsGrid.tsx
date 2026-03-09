import { memo } from 'react';
import { SimpleGrid, Skeleton } from '@mantine/core';
import {
  CalendarBlank, CurrencyDollar, Star, ChartBar,
} from '@phosphor-icons/react';
import type { StatsGridProps } from '../types';
import { ADMIN_MESSAGES, STATS_SKELETON_COUNT } from '../constants';
import { formatPrice } from '../utils';
import { StatCard } from './StatCard';

/** Format the rating value for display. */
function formatRating(rating: number | null): string {
  if (rating === null) return ADMIN_MESSAGES.STATS_RATING_NONE;
  return `${rating.toFixed(1)} / 5.0`;
}

/** 2x2 grid of venue performance stat cards. */
export const StatsGrid = memo(({ stats, isLoading, isError }: StatsGridProps) => {
  if (isError) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <StatCard
          icon={<ChartBar size="1.25rem" />}
          label="Stats"
          value="Failed to load"
          color="red"
        />
      </SimpleGrid>
    );
  }

  if (isLoading || !stats) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {Array.from({ length: STATS_SKELETON_COUNT }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={i} height={90} radius="md" />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <StatCard
        icon={<CalendarBlank size="1.25rem" />}
        label={ADMIN_MESSAGES.STATS_BOOKINGS}
        value={stats.bookingsThisMonth.toString()}
        color="flame"
      />
      <StatCard
        icon={<CurrencyDollar size="1.25rem" />}
        label={ADMIN_MESSAGES.STATS_REVENUE}
        value={formatPrice(stats.revenueCents)}
        color="green"
      />
      <StatCard
        icon={<Star size="1.25rem" />}
        label={ADMIN_MESSAGES.STATS_RATING}
        value={formatRating(stats.averageRating)}
        color="yellow"
      />
      <StatCard
        icon={<ChartBar size="1.25rem" />}
        label={ADMIN_MESSAGES.STATS_OCCUPANCY}
        value={`${stats.occupancyPercent}%`}
        color="cyan"
      />
    </SimpleGrid>
  );
});
