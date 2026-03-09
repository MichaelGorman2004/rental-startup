import type { HowItWorksStep, ValueProp } from '../types/landing.types';

/** Hero section copy. */
export const HERO = {
  HEADLINE: 'Where Student Events Meet the Perfect Venue',
  SUBTITLE:
    'VenueLink connects student organizations with local bars, restaurants, and event spaces. '
    + 'Browse, compare, and book — all in one place.',
  CTA_PRIMARY: 'Explore Venues',
  CTA_SECONDARY: 'Get Started',
  SCROLL_LABEL: 'Scroll to learn more',
} as const;

/** How it works section. */
export const HOW_IT_WORKS_TITLE = 'How It Works';
export const HOW_IT_WORKS_SUBTITLE = 'Three steps. Zero phone calls.';

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    icon: 'MagnifyingGlass',
    title: 'Discover',
    description:
      'Browse verified venues near campus — filter by type, capacity, and price to find your perfect match.',
  },
  {
    icon: 'CalendarCheck',
    title: 'Book',
    description:
      'Submit a booking request with your event details. '
      + 'No back-and-forth emails — venues respond directly in the platform.',
  },
  {
    icon: 'Confetti',
    title: 'Celebrate',
    description:
      'Show up and run your event. We handle the logistics so you can focus on what matters.',
  },
] as const;

/** Value props for student organizations. */
export const STUDENT_ORG_TITLE = 'For Student Organizations';
export const STUDENT_ORG_SUBTITLE = 'Stop cold-calling venues. Start planning events.';

export const STUDENT_ORG_PROPS: readonly ValueProp[] = [
  {
    icon: 'MagnifyingGlass',
    title: 'One Search, Every Option',
    description:
      'See every available venue in one place — no more Googling, calling, or guessing.',
  },
  {
    icon: 'CalendarBlank',
    title: 'Book in Minutes',
    description:
      'Submit a request with your event details and get a response without the back-and-forth.',
  },
  {
    icon: 'CurrencyDollar',
    title: 'Transparent Pricing',
    description:
      'See base prices upfront. No hidden fees, no surprises, no awkward budget conversations.',
  },
] as const;

/** Value props for venue owners. */
export const VENUE_OWNER_TITLE = 'For Venues & Bars';
export const VENUE_OWNER_SUBTITLE = 'Fill your slow nights. Reach the campus crowd.';

export const VENUE_OWNER_PROPS: readonly ValueProp[] = [
  {
    icon: 'MegaphoneSimple',
    title: 'Reach New Audiences',
    description:
      'Get your venue in front of hundreds of student orgs actively planning events.',
  },
  {
    icon: 'ChartLineUp',
    title: 'Manage Bookings Easily',
    description:
      'Accept or decline requests from a single dashboard. No missed emails or phone tag.',
  },
  {
    icon: 'Buildings',
    title: 'Fill Empty Nights',
    description:
      'Turn slow weeknights into revenue. Student events bring groups that spend.',
  },
] as const;

/** Featured venues section. */
export const FEATURED = {
  TITLE: 'Explore the Marketplace',
  SUBTITLE: 'Here\'s a taste of what\'s available on VenueLink.',
  CTA: 'Browse All Venues',
} as const;

/** Final CTA section. */
export const CTA_FOOTER = {
  HEADLINE: 'Ready to Transform Your Events?',
  SUBTITLE:
    'Whether you\'re planning a mixer or listing your bar, VenueLink makes it effortless.',
  CTA: 'Get Started — It\'s Free',
} as const;

/** Particle canvas configuration. */
export const PARTICLE_CONFIG = {
  COUNT: 50,
  MIN_RADIUS: 1,
  MAX_RADIUS: 3,
  MIN_SPEED: 0.15,
  MAX_SPEED: 0.4,
  MIN_OPACITY: 0.15,
  MAX_OPACITY: 0.5,
  COLOR: '212, 132, 90',
  MOUSE_INFLUENCE_RADIUS: 200,
  MOUSE_INFLUENCE_STRENGTH: 0.02,
} as const;

/** Scroll animation thresholds. */
export const SCROLL_ANIMATION = {
  THRESHOLD: 0.15,
  ROOT_MARGIN: '0px 0px -50px 0px',
} as const;
