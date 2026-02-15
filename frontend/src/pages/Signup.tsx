import { Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../features/auth/components/AuthLayout';
import { SignupForm } from '../features/auth/components/SignupForm';

export function Signup() {
  return (
    <AuthLayout title="Create your account">
      <SignupForm />
      <Text ta="center" mt="md" size="sm">
        Already have an account?
        {' '}
        <Anchor component={Link} to="/login" size="sm">
          Log in
        </Anchor>
      </Text>
    </AuthLayout>
  );
}
