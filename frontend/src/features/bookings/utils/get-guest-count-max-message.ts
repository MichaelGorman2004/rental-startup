/** Generate validation message for max guest count (dynamic per venue). */
export function getGuestCountMaxMessage(maxCapacity: number): string {
  return `Maximum ${maxCapacity} guests for this venue`;
}
