import type { Control } from 'react-hook-form';
import {
  Container, Stack, Grid, Title, Text,
  Stepper, Group, Button, Alert,
} from '@mantine/core';
import {
  ArrowLeft, ArrowRight, PaperPlaneTilt, WarningCircle,
} from '@phosphor-icons/react';
import { useBookingPage } from '../hooks';
import type { BookingFormValues } from '../types';
import {
  BOOKING_MESSAGES, BOOKING_STEP_LABELS, BOOKING_STEP_DESCRIPTIONS,
} from '../constants';
import { VenueErrorState } from '../../venues';
import { VenueSummaryCard } from './VenueSummaryCard';
import { EventDetailsStep } from './EventDetailsStep';
import { AdditionalInfoStep } from './AdditionalInfoStep';
import { ReviewStep } from './ReviewStep';
import { BookingSuccess } from './BookingSuccess';
import { BookingFormSkeleton } from './BookingFormSkeleton';
import { BookingNotFound } from './BookingNotFound';

/** Cast control to resolve react-hook-form generic variance. */
function castControl(
  control: unknown,
): Control<BookingFormValues> {
  return control as Control<BookingFormValues>;
}

/** Main booking form page with stepper wizard and venue summary sidebar. */
export function BookingForm() {
  const {
    venue, isLoading, isError, isNotFound, refetch,
    form, activeStep, handleNext, handleBack, isFirstStep, isLastStep,
    estimatedCostCents, isSubmitting, isSuccess, isBookingError, isConflict, resetBookingError,
    confirmation, handleSubmit,
  } = useBookingPage();

  if (isError) return <Container size="md" py="xl"><VenueErrorState onRetry={refetch} /></Container>;
  if (isNotFound) return <Container size="md" py="xl"><BookingNotFound /></Container>;
  if (isSuccess && confirmation) return <Container size="sm" py="xl"><BookingSuccess booking={confirmation} /></Container>;

  const control = castControl(form.control);
  const { errors } = form.formState;

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Stack gap="xs">
          <Title order={2}>{BOOKING_MESSAGES.PAGE_TITLE}</Title>
          <Text c="dimmed">{BOOKING_MESSAGES.PAGE_SUBTITLE}</Text>
        </Stack>

        {isLoading || !venue ? <BookingFormSkeleton /> : (
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="lg">
                {isConflict && (
                  <Alert
                    color="red"
                    icon={<WarningCircle size="1rem" />}
                    withCloseButton
                    onClose={resetBookingError}
                    aria-label="Booking conflict error"
                  >
                    {BOOKING_MESSAGES.CONFLICT_ERROR}
                  </Alert>
                )}

                {isBookingError && !isConflict && (
                  <Alert
                    color="red"
                    icon={<WarningCircle size="1rem" />}
                    withCloseButton
                    onClose={resetBookingError}
                    aria-label="Booking submission error"
                  >
                    {BOOKING_MESSAGES.SUBMIT_ERROR}
                  </Alert>
                )}

                <Stepper active={activeStep} size="sm">
                  {BOOKING_STEP_LABELS.map((label, index) => (
                    <Stepper.Step
                      key={label}
                      label={label}
                      description={BOOKING_STEP_DESCRIPTIONS[index]}
                    />
                  ))}
                </Stepper>

                {activeStep === 0 && (
                  <EventDetailsStep
                    control={control}
                    errors={errors}
                    maxCapacity={venue.capacity}
                  />
                )}
                {activeStep === 1 && <AdditionalInfoStep control={control} />}
                {activeStep === 2 && (
                  <ReviewStep
                    formValues={form.getValues()}
                    venue={venue}
                    estimatedCostCents={estimatedCostCents}
                  />
                )}

                <Group justify="space-between">
                  <Button
                    variant="subtle"
                    leftSection={<ArrowLeft size="1rem" />}
                    onClick={handleBack}
                    disabled={isFirstStep}
                  >
                    {BOOKING_MESSAGES.BACK}
                  </Button>

                  {isLastStep ? (
                    <Button
                      leftSection={<PaperPlaneTilt size="1rem" />}
                      onClick={handleSubmit}
                      loading={isSubmitting}
                    >
                      {BOOKING_MESSAGES.SUBMIT}
                    </Button>
                  ) : (
                    <Button
                      rightSection={<ArrowRight size="1rem" />}
                      onClick={handleNext}
                    >
                      {BOOKING_MESSAGES.NEXT}
                    </Button>
                  )}
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <VenueSummaryCard venue={venue} />
            </Grid.Col>
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
