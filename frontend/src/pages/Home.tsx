import { Container, Title, Text } from '@mantine/core';

export function Home() {
  return (
    <Container size="md" py="xl">
      <Title order={1}>VenueLink</Title>
      <Text mt="md">
        Connect. Book. Celebrate.
      </Text>
      <Text c="dimmed" mt="sm">
        The premier platform connecting college organizations with local event venues.
      </Text>
    </Container>
  );
}
