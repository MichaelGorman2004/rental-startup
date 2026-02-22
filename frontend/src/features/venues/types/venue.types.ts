/**
 * Venue type classification matching backend VenueType enum.
 * String values are identical to PostgreSQL ENUM values.
 */
export enum VenueType {
  Bar = 'bar',
  Restaurant = 'restaurant',
  EventSpace = 'event_space',
  Cafe = 'cafe',
}

/** Address fields for a venue location. */
export interface VenueAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

/**
 * Venue entity as returned by GET /api/v1/venues.
 * Fields match the backend VenueResponse Pydantic schema.
 */
export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  capacity: number;
  basePriceCents: number;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/** Query parameters for filtering the venue list endpoint. */
export interface VenueFilters {
  type: VenueType | null;
  search: string;
  page: number;
  pageSize: number;
}

/** Paginated response shape from GET /api/v1/venues. */
export interface VenueListResponse {
  items: Venue[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Filter chip option displayed in the filter bar. */
export interface VenueFilterOption {
  label: string;
  value: VenueType | null;
}
