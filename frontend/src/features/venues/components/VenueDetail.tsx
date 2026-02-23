import { useMemo } from 'react';
import { Stack, Container } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs/Breadcrumbs';
import type { BreadcrumbItem } from '../../../components/ui/Breadcrumbs/Breadcrumbs.types';
import { VENUE_DETAIL_MESSAGES } from '../constants/venue-defaults';
import { useVenueDetail } from '../hooks/useVenueDetail';
import { VenueHero } from './VenueHero';
import { VenueInfo } from './VenueInfo';
import { VenueAddress } from './VenueAddress';
import { BookingCTA } from './BookingCTA';
import { VenueDetailSkeleton } from './VenueDetailSkeleton';
import { VenueNotFound } from './VenueNotFound';
import { VenueErrorState } from './VenueErrorState';

/** Build breadcrumb items for the venue detail page. */
function buildBreadcrumbs(venueName: string | undefined): BreadcrumbItem[] {
  return [
    { label: VENUE_DETAIL_MESSAGES.BREADCRUMB_HOME, href: '/' },
    { label: VENUE_DETAIL_MESSAGES.BREADCRUMB_VENUES, href: '/venues' },
    { label: venueName ?? '...' },
  ];
}

/** Venue detail page composing hero, info, address, and booking CTA. */
export function VenueDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const { user } = useUser();
  const {
    venue, isLoading, isError, isNotFound, refetch,
  } = useVenueDetail(id);

  const isStudentOrg = user?.unsafeMetadata?.['role'] === 'student_org';
  const breadcrumbs = useMemo(() => buildBreadcrumbs(venue?.name), [venue?.name]);

  if (isError) return <Container size="md" py="xl"><VenueErrorState onRetry={refetch} /></Container>;
  if (isNotFound) return <Container size="md" py="xl"><VenueNotFound /></Container>;

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Breadcrumbs items={breadcrumbs} />
        {isLoading || !venue ? <VenueDetailSkeleton /> : (
          <>
            <VenueHero name={venue.name} venueType={venue.type} />
            <VenueInfo capacity={venue.capacity} basePriceCents={venue.basePriceCents} />
            <VenueAddress
              street={venue.addressStreet}
              city={venue.addressCity}
              state={venue.addressState}
              zip={venue.addressZip}
            />
            <BookingCTA venueId={venue.id} isStudentOrg={isStudentOrg} />
          </>
        )}
      </Stack>
    </Container>
  );
}
