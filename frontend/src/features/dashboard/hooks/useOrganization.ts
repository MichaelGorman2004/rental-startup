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

    const {
      orgName, org_type: rawType, org_id: orgId, university,
    } = user.publicMetadata;

    if (!orgName) return null;

    const orgType = isOrganizationType(rawType) ? rawType : OrganizationType.Club;

    return {
      id: String(orgId ?? ''),
      name: String(orgName),
      type: orgType,
      university: String(university ?? ''),
    };
  }, [user?.publicMetadata]);

  return { organization, isLoading: !isLoaded };
}
