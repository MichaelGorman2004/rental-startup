import {
  Container, Paper, Title, Text, Stack, Center,
} from '@mantine/core';
import { ReactNode } from 'react';

function AuthHeader({ title }: { title: string }) {
  return (
    <Stack gap="xs" align="center" mb="xl">
      <Title order={2}>VenueLink</Title>
      <Text c="dimmed" size="sm">{title}</Text>
    </Stack>
  );
}

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <Center h="100vh">
      <Container size={420} p={0}>
        <Paper p="xl" radius="md" withBorder shadow="sm">
          <AuthHeader title={title} />
          {children}
        </Paper>
      </Container>
    </Center>
  );
}
