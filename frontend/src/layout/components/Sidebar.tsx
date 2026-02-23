import { useCallback } from 'react';
import { Stack, NavLink } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IconDashboard, IconBuilding, IconCalendarEvent, IconSettings,
} from '@tabler/icons-react';

/** Navigation items for the sidebar. */
const NAV_ITEMS = [
  { label: 'Dashboard', icon: IconDashboard, route: '/' },
  { label: 'Venues', icon: IconBuilding, route: '/venues' },
  { label: 'Bookings', icon: IconCalendarEvent, route: '/bookings' },
  { label: 'Settings', icon: IconSettings, route: '/settings' },
] as const;

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = useCallback(
    (route: string) => () => navigate(route),
    [navigate],
  );

  return (
    <Stack gap="xs" p="md">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.route}
          label={item.label}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          active={item.route === '/' ? location.pathname === '/' : location.pathname.startsWith(item.route)}
          onClick={handleNavClick(item.route)}
        />
      ))}
    </Stack>
  );
}
