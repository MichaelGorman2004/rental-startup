import { Box } from '@mantine/core';
import { LandingHeader } from './LandingHeader';
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { FeaturedVenues } from './FeaturedVenues';
import { ValueProps } from './ValueProps';
import { CTAFooter } from './CTAFooter';

/** Public landing page — visible to unauthenticated users at /. */
export function LandingPage() {
  return (
    <Box bg="var(--vl-bg-deep)">
      <LandingHeader />
      <HeroSection />
      <HowItWorks />
      <FeaturedVenues />
      <ValueProps />
      <CTAFooter />
    </Box>
  );
}
