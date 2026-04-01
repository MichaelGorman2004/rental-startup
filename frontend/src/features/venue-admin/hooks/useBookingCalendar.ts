import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import type { AdminBookingView } from '@venuelink/shared';
import { CALENDAR_DAYS_IN_WEEK } from '../constants';

/** Map of ISO date string to bookings on that date. */
export type BookingsByDate = Record<string, AdminBookingView[]>;

interface CalendarDay {
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  bookings: AdminBookingView[];
}

interface UseBookingCalendarReturn {
  currentMonth: dayjs.Dayjs;
  calendarDays: CalendarDay[];
  selectedDate: string | null;
  selectedBookings: AdminBookingView[];
  monthLabel: string;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  selectDate: (dateIso: string) => void;
  clearSelection: () => void;
}

function groupBookingsByDate(bookings: AdminBookingView[]): BookingsByDate {
  return bookings.reduce<BookingsByDate>((grouped, booking) => {
    const key = booking.eventDate;
    const existing = grouped[key] ?? [];
    return { ...grouped, [key]: [...existing, booking] };
  }, {});
}

function buildCalendarDays(
  month: dayjs.Dayjs,
  bookingsByDate: BookingsByDate,
): CalendarDay[] {
  const startOfMonth = month.startOf('month');
  const endOfMonth = month.endOf('month');
  const startDay = startOfMonth.day();
  const gridStart = startOfMonth.subtract(startDay, 'day');
  const totalCells = startDay + endOfMonth.date();
  const rows = Math.ceil(totalCells / CALENDAR_DAYS_IN_WEEK);
  const totalDays = rows * CALENDAR_DAYS_IN_WEEK;

  const days: CalendarDay[] = Array.from({ length: totalDays }, (_, i) => {
    const date = gridStart.add(i, 'day');
    const iso = date.format('YYYY-MM-DD');
    return {
      date,
      isCurrentMonth: date.month() === month.month(),
      bookings: bookingsByDate[iso] ?? [],
    };
  });
  return days;
}

/**
 * Manages calendar month navigation and groups bookings by day.
 * Provides selection state for viewing bookings on a specific date.
 */
export function useBookingCalendar(
  bookings: AdminBookingView[],
): UseBookingCalendarReturn {
  const [currentMonth, setCurrentMonth] = useState(() => dayjs().startOf('month'));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const bookingsByDate = useMemo(
    () => groupBookingsByDate(bookings),
    [bookings],
  );

  const calendarDays = useMemo(
    () => buildCalendarDays(currentMonth, bookingsByDate),
    [currentMonth, bookingsByDate],
  );

  const selectedBookings = useMemo(
    () => (selectedDate ? bookingsByDate[selectedDate] ?? [] : []),
    [selectedDate, bookingsByDate],
  );

  const monthLabel = currentMonth.format('MMMM YYYY');

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'));
    setSelectedDate(null);
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.add(1, 'month'));
    setSelectedDate(null);
  }, []);

  const goToToday = useCallback(() => {
    setCurrentMonth(dayjs().startOf('month'));
    setSelectedDate(dayjs().format('YYYY-MM-DD'));
  }, []);

  const selectDate = useCallback((dateIso: string) => {
    setSelectedDate((prev) => (prev === dateIso ? null : dateIso));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedDate(null);
  }, []);

  return {
    currentMonth,
    calendarDays,
    selectedDate,
    selectedBookings,
    monthLabel,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    clearSelection,
  };
}
