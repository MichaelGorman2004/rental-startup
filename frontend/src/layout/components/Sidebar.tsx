import { useCallback, useMemo, type ReactNode } from 'react';
import { Stack, NavLink } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
  SquaresFour, Buildings, CalendarBlank, GearSix,
  ChartBar,
} from '@phosphor-icons/react';

import {
  OnboardingTooltip,
  ONBOARDING_STORAGE_KEYS,
  ONBOARDING_MESSAGES,
  ONBOARDING_ROLES,
} from '@/features/onboarding';
import classes from './Sidebar.module.css';

interface NavItem {
  label: string;
  icon: typeof SquaresFour;
  route: string;
  roles?: readonly string[];
}

/** Navigation items with optional role restrictions. */
const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Dashboard', icon: SquaresFour, route: '/' },
  {
    label: 'Venues', icon: Buildings, route: '/venues', roles: ['student_org'],
  },
  {
    label: 'Bookings', icon: CalendarBlank, route: '/bookings', roles: ['student_org'],
  },
  {
    label: 'Venue Admin', icon: ChartBar, route: '/admin', roles: ['venue_admin'],
  },
  { label: 'Settings', icon: GearSix, route: '/settings' },
];

/** Settings nav link wrapper with role-specific onboarding tooltip. */
function SettingsOnboardingWrapper({ children }: { children: ReactNode }) {
  return (
    <OnboardingTooltip
      storageKey={ONBOARDING_STORAGE_KEYS.VENUE_DISMISSED}
      message={ONBOARDING_MESSAGES.VENUE_ADMIN}
      role={ONBOARDING_ROLES.VENUE_ADMIN}
    >
      <OnboardingTooltip
        storageKey={ONBOARDING_STORAGE_KEYS.ORG_DISMISSED}
        message={ONBOARDING_MESSAGES.STUDENT_ORG}
        role={ONBOARDING_ROLES.STUDENT_ORG}
      >
        {children}
      </OnboardingTooltip>
    </OnboardingTooltip>
  );
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const userRole = (user?.publicMetadata as Record<string, string> | undefined)?.['role'];

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
    <Stack gap={0} p="sm" className={classes['wrapper']}>
      {visibleItems.map((item) => {
        const navLink = (
          <NavLink
            key={item.route}
            label={item.label}
            leftSection={<item.icon size="1.125rem" />}
            active={item.route === '/' ? location.pathname === '/' : location.pathname.startsWith(item.route)}
            onClick={handleNavClick(item.route)}
            classNames={{ root: classes['link'], label: classes['linkLabel'] }}
          />
        );

        if (item.route === '/settings') {
          return (
            <SettingsOnboardingWrapper key={item.route}>
              {navLink}
            </SettingsOnboardingWrapper>
          );
        }

        return navLink;
      })}
    </Stack>
  );
}
