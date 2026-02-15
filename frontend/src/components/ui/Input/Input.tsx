import { TextInput as MantineTextInput } from '@mantine/core';
import { InputProps } from './Input.types';

export function Input(props: InputProps) {
  return <MantineTextInput {...props} />;
}
