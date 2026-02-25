export type { OrganizationProfile, UpdateOrganizationData } from '@/lib/api/endpoints/organizations';

/** Form values for the organization profile edit form. */
export interface OrgProfileFormValues {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  memberCount: number | undefined;
  websiteUrl: string;
}
