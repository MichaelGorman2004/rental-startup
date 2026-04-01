import { type ReactNode } from 'react';

import {
  Popover, Text, Button, Stack, Box,
} from '@mantine/core';

import { useOnboardingTooltip } from '../hooks/useOnboardingTooltip';
import { ONBOARDING_MESSAGES } from '../constants/onboarding.constants';

interface OnboardingTooltipProps {
  storageKey: string;
  message: string;
  role: string;
  children: ReactNode;
}

/** Reusable onboarding popover that shows once per role, dismissed via localStorage. */
export function OnboardingTooltip({
  storageKey,
  message,
  role,
  children,
}: OnboardingTooltipProps) {
  const { visible, dismiss } = useOnboardingTooltip({ storageKey, role });

  return (
    <Popover
      opened={visible}
      position="right"
      withArrow
      shadow="md"
      width={260}
    >
      <Popover.Target>
        <Box onClick={dismiss}>{children}</Box>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          <Text size="sm">{message}</Text>
          <Button
            size="xs"
            variant="light"
            onClick={dismiss}
            aria-label={ONBOARDING_MESSAGES.DISMISS_BUTTON}
          >
            {ONBOARDING_MESSAGES.DISMISS_BUTTON}
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
