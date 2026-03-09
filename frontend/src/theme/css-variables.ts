import type { CSSVariablesResolver } from '@mantine/core';

/**
 * Custom CSS variables injected into the Mantine theme.
 * These are available globally as var(--vl-*) in any CSS module.
 */
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--vl-bg-deep': '#0c0e14',
    '--vl-bg-elevated': '#151820',
    '--vl-bg-card': '#1a1d28',
    '--vl-bg-card-hover': '#1e2230',
    '--vl-border': 'rgba(255, 255, 255, 0.06)',
    '--vl-border-hover': 'rgba(255, 255, 255, 0.12)',
    '--vl-amber-glow-subtle': 'rgba(226, 160, 82, 0.08)',
    '--vl-amber-glow': 'rgba(226, 160, 82, 0.12)',
    '--vl-amber-border': 'rgba(226, 160, 82, 0.15)',
    '--vl-amber-glow-strong': 'rgba(226, 160, 82, 0.25)',
    '--vl-text-secondary': '#8b8693',
    '--vl-text-muted': '#5c5768',
  },
  light: {},
  dark: {},
});
