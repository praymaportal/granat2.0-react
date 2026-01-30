import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant =
  | 'default'
  | 'default-no-shadow'
  | 'grey'
  | 'transparent'
  | 'outline';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children?: ReactNode;
}
