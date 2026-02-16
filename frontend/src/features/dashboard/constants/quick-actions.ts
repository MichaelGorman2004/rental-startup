import {
  IconSearch,
  IconCalendarEvent,
  IconCreditCard,
  IconSettings,
} from '@tabler/icons-react';
import type { QuickAction } from '../types/dashboard.types';

/**
 * Configuration for the quick actions grid on the dashboard.
 * Each action represents a primary navigation destination.
 */
export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'browse-venues',
    title: 'Browse Venues',
    route: '/venues',
    icon: IconSearch,
    color: 'blue',
  },
  {
    id: 'my-bookings',
    title: 'My Bookings',
    route: '/bookings',
    icon: IconCalendarEvent,
    color: 'green',
  },
  {
    id: 'budget-tracker',
    title: 'Budget Tracker',
    route: '/budget',
    icon: IconCreditCard,
    color: 'orange',
  },
  {
    id: 'settings',
    title: 'Settings',
    route: '/settings',
    icon: IconSettings,
    color: 'gray',
  },
];
