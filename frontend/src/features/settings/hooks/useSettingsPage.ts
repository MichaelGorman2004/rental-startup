import { useState, useCallback } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SettingsTab } from '../types/settings.types';

/** Hook for settings page tab state and sign-out handler. */
export function useSettingsPage() {
  const [activeTab, setActiveTab] = useState<string | null>(SettingsTab.Account);
  const { signOut } = useClerk();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    queryClient.clear();
    await signOut();
    navigate('/login');
  }, [signOut, queryClient, navigate]);

  return { activeTab, setActiveTab, handleSignOut };
}
