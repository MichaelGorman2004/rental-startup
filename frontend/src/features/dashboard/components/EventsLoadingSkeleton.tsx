import { memo } from 'react';
import { Stack, Skeleton, Card } from '@mantine/core';
import { DASHBOARD_CONSTANTS } from '../constants/dashboard.constants';

/** Static skeleton IDs for stable React keys */
const SKELETON_IDS = ['skeleton-1', 'skeleton-2', 'skeleton-3'] as const;

export const EventsLoadingSkeleton = memo(() => (
  <Stack gap="md">
    {SKELETON_IDS.slice(0, DASHBOARD_CONSTANTS.SKELETON_COUNT).map((id) => (
      <Card key={id} withBorder>
        <Stack gap="xs">
          <Skeleton height={14} width="40%" />
          <Skeleton height={20} width="70%" />
          <Skeleton height={14} width="50%" />
        </Stack>
      </Card>
    ))}
  </Stack>
));
