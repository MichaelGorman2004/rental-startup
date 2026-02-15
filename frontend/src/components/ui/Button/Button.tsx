import { Button as MantineButton } from '@mantine/core';
import { ButtonProps } from './Button.types';

export function Button(props: ButtonProps) {
  return <MantineButton {...props} />;
}
