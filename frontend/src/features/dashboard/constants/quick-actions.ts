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
    route: '/venues',
    icon: MagnifyingGlass,
    color: 'flame',
  },
  {
    id: 'my-bookings',
    title: 'My Bookings',
    route: '/bookings',
    icon: CalendarBlank,
    color: 'green',
  },
  {
    id: 'budget-tracker',
    title: 'Budget Tracker',
    route: '/budget',
    icon: CreditCard,
    color: 'orange',
  },
  {
    id: 'settings',
    title: 'Settings',
    route: '/settings',
    icon: GearSix,
    color: 'gray',
  },
];
