import { Text, Progress, Stack } from '@mantine/core';

import { SETTINGS_MESSAGES } from '../constants/settings-defaults';

interface ProfileCompletenessNoteProps {
  completeness: {
    percentage: number;
    filledCount: number;
    totalCount: number;
  };
}

/** Displays a simple profile completeness indicator with progress bar. */
export function ProfileCompletenessNote({ completeness }: ProfileCompletenessNoteProps) {
  const { percentage, filledCount, totalCount } = completeness;

  const message = SETTINGS_MESSAGES.PROFILE_COMPLETENESS
    .replace('{percentage}', String(percentage))
    .replace('{filled}', String(filledCount))
    .replace('{total}', String(totalCount));

  return (
    <Stack gap="xs">
      <Text size="sm" c="dimmed">{message}</Text>
      <Progress
        value={percentage}
        size="sm"
        color={percentage === 100 ? 'green' : 'copper'}
        aria-label="Profile completeness"
      />
    </Stack>
  );
}
