import { useCallback, useMemo } from 'react';
import { Stack, NavLink } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  IconDashboard, IconBuilding, IconCalendarEvent, IconSettings,
  IconChartBar,
} from '@tabler/icons-react';

interface NavItem {
  label: string;
  icon: typeof IconDashboard;
  route: string;
  roles?: readonly string[];
}

/** Navigation items with optional role restrictions. */
const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Dashboard', icon: IconDashboard, route: '/' },
  {
    label: 'Venues', icon: IconBuilding, route: '/venues', roles: ['student_org'],
  },
  { label: 'Bookings', icon: IconCalendarEvent, route: '/bookings' },
  {
    label: 'Venue Admin', icon: IconChartBar, route: '/admin', roles: ['venue_admin'],
  },
  { label: 'Settings', icon: IconSettings, route: '/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const userRole = user?.unsafeMetadata?.['role'] as string | undefined;

  const visibleItems = useMemo(
    () => NAV_ITEMS.filter(
      (item) => !item.roles || (userRole && item.roles.includes(userRole)),
    ),
    [userRole],
  );

  const handleNavClick = useCallback(
    (route: string) => () => navigate(route),
    [navigate],
  );

  return (
    <Stack gap="xs" p="md">
      {visibleItems.map((item) => (
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
