import { useMemo } from 'react';

import type { OrganizationProfile } from '@/features/organization';
import { PROFILE_COMPLETENESS_FIELDS } from '../constants/settings-defaults';

interface ProfileCompletenessReturn {
  percentage: number;
  filledCount: number;
  totalCount: number;
}

/** Calculates profile completeness based on filled optional fields. */
export function useProfileCompleteness(
  organization: OrganizationProfile | undefined,
): ProfileCompletenessReturn {
  return useMemo(() => {
    if (!organization) {
      return { percentage: 0, filledCount: 0, totalCount: PROFILE_COMPLETENESS_FIELDS.length };
    }

    const filledCount = PROFILE_COMPLETENESS_FIELDS.filter((field) => {
      const value = organization[field];
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      return true;
    }).length;

    const totalCount = PROFILE_COMPLETENESS_FIELDS.length;
    const percentage = Math.round((filledCount / totalCount) * 100);

    return { percentage, filledCount, totalCount };
  }, [organization]);
}
