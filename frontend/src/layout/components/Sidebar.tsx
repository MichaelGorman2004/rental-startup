import { Stack, NavLink } from '@mantine/core';
import {
  IconDashboard, IconBuilding, IconCalendarEvent, IconSettings,
} from '@tabler/icons-react';

export function Sidebar() {
  return (
    <Stack gap="xs" p="md">
      <NavLink label="Dashboard" leftSection={<IconDashboard size="1rem" stroke={1.5} />} active />
      <NavLink label="Venues" leftSection={<IconBuilding size="1rem" stroke={1.5} />} />
      <NavLink label="Bookings" leftSection={<IconCalendarEvent size="1rem" stroke={1.5} />} />
      <NavLink label="Settings" leftSection={<IconSettings size="1rem" stroke={1.5} />} />
    </Stack>
  );
}
