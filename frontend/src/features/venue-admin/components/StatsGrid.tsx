import { memo } from 'react';
import { SimpleGrid, Skeleton } from '@mantine/core';
import {
  IconCalendarEvent, IconCash, IconStar, IconChartBar,
} from '@tabler/icons-react';
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
          icon={<IconChartBar size="1.25rem" stroke={1.5} />}
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
        icon={<IconCalendarEvent size="1.25rem" stroke={1.5} />}
        label={ADMIN_MESSAGES.STATS_BOOKINGS}
        value={stats.bookingsThisMonth.toString()}
        color="indigo"
      />
      <StatCard
        icon={<IconCash size="1.25rem" stroke={1.5} />}
        label={ADMIN_MESSAGES.STATS_REVENUE}
        value={formatPrice(stats.revenueCents)}
        color="green"
      />
      <StatCard
        icon={<IconStar size="1.25rem" stroke={1.5} />}
        label={ADMIN_MESSAGES.STATS_RATING}
        value={formatRating(stats.averageRating)}
        color="yellow"
      />
      <StatCard
        icon={<IconChartBar size="1.25rem" stroke={1.5} />}
        label={ADMIN_MESSAGES.STATS_OCCUPANCY}
        value={`${stats.occupancyPercent}%`}
        color="cyan"
      />
    </SimpleGrid>
  );
});
