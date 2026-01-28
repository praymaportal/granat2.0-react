import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonSize = 24 | 32 | 44 | 52 | 72;

export type ButtonVariant =
  | 'primary'
  | 'primary-alternate'
  | 'always-white'
  | 'secondary'
  | 'secondary-alternate'
  | 'negative'
  | 'negative-alternate'
  | 'ghost'
  | 'blur'
  | 'disabled';

export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label?: string;
  children?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: ReactNode;
  showIcon?: boolean;
  iconPosition?: ButtonIconPosition;
  iconOnly?: boolean;
  loading?: boolean;
  fluid?: boolean;
}
