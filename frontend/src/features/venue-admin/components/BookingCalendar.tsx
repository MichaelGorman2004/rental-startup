import {
  Stack, Group, Text, ActionIcon, SimpleGrid, Title,
} from '@mantine/core';
import { CaretLeft, CaretRight, CalendarBlank } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import type { AdminBookingView } from '@venuelink/shared';
import { useBookingCalendar } from '../hooks/useBookingCalendar';
import { CALENDAR_DAY_LABELS, CALENDAR_MESSAGES } from '../constants';
import { DayCell } from './DayCell';
import { SelectedDayBookings } from './SelectedDayBookings';

interface BookingCalendarProps {
  bookings: AdminBookingView[];
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
          <CalendarBlank size={20} />
          <Title order={4}>{CALENDAR_MESSAGES.SECTION_TITLE}</Title>
        </Group>
        <Group gap="xs">
          <ActionIcon
            variant="subtle"
            onClick={goToToday}
            aria-label={CALENDAR_MESSAGES.GO_TO_TODAY}
            size="sm"
          >
            <CalendarBlank size={16} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            onClick={goToPreviousMonth}
            aria-label={CALENDAR_MESSAGES.PREVIOUS_MONTH}
          >
            <CaretLeft size={16} />
          </ActionIcon>
          <Text fw={500} size="sm" miw={120} ta="center">
            {monthLabel}
          </Text>
          <ActionIcon
            variant="subtle"
            onClick={goToNextMonth}
            aria-label={CALENDAR_MESSAGES.NEXT_MONTH}
          >
            <CaretRight size={16} />
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
