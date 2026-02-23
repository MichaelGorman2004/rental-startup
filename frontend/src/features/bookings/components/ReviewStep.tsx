import { memo } from 'react';
import { Stack } from '@mantine/core';
import type { Venue } from '../../venues';
import type { BookingFormValues } from '../types';
import { BookingSummary } from './BookingSummary';

interface ReviewStepProps {
  formValues: BookingFormValues;
  venue: Venue;
  estimatedCostCents: number;
}

/** Step 3: Review all booking details before submission. */
export const ReviewStep = memo(({ formValues, venue, estimatedCostCents }: ReviewStepProps) => (
  <Stack gap="md">
    <BookingSummary
      formValues={formValues}
      venue={venue}
      estimatedCostCents={estimatedCostCents}
    />
  </Stack>
));
