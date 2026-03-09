import type { CSSVariablesResolver } from '@mantine/core';

/**
 * Custom CSS variables for the "Warm Night" design system.
 * Available globally as var(--vl-*) in any CSS module.
 */
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--vl-bg-deep': '#0e0e10',
    '--vl-bg-elevated': '#16161a',
    '--vl-bg-card': '#1a1a20',
    '--vl-bg-card-hover': '#1f1f26',
    '--vl-border': 'rgba(255, 255, 255, 0.06)',
    '--vl-border-hover': 'rgba(255, 255, 255, 0.12)',
    '--vl-accent-glow': 'rgba(212, 132, 90, 0.15)',
    '--vl-accent-border': 'rgba(212, 132, 90, 0.25)',
    '--vl-accent-glow-strong': 'rgba(212, 132, 90, 0.3)',
    '--vl-text-primary': '#f0ece4',
    '--vl-text-secondary': '#8a8690',
    '--vl-text-muted': '#5a5660',
    '--vl-success': '#4ade80',
    '--vl-success-bg': 'rgba(74, 222, 128, 0.1)',
    '--vl-success-border': 'rgba(74, 222, 128, 0.15)',
    '--vl-warning': '#fbbf24',
    '--vl-warning-bg': 'rgba(251, 191, 36, 0.1)',
    '--vl-warning-border': 'rgba(251, 191, 36, 0.15)',
  },
  light: {},
  dark: {},
});
