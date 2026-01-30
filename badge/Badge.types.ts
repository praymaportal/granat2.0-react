import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeSize = 16 | 20 | 24 | 32;

export type BadgeVariant = 'default' | 'custom';

export type BadgeSurface = 'primary' | 'secondary';

export type BadgeIconPosition = 'left' | 'right';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  children?: ReactNode;
  size?: BadgeSize;
  variant?: BadgeVariant;
  surface?: BadgeSurface;
  icon?: ReactNode;
  showIcon?: boolean;
  iconPosition?: BadgeIconPosition;
  customBackground?: string;
  customTextColor?: string;
  customIconColor?: string;
}
