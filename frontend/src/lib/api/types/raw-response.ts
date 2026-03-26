/**
 * Raw paginated response shape as sent by the backend (snake_case).
 * Use this to type Axios responses from list endpoints, then map to
 * the camelCase PaginatedResponse before returning to callers.
 */
export interface PaginatedApiResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
