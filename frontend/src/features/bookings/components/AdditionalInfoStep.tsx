import { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Stack, Textarea, Select } from '@mantine/core';
import { Notepad, Wallet } from '@phosphor-icons/react';
import type { BookingFormValues } from '../types';
import {
  BOOKING_MESSAGES, BUDGET_OPTIONS, MAX_SPECIAL_REQUESTS_LENGTH,
} from '../constants';

interface AdditionalInfoStepProps {
  control: Control<BookingFormValues>;
}

/** Step 2: Optional details — special requests and budget range. */
export const AdditionalInfoStep = memo(({ control }: AdditionalInfoStepProps) => (
  <Stack gap="md">
    <Controller
      name="specialRequests"
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          label={BOOKING_MESSAGES.SPECIAL_REQUESTS_LABEL}
          placeholder={BOOKING_MESSAGES.SPECIAL_REQUESTS_PLACEHOLDER}
          description={BOOKING_MESSAGES.SPECIAL_REQUESTS_DESCRIPTION}
          leftSection={<Notepad size="1rem" />}
          maxLength={MAX_SPECIAL_REQUESTS_LENGTH}
          minRows={4}
          autosize
        />
      )}
    />
    <Controller
      name="budgetCents"
      control={control}
      render={({ field }) => (
        <Select
          value={field.value?.toString() ?? null}
          onChange={(val) => field.onChange(val ? parseInt(val, 10) : null)}
          label={BOOKING_MESSAGES.BUDGET_LABEL}
          placeholder={BOOKING_MESSAGES.BUDGET_PLACEHOLDER}
          description={BOOKING_MESSAGES.BUDGET_DESCRIPTION}
          leftSection={<Wallet size="1rem" />}
          data={[...BUDGET_OPTIONS]}
          clearable
        />
      )}
    />
  </Stack>
));
