/**
 * Generic paginated response wrapper.
 *
 * Used for all list endpoints that support pagination.
 * @template T - The type of items in the response
 */
export interface PaginatedResponse<T> {
  /** Array of items for the current page */
  items: T[];
  /** Total number of items across all pages */
  total: number;
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Common pagination query parameters.
 *
 * Used for paginated list requests.
 */
export interface PaginationParams {
  /** Page number (1-indexed, default: 1) */
  page?: number;
  /** Items per page (default: 20, max: 100) */
  pageSize?: number;
}

/**
 * Paginated request with optional sorting.
 *
 * Extends pagination with sort capabilities.
 */
export interface PaginatedSortedParams extends PaginationParams {
  /** Field to sort by */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
}
