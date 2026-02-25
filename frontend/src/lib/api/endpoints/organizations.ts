import type { OrganizationType } from '@venuelink/shared';
import { apiClient } from '../client';

/** Backend snake_case organization shape. */
interface OrganizationApiResponse {
  id: string;
  name: string;
  type: OrganizationType;
  university: string;
  owner_id: string;
  description: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  member_count: number | null;
  website_url: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

/** Frontend camelCase organization profile shape. */
export interface OrganizationProfile {
  id: string;
  name: string;
  type: OrganizationType;
  university: string;
  ownerId: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  memberCount?: number;
  websiteUrl?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/** Update payload (camelCase, sent as snake_case). */
export interface UpdateOrganizationData {
  name?: string;
  type?: OrganizationType;
  university?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  memberCount?: number;
  websiteUrl?: string;
}

/** Transform backend response to frontend shape. */
function toOrganizationProfile(raw: OrganizationApiResponse): OrganizationProfile {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    university: raw.university,
    ownerId: raw.owner_id,
    description: raw.description ?? undefined,
    contactEmail: raw.contact_email ?? undefined,
    contactPhone: raw.contact_phone ?? undefined,
    memberCount: raw.member_count ?? undefined,
    websiteUrl: raw.website_url ?? undefined,
    logoUrl: raw.logo_url ?? undefined,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

/** GET /organizations/me — Get current user's organization. */
export async function getMyOrganization(): Promise<OrganizationProfile> {
  const { data } = await apiClient.get<OrganizationApiResponse>('/organizations/me');
  return toOrganizationProfile(data);
}

/** GET /organizations/:id — Get organization by ID. */
export async function getOrganization(id: string): Promise<OrganizationProfile> {
  const { data } = await apiClient.get<OrganizationApiResponse>(`/organizations/${id}`);
  return toOrganizationProfile(data);
}

/** PATCH /organizations/:id — Update organization profile. */
export async function updateOrganization(
  id: string,
  payload: UpdateOrganizationData,
): Promise<OrganizationProfile> {
  const { data } = await apiClient.patch<OrganizationApiResponse>(
    `/organizations/${id}`,
    {
      name: payload.name,
      type: payload.type,
      university: payload.university,
      description: payload.description,
      contact_email: payload.contactEmail,
      contact_phone: payload.contactPhone,
      member_count: payload.memberCount,
      website_url: payload.websiteUrl,
    },
  );
  return toOrganizationProfile(data);
}
