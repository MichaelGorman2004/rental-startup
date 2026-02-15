import { Container, Paper, Title, Text, Anchor, Center } from '@mantine/core';
import { LoginForm } from '../features/auth/components/LoginForm';

export const Login = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        Welcome back to VenueLink
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button" onClick={() => window.location.href = '/signup'}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginForm />
      </Paper>
    </Container>
  );
};
