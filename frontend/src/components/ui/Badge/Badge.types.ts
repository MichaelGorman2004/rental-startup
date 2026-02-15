import { BadgeProps as MantineBadgeProps, ElementProps } from '@mantine/core';

export interface BadgeProps extends MantineBadgeProps, ElementProps<'div', keyof MantineBadgeProps> {}
