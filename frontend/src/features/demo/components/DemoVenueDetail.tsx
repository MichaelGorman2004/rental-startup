import { useCallback } from 'react';
import {
  Stack, Container, Card, Button, Text,
} from '@mantine/core';
import { SignIn } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs/Breadcrumbs';
import { VenueHero } from '../../venues/components/VenueHero';
import { VenueInfo } from '../../venues/components/VenueInfo';
import { VenueAddress } from '../../venues/components/VenueAddress';
import { VenueNotFound } from '../../venues/components/VenueNotFound';
import { LandingHeader } from '../../landing/components/LandingHeader';
import { DEMO_MESSAGES } from '../constants/demo.constants';
import { useDemoVenueDetail } from '../hooks/useDemoVenueDetail';

/** CTA card prompting signup instead of booking. */
function DemoBookingCTA() {
  const navigate = useNavigate();

  const handleSignup = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  return (
    <Card withBorder>
      <Stack gap="md" align="center">
        <Text size="sm" c="dimmed" ta="center">{DEMO_MESSAGES.SIGNUP_PROMPT}</Text>
        <Button
          size="lg"
          fullWidth
          leftSection={<SignIn size="1.25rem" />}
          onClick={handleSignup}
          aria-label="Sign up to book"
        >
          Sign Up to Book
        </Button>
      </Stack>
    </Card>
  );
}

/** Public demo venue detail — reuses real venue components with mock data. */
export function DemoVenueDetail() {
  const { venue, breadcrumbs } = useDemoVenueDetail();

  if (!venue) {
    return (
      <>
        <LandingHeader />
        <Container size="md" py="xl" mt={64}><VenueNotFound /></Container>
      </>
    );
  }

  return (
    <>
      <LandingHeader />
      <Container size="md" py="xl" mt={64}>
        <Stack gap="lg">
          <Breadcrumbs items={breadcrumbs} />
          <VenueHero name={venue.name} venueType={venue.type} />
          <VenueInfo capacity={venue.capacity} basePriceCents={venue.basePriceCents} />
          <VenueAddress
            street={venue.addressStreet}
            city={venue.addressCity}
            state={venue.addressState}
            zip={venue.addressZip}
          />
          <DemoBookingCTA />
        </Stack>
      </Container>
    </>
  );
}
