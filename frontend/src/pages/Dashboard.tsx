import { Container, Stack, Title, Text } from '@mantine/core';
import { QuickActionsGrid, UpcomingEvents } from '../features/dashboard';

export function Dashboard() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title order={2}>Dashboard</Title>
          <Text c="dimmed">Manage your events and bookings</Text>
        </Stack>
        <QuickActionsGrid />
        <UpcomingEvents />
      </Stack>
    </Container>
  );
}
