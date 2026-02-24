import { useUser } from '@clerk/clerk-react';
import { useMemo } from 'react';
import { OrganizationType, isOrganizationType } from '@venuelink/shared';
import type { OrganizationData } from '../types/dashboard.types';

interface UseOrganizationReturn {
  organization: OrganizationData | null;
  isLoading: boolean;
}

/**
 * Hook to access organization data from Clerk user metadata.
 * Organization info is stored in publicMetadata during signup.
 */
export function useOrganization(): UseOrganizationReturn {
  const { user, isLoaded } = useUser();

  const organization = useMemo((): OrganizationData | null => {
    if (!user?.publicMetadata) return null;

    const metadata = user.publicMetadata as Record<string, unknown>;
    const orgName = metadata['org_name'] ?? metadata['orgName'];

    if (!orgName) return null;

    const rawType = metadata['org_type'];
    const orgType = isOrganizationType(rawType) ? rawType : OrganizationType.Club;

    return {
      id: (metadata['org_id'] as string) ?? '',
      name: orgName as string,
      type: orgType,
      university: (metadata['university'] as string) ?? '',
    };
  }, [user?.publicMetadata]);

  return { organization, isLoading: !isLoaded };
}
