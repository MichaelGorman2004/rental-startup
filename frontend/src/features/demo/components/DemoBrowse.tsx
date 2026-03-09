import {
  Stack, Title, Text, Container, SimpleGrid,
} from '@mantine/core';
import { VenueCard } from '../../venues/components/VenueCard';
import { VenueFilters } from '../../venues/components/VenueFilters';
import { DEMO_MESSAGES } from '../constants/demo.constants';
import { useDemoVenues } from '../hooks/useDemoVenues';
import { LandingHeader } from '../../landing/components/LandingHeader';
import classes from './DemoBrowse.module.css';

/** Public demo browse page — no auth required. */
export function DemoBrowse() {
  const { venues, activeType, handleTypeChange } = useDemoVenues();

  return (
    <>
      <LandingHeader />
      <Container size="lg" py="xl" mt={64}>
        <Stack gap="lg" className={classes['pageEnter']}>
          <Stack gap="xs">
            <Title order={2}>{DEMO_MESSAGES.BROWSE_TITLE}</Title>
            <Text c="dimmed">{DEMO_MESSAGES.BROWSE_SUBTITLE}</Text>
          </Stack>
          <VenueFilters activeType={activeType} onTypeChange={handleTypeChange} />
          {venues.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">No venues match this filter.</Text>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} basePath="/demo/venues" />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </>
  );
}
