import { useState } from 'react';
import { TextInput, PasswordInput, Button, Stack, Alert } from '@mantine/core';
import { useSignup } from '../hooks/useSignup';
import { RoleSelector } from './RoleSelector';
import { UserRole } from '../types/auth.types';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student_org');
  const { handleSignup, error, isLoading } = useSignup();

  return (
    <Stack>
      {error && <Alert color="red">{error}</Alert>}
      <RoleSelector value={role} onChange={(r) => setRole(r)} />
      <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required />
      <Button onClick={() => handleSignup(email, password, role)} loading={isLoading} fullWidth>
        Create Account
      </Button>
    </Stack>
  );
};
