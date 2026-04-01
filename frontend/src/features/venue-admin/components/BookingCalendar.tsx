import {
  Stack, Group, Text, ActionIcon, Paper, SimpleGrid, Badge, Title,
} from '@mantine/core';
import { CaretLeft, CaretRight, CalendarBlank } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import type { AdminBooking } from '../types';
import { useBookingCalendar } from '../hooks/useBookingCalendar';
import {
  CALENDAR_DAY_LABELS, CALENDAR_MESSAGES, STATUS_BADGE_COLORS, STATUS_LABELS,
} from '../constants';

interface BookingCalendarProps {
  bookings: AdminBooking[];
}

interface DayCellProps {
  dateIso: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  bookingCount: number;
  onSelect: (dateIso: string) => void;
}

function DayCell({
  dateIso, dayNumber, isCurrentMonth, isToday, isSelected, bookingCount, onSelect,
}: DayCellProps) {
  return (
    <Paper
      p="xs"
      radius="sm"
      withBorder={isSelected}
      bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}
      opacity={isCurrentMonth ? 1 : 0.35}
      style={{ cursor: 'pointer', minHeight: 48, position: 'relative' }}
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

function SelectedDayBookings({ bookings }: { bookings: AdminBooking[] }) {
  if (bookings.length === 0) {
    return (
      <Text c="dimmed" size="sm" ta="center" py="md">
        {CALENDAR_MESSAGES.NO_BOOKINGS_ON_DATE}
      </Text>
    );
  }

  return (
    <Stack gap="xs">
      {bookings.map((booking) => (
        <Paper key={booking.id} p="sm" radius="sm" withBorder>
          <Group justify="space-between" wrap="wrap">
            <Stack gap={2}>
              <Text fw={500} size="sm">{booking.eventName}</Text>
              <Text size="xs" c="dimmed">{booking.organizationName}</Text>
            </Stack>
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                {`${booking.eventStartTime} - ${booking.eventEndTime}`}
              </Text>
              <Badge
                size="sm"
                color={STATUS_BADGE_COLORS[booking.status]}
                variant="light"
              >
                {STATUS_LABELS[booking.status]}
              </Badge>
            </Group>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}

/** Monthly calendar grid showing booked time slots for venue admins. */
export function BookingCalendar({ bookings }: BookingCalendarProps) {
  const {
    calendarDays, selectedDate, selectedBookings, monthLabel,
    goToPreviousMonth, goToNextMonth, goToToday, selectDate,
  } = useBookingCalendar(bookings);

  const todayIso = dayjs().format('YYYY-MM-DD');

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Group gap="xs">
          <CalendarBlank size="1.25rem" />
          <Title order={4}>{CALENDAR_MESSAGES.SECTION_TITLE}</Title>
        </Group>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            onClick={goToToday}
            aria-label={CALENDAR_MESSAGES.GO_TO_TODAY}
            size="sm"
          >
            <CalendarBlank size="1rem" />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            onClick={goToPreviousMonth}
            aria-label={CALENDAR_MESSAGES.PREVIOUS_MONTH}
          >
            <CaretLeft size="1rem" />
          </ActionIcon>
          <Text fw={500} size="sm" miw={120} ta="center">
            {monthLabel}
          </Text>
          <ActionIcon
            variant="subtle"
            onClick={goToNextMonth}
            aria-label={CALENDAR_MESSAGES.NEXT_MONTH}
          >
            <CaretRight size="1rem" />
          </ActionIcon>
        </Group>
      </Group>

      <SimpleGrid cols={7} spacing="xs">
        {CALENDAR_DAY_LABELS.map((label) => (
          <Text key={label} size="xs" fw={600} ta="center" c="dimmed">
            {label}
          </Text>
        ))}
        {calendarDays.map((day) => {
          const dateIso = day.date.format('YYYY-MM-DD');
          return (
            <DayCell
              key={dateIso}
              dateIso={dateIso}
              dayNumber={day.date.date()}
              isCurrentMonth={day.isCurrentMonth}
              isToday={dateIso === todayIso}
              isSelected={dateIso === selectedDate}
              bookingCount={day.bookings.length}
              onSelect={selectDate}
            />
          );
        })}
      </SimpleGrid>

      {selectedDate && (
        <Stack gap="xs">
          <Text fw={500} size="sm">
            {dayjs(selectedDate).format('dddd, MMMM D, YYYY')}
          </Text>
          <SelectedDayBookings bookings={selectedBookings} />
        </Stack>
      )}
    </Stack>
  );
}
