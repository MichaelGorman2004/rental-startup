import {
  Box, Stack, Title, Text, Group, Button,
} from '@mantine/core';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { HERO } from '../constants/landing.constants';
import { ParticleCanvas } from './ParticleCanvas';
import { ScrollIndicator } from './ScrollIndicator';
import classes from './HeroSection.module.css';

/** Full-viewport hero with particles, headline, and dual CTAs. */
export function HeroSection() {
  return (
    <Box className={classes['wrapper']}>
      <ParticleCanvas />
      <Box className={classes['glow']} />
      <Stack align="center" justify="center" className={classes['content']} gap="xl">
        <Stack align="center" gap="md" maw={720}>
          <Title order={1} ta="center" className={classes['headline']}>
            {HERO.HEADLINE}
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={560} lh={1.7}>
            {HERO.SUBTITLE}
          </Text>
        </Stack>
        <Group gap="md">
          <Button
            component={Link}
            to="/demo/venues"
            size="lg"
            rightSection={<ArrowRight size={18} />}
            aria-label={HERO.CTA_PRIMARY}
          >
            {HERO.CTA_PRIMARY}
          </Button>
          <Button
            component={Link}
            to="/signup"
            size="lg"
            variant="outline"
            aria-label={HERO.CTA_SECONDARY}
          >
            {HERO.CTA_SECONDARY}
          </Button>
        </Group>
      </Stack>
      <ScrollIndicator />
    </Box>
  );
}
