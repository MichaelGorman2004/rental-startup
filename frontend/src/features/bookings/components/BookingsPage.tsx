import {
  Container, Stack, Title, Text, Modal, Group, Button,
} from '@mantine/core';
import { MY_BOOKINGS_MESSAGES } from '../constants/bookings-page-defaults';
import { useBookingsPage } from '../hooks/useBookingsPage';
import { BookingsFilterBar } from './BookingsFilterBar';
import { BookingHistoryCard } from './BookingHistoryCard';
import { BookingsEmptyState } from './BookingsEmptyState';
import { BookingsPageSkeleton } from './BookingsPageSkeleton';

/** My Bookings page listing the user's organization bookings. */
export function BookingsPage() {
  const {
    bookings, statusFilter, handleStatusChange,
    isLoading, isError,
    openCancelModal, cancelTarget, closeCancelModal, confirmCancel, isCancelling,
  } = useBookingsPage();

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Stack gap="xs">
          <Title order={2}>{MY_BOOKINGS_MESSAGES.PAGE_TITLE}</Title>
          <Text c="dimmed">{MY_BOOKINGS_MESSAGES.PAGE_SUBTITLE}</Text>
        </Stack>

        <BookingsFilterBar activeStatus={statusFilter} onChange={handleStatusChange} />

        {isLoading ? <BookingsPageSkeleton /> : null}
        {isError ? <Text c="red">{MY_BOOKINGS_MESSAGES.ERROR_TITLE}</Text> : null}
        {!isLoading && !isError && bookings.length === 0 ? <BookingsEmptyState /> : null}

        {bookings.map((booking) => (
          <BookingHistoryCard key={booking.id} booking={booking} onCancel={openCancelModal} />
        ))}
      </Stack>

      <Modal
        opened={cancelTarget !== null}
        onClose={closeCancelModal}
        title={MY_BOOKINGS_MESSAGES.CANCEL_TITLE}
      >
        <Stack gap="md">
          <Text size="sm">{MY_BOOKINGS_MESSAGES.CANCEL_MESSAGE}</Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="default" onClick={closeCancelModal}>
              {MY_BOOKINGS_MESSAGES.CANCEL_DISMISS}
            </Button>
            <Button color="red" onClick={confirmCancel} loading={isCancelling}>
              {MY_BOOKINGS_MESSAGES.CANCEL_CONFIRM}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
