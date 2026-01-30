import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant =
  | 'default'
  | 'default-no-shadow'
  | 'grey'
  | 'outline'
  | 'elevated'
  | 'secondary'
  | 'secondary-elevated'
  | 'blur'
  | 'transparent'
  | 'image';

export type CardSize = 's' | 'm';

export type CardRadius = 32 | 40 | 48 | 64 | 80;

export type CardState = 'default' | 'hover' | 'pressed' | 'focus';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  radius?: CardRadius;
  state?: CardState;
  children?: ReactNode;
}
