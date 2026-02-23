import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs/Breadcrumbs.types';
import { VENUE_DETAIL_MESSAGES } from '../constants/venue-defaults';
import { useVenueDetail } from './useVenueDetail';

/** Build breadcrumb items for the venue detail page. */
function buildBreadcrumbs(venueName: string | undefined): BreadcrumbItem[] {
  return [
    { label: VENUE_DETAIL_MESSAGES.BREADCRUMB_HOME, href: '/' },
    { label: VENUE_DETAIL_MESSAGES.BREADCRUMB_VENUES, href: '/venues' },
    { label: venueName ?? '...' },
  ];
}

/**
 * Orchestrates venue detail page state: route params, auth, data fetching, breadcrumbs.
 * Extracts all logic from VenueDetail component to keep it a pure render function.
 */
export function useVenueDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const { user } = useUser();
  const {
    venue, isLoading, isError, isNotFound, refetch,
  } = useVenueDetail(id);

  const isStudentOrg = user?.unsafeMetadata?.['role'] === 'student_org';
  const breadcrumbs = useMemo(() => buildBreadcrumbs(venue?.name), [venue?.name]);

  return {
    venue,
    isLoading,
    isError,
    isNotFound,
    isStudentOrg,
    breadcrumbs,
    refetch,
  };
}
