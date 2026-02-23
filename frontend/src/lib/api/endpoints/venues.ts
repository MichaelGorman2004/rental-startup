import type { Venue, VenueListResponse } from '@/features/venues/types';
import type { VenueType } from '@/features/venues/types/venue.types';
import { apiClient } from '../client';
import type { PaginatedResponse } from '../types';

/** Backend snake_case venue shape. */
interface VenueApiResponse {
  id: string;
  name: string;
  type: VenueType;
  capacity: number;
  base_price_cents: number;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/** Request body for creating a venue (snake_case for backend). */
interface CreateVenuePayload {
  name: string;
  type: VenueType;
  capacity: number;
  base_price_cents: number;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
}

/** Request body for updating a venue (all fields optional). */
type UpdateVenuePayload = Partial<CreateVenuePayload>;

/** Query parameters for listing venues. */
interface VenueListParams {
  type?: VenueType | null;
  search?: string;
  page?: number;
  page_size?: number;
  min_capacity?: number;
  max_capacity?: number;
  max_price_cents?: number;
}

/** Transform a backend venue response to the frontend Venue shape. */
function toVenue(raw: VenueApiResponse): Venue {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    capacity: raw.capacity,
    basePriceCents: raw.base_price_cents,
    addressStreet: raw.address_street,
    addressCity: raw.address_city,
    addressState: raw.address_state,
    addressZip: raw.address_zip,
    ownerId: raw.owner_id,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    deletedAt: raw.deleted_at,
  };
}

/** Transform a paginated backend response to VenueListResponse. */
function toVenueListResponse(
  raw: PaginatedResponse<VenueApiResponse>,
): VenueListResponse {
  return {
    items: raw.items.map(toVenue),
    total: raw.total,
    page: raw.page,
    pageSize: raw.pageSize,
    totalPages: raw.totalPages,
  };
}

/** Strip null/undefined values from params before sending. */
function cleanParams(params: VenueListParams): Record<string, string | number> {
  const cleaned: Record<string, string | number> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      cleaned[key] = value;
    }
  });

  return cleaned;
}

/** GET /venues — List venues with optional filters and pagination. */
export async function getVenues(
  params: VenueListParams = {},
): Promise<VenueListResponse> {
  const { data } = await apiClient.get<PaginatedResponse<VenueApiResponse>>(
    '/venues',
    { params: cleanParams(params) },
  );
  return toVenueListResponse(data);
}

/** GET /venues/:id — Get a single venue by ID. */
export async function getVenue(id: string): Promise<Venue> {
  const { data } = await apiClient.get<VenueApiResponse>(`/venues/${id}`);
  return toVenue(data);
}

/** POST /venues — Create a new venue. */
export async function createVenue(
  payload: CreateVenuePayload,
): Promise<Venue> {
  const { data } = await apiClient.post<VenueApiResponse>('/venues', payload);
  return toVenue(data);
}

/** PATCH /venues/:id — Partially update a venue. */
export async function updateVenue(
  id: string,
  payload: UpdateVenuePayload,
): Promise<Venue> {
  const { data } = await apiClient.patch<VenueApiResponse>(
    `/venues/${id}`,
    payload,
  );
  return toVenue(data);
}

/** DELETE /venues/:id — Soft-delete a venue. */
export async function deleteVenue(id: string): Promise<void> {
  await apiClient.delete(`/venues/${id}`);
}
