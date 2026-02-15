import { useSignIn } from '@clerk/clerk-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/');
      } else {
        console.error('Login incomplete', result);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Login failed');
    }
  };

  return { handleLogin, error, isLoading: !isLoaded };
};
