import type { CSSVariablesResolver } from '@mantine/core';

/**
 * Custom CSS variables for the "Flame Brutalist" design system.
 * Available globally as var(--vl-*) in any CSS module.
 */
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--vl-bg-deep': '#050507',
    '--vl-bg-elevated': '#0a0a0e',
    '--vl-bg-card': '#0e0e12',
    '--vl-bg-card-hover': '#141418',
    '--vl-border': 'rgba(255, 255, 255, 0.06)',
    '--vl-border-hover': 'rgba(255, 255, 255, 0.12)',
    '--vl-flame-glow-subtle': 'rgba(255, 90, 20, 0.06)',
    '--vl-flame-glow': 'rgba(255, 90, 20, 0.12)',
    '--vl-flame-border': 'rgba(255, 90, 20, 0.18)',
    '--vl-flame-glow-strong': 'rgba(255, 90, 20, 0.3)',
    '--vl-text-secondary': '#7a7580',
    '--vl-text-muted': '#4a4550',
  },
  light: {},
  dark: {},
});
