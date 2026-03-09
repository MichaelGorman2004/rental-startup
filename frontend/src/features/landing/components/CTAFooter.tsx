import {
  Box, Container, Stack, Title, Text, Button, Group,
} from '@mantine/core';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { CTA_FOOTER } from '../constants/landing.constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import classes from './CTAFooter.module.css';

function FooterBrand() {
  return (
    <Text size="sm" c="dimmed" mt="xl">
      &copy; 2026 VENUE
      <Text span c="copper.4" fw={700}>LINK</Text>
    </Text>
  );
}

/** Final call-to-action section with signup button and logo. */
export function CTAFooter() {
  const { isVisible, ref } = useScrollAnimation();

  return (
    <Box className={classes['wrapper']} ref={ref}>
      <Box className={classes['glow']} />
      <Container size="sm" className={classes['content']}>
        <Stack
          align="center"
          gap="lg"
          py={80}
          data-visible={isVisible || undefined}
          className={classes['inner']}
        >
          <Title order={2} ta="center">{CTA_FOOTER.HEADLINE}</Title>
          <Text c="dimmed" ta="center" maw={440} lh={1.7}>
            {CTA_FOOTER.SUBTITLE}
          </Text>
          <Group>
            <Button
              component={Link}
              to="/signup"
              size="lg"
              rightSection={<ArrowRight size="1.1rem" />}
              aria-label={CTA_FOOTER.CTA}
            >
              {CTA_FOOTER.CTA}
            </Button>
          </Group>
          <FooterBrand />
        </Stack>
      </Container>
    </Box>
  );
}
