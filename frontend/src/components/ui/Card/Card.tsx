import { Card as MantineCard } from '@mantine/core';
import { CardProps } from './Card.types';

export function Card(props: CardProps) {
  return <MantineCard {...props} />;
}
