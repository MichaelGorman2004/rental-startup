import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  OrganizationProfile,
  UpdateOrganizationData,
  CreateOrganizationData,
} from '../../api/endpoints/organizations';
import {
  getMyOrganization, updateOrganization, uploadOrgLogo, createOrganization,
} from '../../api/endpoints/organizations';
import { queryKeys } from '../keys';
import { STALE_TIMES } from '../constants';

/** Query hook for fetching the current user's organization. */
export function useMyOrganizationQuery(options?: { enabled?: boolean }) {
  return useQuery<OrganizationProfile>({
    queryKey: queryKeys.organizations.me(),
    queryFn: getMyOrganization,
    staleTime: STALE_TIMES.USER_PROFILE,
    ...options,
  });
}

/**
 * Query hook for checking if the current user has an org.
 * Does not throw on 404 — treats it as "no org yet".
 * Used by OrgSetupGate for onboarding detection.
 */
export function useOrgStatusQuery() {
  return useQuery<OrganizationProfile>({
    queryKey: queryKeys.organizations.me(),
    queryFn: getMyOrganization,
    staleTime: STALE_TIMES.USER_PROFILE,
    retry: false,
    throwOnError: false,
  });
}

/** Mutation hook for updating an organization profile. */
export function useUpdateOrganizationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationData }) => (
      updateOrganization(id, data)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.all });
    },
  });
}

/** Mutation hook for creating a new organization (onboarding). */
export function useCreateOrganizationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationData) => createOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.all });
    },
  });
}

/** Mutation hook for uploading an organization logo. */
export function useUploadOrgLogoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgId, file }: { orgId: string; file: File }) => (
      uploadOrgLogo(orgId, file)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.all });
    },
  });
}
