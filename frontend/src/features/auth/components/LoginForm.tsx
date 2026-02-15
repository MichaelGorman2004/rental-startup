import { useState } from 'react';
import { TextInput, PasswordInput, Button, Stack, Alert } from '@mantine/core';
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, error, isLoading } = useLogin();

  return (
    <Stack>
      {error && <Alert color="red">{error}</Alert>}
      <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} required />
      <Button onClick={() => handleLogin(email, password)} loading={isLoading} fullWidth>
        Sign In
      </Button>
    </Stack>
  );
};
