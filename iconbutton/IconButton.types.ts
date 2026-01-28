import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonSize = 24 | 32 | 44 | 52 | 72;

export type IconButtonVariant =
  | 'primary'
  | 'primary-alternate'
  | 'always-white'
  | 'secondary'
  | 'secondary-alternate'
  | 'blur'
  | 'ghost'
  | 'ghost-secondary'
  | 'scroll'
  | 'negative'
  | 'negative-alternate'
  | 'disabled'
  | 'disabled-ghost';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  icon: ReactNode;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  loading?: boolean;
}
