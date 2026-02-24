/**
 * Classification of student organizations.
 *
 * Used for filtering and categorization in search/discovery features.
 * Values must match PostgreSQL `organization_type` ENUM exactly.
 * @see backend/app/core/constants/enums.py#OrganizationType
 */
export enum OrganizationType {
  /** Greek life - fraternity */
  Fraternity = 'fraternity',
  /** Greek life - sorority */
  Sorority = 'sorority',
  /** General student club or special interest group */
  Club = 'club',
  /** Other organization types not covered above */
  Other = 'other',
}

/** Array of all valid OrganizationType values for iteration/validation. */
export const ORGANIZATION_TYPE_VALUES = Object.values(
  OrganizationType
) as OrganizationType[];
