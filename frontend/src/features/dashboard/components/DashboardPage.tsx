import {
  Stack, Title, Text, Container,
} from '@mantine/core';
import { QuickActionsGrid } from './QuickActionsGrid';
import { UpcomingEvents } from './UpcomingEvents';

export function DashboardPage() {
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
