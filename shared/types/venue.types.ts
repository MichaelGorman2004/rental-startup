/**
 * Venue-related type definitions
 */

export enum VenueType {
  BAR = 'bar',
  RESTAURANT = 'restaurant',
  EVENT_SPACE = 'event_space',
  CLUB = 'club',
  OTHER = 'other',
}

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  capacity: number;
  pricePerHour: number;
  amenities: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VenueSearchFilters {
  type?: VenueType;
  minCapacity?: number;
  maxPrice?: number;
  city?: string;
  amenities?: string[];
}
