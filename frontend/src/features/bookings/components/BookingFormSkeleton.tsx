import {
  Stack, Skeleton, Group, Card,
} from '@mantine/core';

/** Loading skeleton for the booking form page. */
export function BookingFormSkeleton() {
  return (
    <Stack gap="lg">
      <Skeleton height={14} width={200} />
      <Card withBorder p="lg">
        <Stack gap="md">
          <Group>
            <Skeleton height={32} circle />
            <Skeleton height={32} circle />
            <Skeleton height={32} circle />
          </Group>
          <Skeleton height={36} />
          <Skeleton height={36} />
          <Skeleton height={36} />
          <Skeleton height={36} />
        </Stack>
      </Card>
    </Stack>
  );
}
