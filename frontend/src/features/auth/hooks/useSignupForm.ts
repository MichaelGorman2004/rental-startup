import { useSignUp } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signupSchema } from '../constants/auth.schemas';
import { SignupFormData } from '../types/auth.types';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

export const useSignupForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: AUTH_CONSTANTS.ROLES.STUDENT_ORG,
      terms: true,
      firstName: '',
      lastName: '',
      orgName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    if (!isLoaded) return;
    setServerError(null);
    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        unsafeMetadata: { role: data.role, orgName: data.orgName },
      });
      
      console.log("Sign up result:", result); // Debugging log

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/');
      } else {
        setServerError(`Signup incomplete. Status: ${result.status}`);
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setServerError(error.errors?.[0]?.message || 'Signup failed');
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
