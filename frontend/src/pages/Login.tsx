import { Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AuthLayout, LoginForm } from '../features/auth';

export function Login() {
  return (
    <AuthLayout title="Sign in to your account">
      <LoginForm />
      <Text ta="center" mt="md" size="sm">
        Don&apos;t have an account?
        {' '}
        <Anchor component={Link} to="/signup" size="sm">
          Sign up
        </Anchor>
      </Text>
    </AuthLayout>
  );
}
