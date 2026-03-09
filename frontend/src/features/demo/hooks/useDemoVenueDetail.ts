import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_VENUES } from '../../venues/constants/mock-venues';
import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs/Breadcrumbs.types';
import { DEMO_MESSAGES } from '../constants/demo.constants';

/** Build breadcrumb trail for demo venue detail. */
function buildBreadcrumbs(venueName: string | undefined): BreadcrumbItem[] {
  return [
    { label: DEMO_MESSAGES.BREADCRUMB_HOME, href: '/' },
    { label: DEMO_MESSAGES.BREADCRUMB_VENUES, href: '/demo/venues' },
    { label: venueName ?? '...' },
  ];
}

/**
 * Provides a single venue from mock data for the demo detail page.
 * No auth, no API — pure lookup by route param.
 */
export function useDemoVenueDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const venue = useMemo(() => MOCK_VENUES.find((v) => v.id === id) ?? null, [id]);
  const breadcrumbs = useMemo(() => buildBreadcrumbs(venue?.name), [venue?.name]);

  return { venue, breadcrumbs };
}
