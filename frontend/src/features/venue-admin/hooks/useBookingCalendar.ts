import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import type { AdminBooking } from '../types';
import { CALENDAR_DAYS_IN_WEEK } from '../constants';

/** Map of ISO date string to bookings on that date. */
export type BookingsByDate = Record<string, AdminBooking[]>;

interface CalendarDay {
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  bookings: AdminBooking[];
}

interface UseBookingCalendarReturn {
  currentMonth: dayjs.Dayjs;
  calendarDays: CalendarDay[];
  selectedDate: string | null;
  selectedBookings: AdminBooking[];
  monthLabel: string;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  selectDate: (dateIso: string) => void;
  clearSelection: () => void;
}

function groupBookingsByDate(bookings: AdminBooking[]): BookingsByDate {
  const grouped: BookingsByDate = {};
  for (const booking of bookings) {
    const key = booking.eventDate;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(booking);
  }
  return grouped;
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

  const days: CalendarDay[] = [];
  for (let i = 0; i < totalDays; i++) {
    const date = gridStart.add(i, 'day');
    const iso = date.format('YYYY-MM-DD');
    days.push({
      date,
      isCurrentMonth: date.month() === month.month(),
      bookings: bookingsByDate[iso] ?? [],
    });
  }
  return days;
}

/**
 * Manages calendar month navigation and groups bookings by day.
 * Provides selection state for viewing bookings on a specific date.
 */
export function useBookingCalendar(
  bookings: AdminBooking[],
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
