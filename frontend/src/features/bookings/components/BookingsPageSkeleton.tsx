import { Stack, Skeleton } from '@mantine/core';
import { BOOKINGS_PAGE_SKELETON_COUNT } from '../constants/bookings-page-defaults';

/** Loading skeleton for the bookings page. */
export function BookingsPageSkeleton() {
  return (
    <Stack gap="md">
      {Array.from({ length: BOOKINGS_PAGE_SKELETON_COUNT }, (_, i) => (
        <Skeleton key={i} height={120} radius="md" />
      ))}
    </Stack>
  );
}
