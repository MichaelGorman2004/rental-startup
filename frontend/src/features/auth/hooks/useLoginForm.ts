import { useSignIn } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginSchema } from '../constants/auth.schemas';
import { LoginFormData } from '../types/auth.types';

export const useLoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (!isLoaded) return;
    setServerError(null);
    try {
      const result = await signIn.create({ identifier: data.email, password: data.password });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/');
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setServerError(error.errors?.[0]?.message || 'Invalid email or password');
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    serverError,
    isLoaded,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
};
