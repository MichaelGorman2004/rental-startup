import { useMemo, useCallback } from 'react';
import {
  Group, Burger, Text, UnstyledButton,
} from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useLayout } from '../hooks/useLayout';
import { HeaderUserMenu } from './HeaderUserMenu';
import classes from './Header.module.css';

interface NavItem {
  label: string;
  route: string;
  roles?: readonly string[];
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Dashboard', route: '/' },
  { label: 'Venues', route: '/venues', roles: ['student_org'] },
  { label: 'Bookings', route: '/bookings', roles: ['student_org'] },
  { label: 'Admin', route: '/admin', roles: ['venue_admin'] },
  { label: 'Settings', route: '/settings' },
];

export function Header() {
  const { sidebarOpen, toggleSidebar } = useLayout();
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = (user?.publicMetadata as Record<string, string> | undefined)?.['role'];

  const visibleItems = useMemo(
    () => NAV_ITEMS.filter(
      (item) => !item.roles || (userRole && item.roles.includes(userRole)),
    ),
    [userRole],
  );

  const handleNav = useCallback(
    (route: string) => () => navigate(route),
    [navigate],
  );

  const isActive = useCallback(
    (route: string) => (route === '/' ? location.pathname === '/' : location.pathname.startsWith(route)),
    [location.pathname],
  );

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group gap="lg">
        <Burger opened={sidebarOpen} onClick={toggleSidebar} hiddenFrom="sm" size="sm" />
        <Text fw={800} size="lg" className={classes['logo']}>
          VENUE
          <Text span className={classes['logoAccent']}>LINK</Text>
        </Text>

        <Group gap={0} visibleFrom="sm">
          {visibleItems.map((item) => (
            <UnstyledButton
              key={item.route}
              onClick={handleNav(item.route)}
              className={`${classes['navLink']} ${isActive(item.route) ? classes['navLinkActive'] : ''}`}
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </UnstyledButton>
          ))}
        </Group>
      </Group>
      <HeaderUserMenu />
    </Group>
  );
}
