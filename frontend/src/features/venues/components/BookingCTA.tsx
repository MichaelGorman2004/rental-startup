import { memo, useCallback } from 'react';
import {
  Card, Stack, Button, Text, Tooltip,
} from '@mantine/core';
import { IconCalendarPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { VENUE_DETAIL_MESSAGES } from '../constants/venue-defaults';

interface BookingCTAProps {
  venueId: string;
  isStudentOrg: boolean;
}

/** Booking call-to-action card with policy disclaimers. */
export const BookingCTA = memo(({ venueId, isStudentOrg }: BookingCTAProps) => {
  const navigate = useNavigate();

  const handleBooking = useCallback(() => {
    navigate(`/venues/${venueId}/book`);
  }, [navigate, venueId]);

  return (
    <Card withBorder>
      <Stack gap="md">
        <Tooltip
          label={VENUE_DETAIL_MESSAGES.VENUE_ADMIN_TOOLTIP}
          disabled={isStudentOrg}
        >
          <Button
            size="lg"
            fullWidth
            leftSection={<IconCalendarPlus size="1.25rem" stroke={1.5} />}
            onClick={handleBooking}
            disabled={!isStudentOrg}
            aria-label={VENUE_DETAIL_MESSAGES.REQUEST_BOOKING}
          >
            {VENUE_DETAIL_MESSAGES.REQUEST_BOOKING}
          </Button>
        </Tooltip>
        <Stack gap="xs">
          <Text size="xs" c="dimmed">{VENUE_DETAIL_MESSAGES.BOOKING_NOTICE}</Text>
          <Text size="xs" c="dimmed">{VENUE_DETAIL_MESSAGES.CANCELLATION_POLICY}</Text>
        </Stack>
      </Stack>
    </Card>
  );
});
