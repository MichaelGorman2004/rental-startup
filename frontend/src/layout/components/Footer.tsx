import { Group, Text, Anchor } from '@mantine/core';

export function Footer() {
  return (
    <Group justify="space-between" px="md" py="xs" bg="gray.0">
      <Text size="xs" c="dimmed">© 2026 VenueLink. All rights reserved.</Text>
      <Anchor size="xs" c="dimmed" href="#">Terms of Service</Anchor>
    </Group>
  );
}
