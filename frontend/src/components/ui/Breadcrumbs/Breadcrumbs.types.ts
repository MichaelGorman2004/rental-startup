/** A single breadcrumb navigation item. */
export interface BreadcrumbItem {
  /** Display label for the breadcrumb link. */
  label: string;
  /** Route path to navigate to. Last item has no href (current page). */
  href?: string;
}

/** Props for the reusable Breadcrumbs component. */
export interface BreadcrumbsProps {
  /** Ordered list of breadcrumb items from root to current page. */
  items: BreadcrumbItem[];
}
