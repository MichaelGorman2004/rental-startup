import { Badge as MantineBadge } from '@mantine/core';
import { BadgeProps } from './Badge.types';

export function Badge(props: BadgeProps) {
  return <MantineBadge {...props} />;
}
