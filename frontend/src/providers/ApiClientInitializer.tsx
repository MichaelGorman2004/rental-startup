import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { initializeApiClient } from '../lib/api/client';
import { CLERK_TOKEN_TEMPLATE } from '../lib/api/constants';

/**
 * Attaches auth/retry/error interceptors to the Axios client once.
 * Uses a ref to always forward to the latest getToken, so interceptors
 * work correctly after sign-in/sign-up (avoids stale closure returning null).
 */
export function ApiClientInitializer({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  // Always points to the current getToken — interceptor reads through this ref
  // so it never captures a stale pre-signin version.
  const getTokenRef = useRef(getToken);
  useEffect(() => {
    getTokenRef.current = getToken;
  }, [getToken]);

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    initializeApiClient(
      () => getTokenRef.current({ template: CLERK_TOKEN_TEMPLATE }),
      () => { /* 401s are handled per-query; do not force signOut */ },
    );
  }, []);

  return children;
}
