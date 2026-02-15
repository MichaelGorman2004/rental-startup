import { ButtonProps as MantineButtonProps, ElementProps } from '@mantine/core';

export interface ButtonProps extends MantineButtonProps, ElementProps<'button', keyof MantineButtonProps> {}
