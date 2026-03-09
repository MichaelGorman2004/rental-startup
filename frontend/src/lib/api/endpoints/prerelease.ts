import type {
  InterestFormValues,
  InterestResponse,
} from '@/features/prerelease/types/prerelease.types';
import { apiClient } from '../client';

/** Backend snake_case response shape. */
interface InterestApiResponse {
  id: string;
  first_name: string;
  last_name: string;
  respondent_type: 'student_org' | 'venue';
  org_or_venue_name: string;
  email: string;
  created_at: string;
}

/** Transform backend response to frontend shape. */
function toInterestResponse(raw: InterestApiResponse): InterestResponse {
  return {
    id: raw.id,
    firstName: raw.first_name,
    lastName: raw.last_name,
    respondentType: raw.respondent_type,
    orgOrVenueName: raw.org_or_venue_name,
    email: raw.email,
    createdAt: raw.created_at,
  };
}

/** POST /prerelease/interest — Submit interest form (public, no auth). */
export async function submitInterest(
  data: InterestFormValues,
): Promise<InterestResponse> {
  const { data: response } = await apiClient.post<InterestApiResponse>(
    '/prerelease/interest',
    {
      first_name: data.firstName,
      last_name: data.lastName,
      respondent_type: data.respondentType,
      org_or_venue_name: data.orgOrVenueName,
      email: data.email,
      phone: data.phone || null,
      personal_note: data.personalNote || null,
    },
  );
  return toInterestResponse(response);
}
