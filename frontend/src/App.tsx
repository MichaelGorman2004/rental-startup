import { Container, Title, Text } from '@mantine/core';

/**
 * Root application component
 *
 * This is a placeholder component that will be replaced with
 * actual routing and feature components in subsequent tasks.
 */
function App() {
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

export default App;
