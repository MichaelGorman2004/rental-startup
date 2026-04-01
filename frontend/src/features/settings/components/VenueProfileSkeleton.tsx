import { Stack, Skeleton } from '@mantine/core';

/** Height of a single-line input skeleton row. */
const FIELD_HEIGHT = 36;

/** Height of the multiline textarea skeleton row. */
const TEXTAREA_HEIGHT = 80;

/** Loading skeleton for the venue profile form. */
export function VenueProfileSkeleton() {
  return (
    <Stack gap="md">
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={TEXTAREA_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
      <Skeleton height={FIELD_HEIGHT} />
    </Stack>
  );
}
