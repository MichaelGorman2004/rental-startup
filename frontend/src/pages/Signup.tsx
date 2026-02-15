import { Container, Paper, Title, Text, Anchor } from '@mantine/core';
import { SignupForm } from '../features/auth/components/SignupForm';

export const Signup = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        Create your VenueLink account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => window.location.href = '/login'}>
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <SignupForm />
      </Paper>
    </Container>
  );
};
