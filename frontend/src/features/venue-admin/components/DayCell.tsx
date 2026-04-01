import { Paper, Text, Badge } from '@mantine/core';
import dayjs from 'dayjs';

export interface DayCellProps {
  dateIso: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  bookingCount: number;
  onSelect: (dateIso: string) => void;
}

/** Single calendar day cell with booking indicator badge. */
export function DayCell({
  dateIso, dayNumber, isCurrentMonth, isToday, isSelected, bookingCount, onSelect,
}: DayCellProps) {
  return (
    <Paper
      p="xs"
      radius="sm"
      withBorder={isSelected}
      bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}
      opacity={isCurrentMonth ? 1 : 0.35}
      mih={48}
      pos="relative"
      style={{ cursor: 'pointer' }}
      onClick={() => onSelect(dateIso)}
      aria-label={`${dayjs(dateIso).format('MMMM D, YYYY')}${bookingCount > 0 ? `, ${bookingCount} bookings` : ''}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(dateIso);
      }}
    >
      <Text
        size="sm"
        fw={isToday ? 700 : 400}
        c={isToday ? 'blue' : undefined}
      >
        {dayNumber}
      </Text>
      {bookingCount > 0 && (
        <Badge size="xs" variant="dot" color="blue" mt={2}>
          {bookingCount}
        </Badge>
      )}
    </Paper>
  );
}
