import { memo } from 'react';
import {
  Card, Skeleton, Stack, Group,
} from '@mantine/core';
import { CARD_GRADIENT_HEIGHT, SKELETON_COUNT } from '../constants/venue-defaults';

/** Single skeleton placeholder matching VenueCard layout. */
const SingleSkeleton = memo(() => (
  <Card withBorder>
    <Skeleton h={CARD_GRADIENT_HEIGHT} radius="sm" mb="md" />
    <Stack gap="sm">
      <Group justify="space-between">
        <Skeleton h={20} w="60%" radius="sm" />
        <Skeleton h={20} w={70} radius="sm" />
      </Group>
      <Group gap="lg">
        <Skeleton h={16} w={100} radius="sm" />
        <Skeleton h={16} w={80} radius="sm" />
      </Group>
      <Skeleton h={16} w="80%" radius="sm" />
    </Stack>
  </Card>
));

/** Grid of skeleton cards shown during venue loading state. */
export const VenueCardSkeleton = memo(() => (
  <>
    {Array.from({ length: SKELETON_COUNT }, (_, index) => (
      <SingleSkeleton key={`venue-skeleton-${String(index)}`} />
    ))}
  </>
));
