import type { HTMLAttributes } from 'react';

export type SpinnerSize = 16 | 24 | 44;

export type SpinnerVariant =
  | 'default'
  | 'inverted'
  | 'accent'
  | 'negative'
  | 'always-white'
  | 'always-black'
  | 'ghost-primary'
  | 'ghost-secondary';

export type SpinnerSpeed = 'slow' | 'normal' | 'fast';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  speed?: SpinnerSpeed;
  label?: string;
}
