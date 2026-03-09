import { Stack, Text } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react';
import { HERO } from '../constants/landing.constants';
import classes from './ScrollIndicator.module.css';

/** Animated bounce arrow prompting user to scroll down. */
export function ScrollIndicator() {
  return (
    <Stack align="center" gap={4} className={classes['wrapper']}>
      <Text size="xs" c="dimmed" tt="uppercase" lts="0.08em">
        {HERO.SCROLL_LABEL}
      </Text>
      <CaretDown size={20} className={classes['arrow']} aria-hidden="true" />
    </Stack>
  );
}
