import { Stack, Skeleton } from '@mantine/core';

/** Loading skeleton for the venue profile form. */
export function VenueProfileSkeleton() {
  return (
    <Stack gap="md">
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={80} />
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
      <Skeleton height={36} />
    </Stack>
  );
}
