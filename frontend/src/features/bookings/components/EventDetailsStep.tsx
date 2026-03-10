import { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import {
  Stack, TextInput, NumberInput, Group,
} from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { Calendar, Clock, Users } from '@phosphor-icons/react';
import type { BookingFormValues } from '../types';
import { BOOKING_MESSAGES, MIN_GROUP_SIZE } from '../constants';
import { getMinBookingDate, getMaxBookingDate } from '../utils';

interface EventDetailsStepProps {
  control: Control<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  maxCapacity: number;
}

/** Step 1: Core event details — name, date, time, guest count. */
export const EventDetailsStep = memo(({ control, errors, maxCapacity }: EventDetailsStepProps) => (
  <Stack gap="md">
    <Controller
      name="eventName"
      control={control}
      render={({ field }) => (
        <TextInput
          {...field}
          label={BOOKING_MESSAGES.EVENT_NAME_LABEL}
          placeholder={BOOKING_MESSAGES.EVENT_NAME_PLACEHOLDER}
          description={BOOKING_MESSAGES.EVENT_NAME_DESCRIPTION}
          error={errors.eventName?.message}
          withAsterisk
        />
      )}
    />
    <Controller
      name="eventDate"
      control={control}
      render={({ field }) => (
        <DatePickerInput
          value={field.value}
          onChange={field.onChange}
          label={BOOKING_MESSAGES.EVENT_DATE_LABEL}
          description={BOOKING_MESSAGES.EVENT_DATE_DESCRIPTION}
          placeholder={BOOKING_MESSAGES.EVENT_DATE_PLACEHOLDER}
          leftSection={<Calendar size="1rem" />}
          minDate={getMinBookingDate()}
          maxDate={getMaxBookingDate()}
          error={errors.eventDate?.message}
          withAsterisk
        />
      )}
    />
    <Group grow>
      <Controller
        name="eventStartTime"
        control={control}
        render={({ field }) => (
          <TimeInput
            value={field.value}
            onChange={(e) => field.onChange(e.currentTarget.value)}
            label={BOOKING_MESSAGES.EVENT_START_TIME_LABEL}
            description={BOOKING_MESSAGES.EVENT_START_TIME_DESCRIPTION}
            leftSection={<Clock size="1rem" />}
            error={errors.eventStartTime?.message}
            withAsterisk
          />
        )}
      />
      <Controller
        name="eventEndTime"
        control={control}
        render={({ field }) => (
          <TimeInput
            value={field.value}
            onChange={(e) => field.onChange(e.currentTarget.value)}
            label={BOOKING_MESSAGES.EVENT_END_TIME_LABEL}
            description={BOOKING_MESSAGES.EVENT_END_TIME_DESCRIPTION}
            leftSection={<Clock size="1rem" />}
            error={errors.eventEndTime?.message}
            withAsterisk
          />
        )}
      />
    </Group>
    <Controller
      name="guestCount"
      control={control}
      render={({ field }) => (
        <NumberInput
          value={field.value ?? ''}
          onChange={(val) => {
            if (val === '') {
              field.onChange(undefined);
              return;
            }
            const numericValue = typeof val === 'number' ? val : Number(val);
            field.onChange(Number.isNaN(numericValue) ? undefined : numericValue);
          }}
          label={BOOKING_MESSAGES.GUEST_COUNT_LABEL}
          description={`${MIN_GROUP_SIZE} – ${maxCapacity} guests`}
          leftSection={<Users size="1rem" />}
          min={MIN_GROUP_SIZE}
          max={maxCapacity}
          error={errors.guestCount?.message}
          withAsterisk
        />
      )}
    />
  </Stack>
));
