import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputValidationState = 'not-validate' | 'success' | 'error';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  isValid?: InputValidationState;
  icon?: ReactNode;
  iconButton?: ReactNode;
}
