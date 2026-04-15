import type { ReactNode } from 'react';
import { Center, Loader } from '@mantine/core';
import { useUser } from '@clerk/clerk-react';
import { useMyVenue } from '../hooks/useMyVenue';
import { VenueSetupPage } from './VenueSetupPage';

interface GateProps {
  children: ReactNode;
}

function getUserRole(user: ReturnType<typeof useUser>['user']): string | undefined {
  const meta = user?.publicMetadata as Record<string, string> | undefined;
  return meta?.['role'];
}

/** Inner gate — only mounted for venue_admin users. Checks venue existence. */
function VenueAdminGate({ children }: GateProps) {
  const { venue, isLoading, isNotFound } = useMyVenue();

  if (isLoading) {
    return (
      <Center mih="100vh">
        <Loader aria-label="Loading" />
      </Center>
    );
  }

  if (isNotFound || !venue) return <VenueSetupPage />;

  return children;
}

/**
 * Intercepts venue_admin users who have not yet created a venue.
 * Forces them through the venue setup flow before accessing any app content.
 * Non-venue-admin users (e.g. student_org) pass through without a query.
 */
export function VenueSetupGate({ children }: GateProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <Center mih="100vh">
        <Loader aria-label="Loading" />
      </Center>
    );
  }

  if (getUserRole(user) !== 'venue_admin') {
    return children;
  }

  return <VenueAdminGate>{children}</VenueAdminGate>;
}
