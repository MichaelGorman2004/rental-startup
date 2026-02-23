import { Stack, Container } from '@mantine/core';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs/Breadcrumbs';
import { useVenueDetailPage } from '../hooks/useVenueDetailPage';
import { VenueHero } from './VenueHero';
import { VenueInfo } from './VenueInfo';
import { VenueAddress } from './VenueAddress';
import { BookingCTA } from './BookingCTA';
import { VenueDetailSkeleton } from './VenueDetailSkeleton';
import { VenueNotFound } from './VenueNotFound';
import { VenueErrorState } from './VenueErrorState';

/** Venue detail page composing hero, info, address, and booking CTA. */
export function VenueDetail() {
  const {
    venue, isLoading, isError, isNotFound, isStudentOrg, breadcrumbs, refetch,
  } = useVenueDetailPage();

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
