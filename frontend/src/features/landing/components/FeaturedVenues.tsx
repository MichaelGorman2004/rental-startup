import { useMemo } from 'react';
import {
  Container, Stack, Title, Text, SimpleGrid, Button, Group,
} from '@mantine/core';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { VenueCard } from '../../venues/components/VenueCard';
import { MOCK_VENUES } from '../../venues/constants/mock-venues';
import { FEATURED } from '../constants/landing.constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import classes from './FeaturedVenues.module.css';

const FEATURED_COUNT = 4;

/** Showcase of venue cards using mock data, linking to demo browse. */
export function FeaturedVenues() {
  const { isVisible, ref } = useScrollAnimation();
  const venues = useMemo(() => MOCK_VENUES.slice(0, FEATURED_COUNT), []);

  return (
    <Container size="lg" py={80} ref={ref}>
      <Stack gap="xl" className={isVisible ? classes['visible'] : classes['hidden']}>
        <Stack gap="xs" align="center">
          <Title order={2} ta="center">{FEATURED.TITLE}</Title>
          <Text c="dimmed" ta="center" maw={480}>{FEATURED.SUBTITLE}</Text>
        </Stack>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} basePath="/demo/venues" />
          ))}
        </SimpleGrid>
        <Group justify="center">
          <Button
            component={Link}
            to="/demo/venues"
            variant="subtle"
            rightSection={<ArrowRight size={16} />}
            aria-label={FEATURED.CTA}
          >
            {FEATURED.CTA}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
