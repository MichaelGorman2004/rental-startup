import {
  MagnifyingGlass,
  CalendarBlank,
  CreditCard,
  GearSix,
} from '@phosphor-icons/react';
import type { QuickAction } from '../types/dashboard.types';

/**
 * Configuration for the quick actions grid on the dashboard.
 * Each action represents a primary navigation destination.
 */
export const QUICK_ACTIONS: QuickAction[] = [
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
    id: 'budget-tracker',
    title: 'Budget Tracker',
    description: 'Monitor event spending',
    route: '/budget',
    icon: CreditCard,
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
