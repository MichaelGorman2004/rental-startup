import {
  MagnifyingGlass,
  CalendarBlank,
  GearSix,
  ClipboardText,
  Storefront,
  CalendarCheck,
} from '@phosphor-icons/react';
import type { QuickAction } from '../types/dashboard.types';

/**
 * Quick actions for student org users.
 * Browse Venues, My Bookings, Settings (no dead Budget link).
 */
export const ORG_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'browse-venues',
    title: 'Browse Venues',
    description: 'Find the perfect space',
    route: '/venues',
    icon: MagnifyingGlass,
    color: 'copper',
  },
  {
    id: 'my-bookings',
    title: 'My Bookings',
    description: 'View & manage reservations',
    route: '/bookings',
    icon: CalendarBlank,
    color: 'copper',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Account & preferences',
    route: '/settings',
    icon: GearSix,
    color: 'copper',
  },
];

/**
 * Quick actions for venue admin users.
 * Manage Bookings, Venue Profile, Calendar, Settings.
 */
export const VENUE_ADMIN_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'manage-bookings',
    title: 'Manage Bookings',
    description: 'Review booking requests',
    route: '/venue-admin',
    icon: ClipboardText,
    color: 'copper',
  },
  {
    id: 'venue-profile',
    title: 'Venue Profile',
    description: 'Edit venue details',
    route: '/venue-admin/profile',
    icon: Storefront,
    color: 'copper',
  },
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'View booking calendar',
    route: '/venue-admin/calendar',
    icon: CalendarCheck,
    color: 'copper',
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Account & preferences',
    route: '/settings',
    icon: GearSix,
    color: 'copper',
  },
];

/** @deprecated Use ORG_QUICK_ACTIONS or VENUE_ADMIN_QUICK_ACTIONS instead. */
export const QUICK_ACTIONS: QuickAction[] = ORG_QUICK_ACTIONS;
