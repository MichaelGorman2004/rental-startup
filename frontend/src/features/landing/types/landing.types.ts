import type React from 'react';

/** A single step in the "How It Works" section. */
export interface HowItWorksStep {
  icon: 'MagnifyingGlass' | 'CalendarCheck' | 'Confetti';
  title: string;
  description: string;
}

/** A value proposition card for the two-sided pitch section. */
export interface ValueProp {
  icon: 'MagnifyingGlass' | 'Buildings' | 'CurrencyDollar' | 'ChartLineUp' | 'MegaphoneSimple' | 'CalendarBlank';
  title: string;
  description: string;
}

/** Configuration for a single particle in the canvas animation. */
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  readonly baseOpacity: number;
}

/** Props for scroll-animated sections. */
export interface ScrollAnimationState {
  isVisible: boolean;
  ref: React.RefObject<HTMLDivElement>;
}
