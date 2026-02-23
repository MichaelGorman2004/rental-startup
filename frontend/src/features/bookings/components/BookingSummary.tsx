import { memo } from 'react';
import {
  Card, Stack, Group, Text, Badge, Divider, ThemeIcon, Box,
} from '@mantine/core';
import {
  IconCalendar, IconClock, IconUsers, IconNote, IconReceipt,
} from '@tabler/icons-react';
import type { Venue } from '../../venues/types/venue.types';
import type { BookingFormValues } from '../types/booking.types';
import { BOOKING_MESSAGES } from '../constants/booking-defaults';
import { VENUE_TYPE_LABELS, VENUE_TYPE_BADGE_COLORS } from '../../venues/constants/venue-types';
import { formatPrice } from '../../venues/utils/format-price';
import { formatBookingDate, formatBookingTime } from '../utils/format-booking-date';

interface BookingSummaryProps {
  formValues: BookingFormValues;
  venue: Venue;
  estimatedCostCents: number;
}

/** Renders a single summary row with icon, label, and value. */
const SummaryRow = memo(({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Group gap="sm" wrap="nowrap">
    <ThemeIcon size="sm" variant="transparent" c="dimmed">{icon}</ThemeIcon>
    <Box>
      <Text size="xs" c="dimmed">{label}</Text>
      <Text size="sm" fw={500}>{value}</Text>
    </Box>
  </Group>
));

/** Full booking summary card showing event, venue, and cost details. */
export const BookingSummary = memo(({
  formValues, venue, estimatedCostCents,
}: BookingSummaryProps) => (
  <Card withBorder p="lg">
    <Stack gap="md">
      <Text fw={600} size="lg">{BOOKING_MESSAGES.REVIEW_TITLE}</Text>
      <Text size="sm" c="dimmed">{BOOKING_MESSAGES.REVIEW_SUBTITLE}</Text>

      <Divider label={BOOKING_MESSAGES.EVENT_SECTION} labelPosition="left" />
      <Stack gap="sm">
        <SummaryRow
          icon={<IconNote size="1rem" stroke={1.5} />}
          label="Event Name"
          value={formValues.eventName}
        />
        <SummaryRow
          icon={<IconCalendar size="1rem" stroke={1.5} />}
          label="Date"
          value={formValues.eventDate ? formatBookingDate(formValues.eventDate) : '—'}
        />
        <SummaryRow
          icon={<IconClock size="1rem" stroke={1.5} />}
          label="Time"
          value={formValues.eventTime ? formatBookingTime(formValues.eventTime) : '—'}
        />
        <SummaryRow
          icon={<IconUsers size="1rem" stroke={1.5} />}
          label="Guests"
          value={formValues.guestCount?.toString() ?? '—'}
        />
        {formValues.specialRequests ? (
          <SummaryRow
            icon={<IconNote size="1rem" stroke={1.5} />}
            label="Special Requests"
            value={formValues.specialRequests}
          />
        ) : null}
      </Stack>

      <Divider label={BOOKING_MESSAGES.VENUE_SECTION} labelPosition="left" />
      <Group gap="sm">
        <Text size="sm" fw={500}>{venue.name}</Text>
        <Badge size="sm" color={VENUE_TYPE_BADGE_COLORS[venue.type]} variant="light">
          {VENUE_TYPE_LABELS[venue.type]}
        </Badge>
      </Group>

      <Divider label={BOOKING_MESSAGES.COST_SECTION} labelPosition="left" />
      <Group justify="space-between" align="flex-end">
        <Box>
          <Text size="xs" c="dimmed">{BOOKING_MESSAGES.COST_NOTE}</Text>
          <Group gap="xs" mt="xs">
            <ThemeIcon size="sm" variant="transparent" c="dimmed">
              <IconReceipt size="1rem" stroke={1.5} />
            </ThemeIcon>
            <Text size="xl" fw={700} c="indigo">
              {formatPrice(estimatedCostCents)}
            </Text>
          </Group>
        </Box>
      </Group>
    </Stack>
  </Card>
));
