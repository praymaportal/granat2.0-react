import type { HTMLAttributes, ReactNode } from 'react';

export type DescriptionState = 'default' | 'error' | 'success';

export interface DescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  text?: string;
  children?: ReactNode;
  state?: DescriptionState;
}
