import { CardProps as MantineCardProps, ElementProps } from '@mantine/core';

export interface CardProps extends MantineCardProps, ElementProps<'div', keyof MantineCardProps> {}
