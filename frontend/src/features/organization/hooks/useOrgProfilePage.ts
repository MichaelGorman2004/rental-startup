import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useUploadOrgLogoMutation } from '@/lib/react-query';
import { LOGO_UPLOAD_MESSAGES } from '@/components/LogoUpload/logo-upload.constants';
import { useOrgProfile } from './useOrgProfile';
import { useUpdateOrg } from './useUpdateOrg';

/** Page orchestration hook for organization profile. */
export function useOrgProfilePage() {
  const { organization, isLoading, isError } = useOrgProfile();
  const { form, handleSubmit, isPending } = useUpdateOrg(organization);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoMutation = useUploadOrgLogoMutation();

  function handleLogoChange(file: File | null) {
    setLogoFile(file);
    if (file && organization) {
      logoMutation.mutate(
        { orgId: organization.id, file },
        {
          onSuccess: () => {
            setLogoFile(null);
            notifications.show({ message: LOGO_UPLOAD_MESSAGES.UPLOAD_SUCCESS, color: 'green' });
          },
          onError: () => {
            notifications.show({ message: LOGO_UPLOAD_MESSAGES.UPLOAD_ERROR, color: 'red' });
          },
        },
      );
    }
  }

  return {
    organization, isLoading, isError, form, handleSubmit, isPending,
    logoFile, handleLogoChange, isUploadingLogo: logoMutation.isPending,
  };
}
