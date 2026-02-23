import type { Control } from 'react-hook-form';
import {
  Container, Stack, Grid, Title, Text, Stepper, Group, Button,
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconSend } from '@tabler/icons-react';
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
    estimatedCostCents, isSubmitting, isSuccess, confirmation, handleSubmit,
  } = useBookingPage();

  if (isError) return <Container size="md" py="xl"><VenueErrorState onRetry={refetch} /></Container>;
  if (isNotFound) return <Container size="md" py="xl"><BookingNotFound /></Container>;
  if (isSuccess && confirmation) return <Container size="sm" py="xl"><BookingSuccess confirmation={confirmation} /></Container>;

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
                    leftSection={<IconArrowLeft size="1rem" stroke={1.5} />}
                    onClick={handleBack}
                    disabled={isFirstStep}
                  >
                    {BOOKING_MESSAGES.BACK}
                  </Button>

                  {isLastStep ? (
                    <Button
                      leftSection={<IconSend size="1rem" stroke={1.5} />}
                      onClick={handleSubmit}
                      loading={isSubmitting}
                    >
                      {BOOKING_MESSAGES.SUBMIT}
                    </Button>
                  ) : (
                    <Button
                      rightSection={<IconArrowRight size="1rem" stroke={1.5} />}
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
