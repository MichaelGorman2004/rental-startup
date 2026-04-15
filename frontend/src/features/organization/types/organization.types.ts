export type { OrganizationProfile, UpdateOrganizationData, CreateOrganizationData } from '@/lib/api/endpoints/organizations';

/** Form values for the organization setup (onboarding) form. */
export interface CreateOrgFormValues {
  name: string;
  type: string;
  university: string;
}

/** Form values for the organization profile edit form. */
export interface OrgProfileFormValues {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  memberCount: number | undefined;
  websiteUrl: string;
}
