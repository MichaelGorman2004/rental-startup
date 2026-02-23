import { memo } from 'react';
import {
  Stack, Skeleton, SimpleGrid, Card,
} from '@mantine/core';
import { HERO_GRADIENT_HEIGHT } from '../constants/venue-defaults';

/** Loading skeleton matching VenueDetail layout structure. */
export const VenueDetailSkeleton = memo(() => (
  <Stack gap="lg">
    <Skeleton h={HERO_GRADIENT_HEIGHT} radius="md" />
    <Skeleton h={28} w="60%" radius="sm" />
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <Card withBorder><Skeleton h={50} radius="sm" /></Card>
      <Card withBorder><Skeleton h={50} radius="sm" /></Card>
    </SimpleGrid>
    <Card withBorder><Skeleton h={60} radius="sm" /></Card>
    <Card withBorder><Skeleton h={100} radius="sm" /></Card>
  </Stack>
));
