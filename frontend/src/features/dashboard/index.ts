// Components
export { DashboardPage } from './components/DashboardPage';
export { OrgDashboardContent } from './components/OrgDashboardContent';

// Hooks
export { useUpcomingEvents } from './hooks/useUpcomingEvents';
export { useOrganization } from './hooks/useOrganization';
export { useDashboardStats } from './hooks/useDashboardStats';
export { useUserRole } from './hooks/useUserRole';

// Types
export type {
  UpcomingEvent,
  QuickAction,
  OrganizationData,
  UserRole,
} from './types/dashboard.types';
