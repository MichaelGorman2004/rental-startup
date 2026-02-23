import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { BookingFormValues, ValidatedBookingData } from '../types';
import {
  BOOKING_FORM_DEFAULTS,
  STEP_FIELDS,
  TOTAL_STEPS,
  MIN_EVENT_NAME_LENGTH,
  MAX_EVENT_NAME_LENGTH,
  MAX_SPECIAL_REQUESTS_LENGTH,
  MIN_GROUP_SIZE,
  BOOKING_MESSAGES,
} from '../constants';

/**
 * Create a Zod schema that accepts nullable form inputs but validates them as required.
 * Input types match BookingFormValues (Date | null, number | undefined).
 * After validation, outputs ValidatedBookingData (Date, number).
 */
function createBookingSchema(maxCapacity: number) {
  return z.object({
    eventName: z.string()
      .min(MIN_EVENT_NAME_LENGTH, BOOKING_MESSAGES.VALIDATION_EVENT_NAME_MIN)
      .max(MAX_EVENT_NAME_LENGTH, BOOKING_MESSAGES.VALIDATION_EVENT_NAME_MAX),
    eventDate: z.date().nullable().refine(
      (d): d is Date => d !== null,
      { message: BOOKING_MESSAGES.VALIDATION_DATE_REQUIRED },
    ),
    eventTime: z.string().min(1, BOOKING_MESSAGES.VALIDATION_TIME_REQUIRED),
    guestCount: z.number()
      .min(MIN_GROUP_SIZE, BOOKING_MESSAGES.VALIDATION_GUEST_COUNT_MIN)
      .max(maxCapacity, `Maximum ${maxCapacity} guests for this venue`)
      .optional()
      .refine(
        (n): n is number => n !== undefined,
        { message: BOOKING_MESSAGES.VALIDATION_GUEST_COUNT_REQUIRED },
      ),
    specialRequests: z.string().max(MAX_SPECIAL_REQUESTS_LENGTH).default(''),
    budgetCents: z.number().nullable().default(null),
  });
}

/**
 * Manages multi-step booking form state, validation, and stepper navigation.
 * Uses react-hook-form with Zod for per-step progressive validation.
 */
export function useBookingForm(maxCapacity: number) {
  const [activeStep, setActiveStep] = useState(0);

  const schema = useMemo(() => createBookingSchema(maxCapacity), [maxCapacity]);

  const form = useForm<BookingFormValues>({
    // @ts-expect-error zodResolver output type differs from
    // nullable form input type — safe at runtime
    resolver: zodResolver(schema),
    defaultValues: BOOKING_FORM_DEFAULTS,
    mode: 'onTouched',
  });

  const handleNext = useCallback(async () => {
    const fields = (STEP_FIELDS[activeStep] ?? []) as (keyof BookingFormValues)[];
    const isValid = fields.length === 0 || await form.trigger(fields);
    if (isValid) setActiveStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, [activeStep, form]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleFormSubmit = useCallback(
    (onValid: (data: ValidatedBookingData) => void) => form.handleSubmit(
      (data) => onValid(data as unknown as ValidatedBookingData),
    ),
    [form],
  );

  return {
    form,
    activeStep,
    handleNext,
    handleBack,
    handleFormSubmit,
    isFirstStep: activeStep === 0,
    isLastStep: activeStep === TOTAL_STEPS - 1,
  };
}
