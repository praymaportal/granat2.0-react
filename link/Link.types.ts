import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type LinkSize = 16 | 20 | 24;

export type LinkTone = 'primary' | 'secondary' | 'black' | 'white';

export type LinkUnderline = 'none' | 'solid' | 'dotted';

export type LinkIconPosition = 'left' | 'right';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
  children?: ReactNode;
  size?: LinkSize;
  tone?: LinkTone;
  underline?: LinkUnderline;
  icon?: ReactNode;
  iconPosition?: LinkIconPosition;
}
