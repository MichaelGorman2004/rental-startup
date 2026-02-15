import { TextInputProps as MantineTextInputProps, ElementProps } from '@mantine/core';

export interface InputProps extends MantineTextInputProps, ElementProps<'input', keyof MantineTextInputProps> {}
