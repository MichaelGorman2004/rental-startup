import { Group, Button } from '@mantine/core';
import type { BookingStatus } from '@venuelink/shared';
import { BOOKING_STATUS_FILTERS } from '../constants/bookings-page-defaults';

interface BookingsFilterBarProps {
  activeStatus: BookingStatus | null;
  onChange: (status: BookingStatus | null) => void;
}

/** Filter chips for booking status. */
export function BookingsFilterBar({ activeStatus, onChange }: BookingsFilterBarProps) {
  return (
    <Group gap="xs">
      {BOOKING_STATUS_FILTERS.map((filter) => (
        <Button
          key={filter.label}
          size="xs"
          variant={activeStatus === filter.value ? 'filled' : 'light'}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </Group>
  );
}
