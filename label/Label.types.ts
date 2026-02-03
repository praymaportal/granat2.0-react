import type { HTMLAttributes, ReactNode } from 'react';

export type LabelSize = 'other' | 'xl';

export type LabelState = 'default' | 'error' | 'disabled' | 'info' | 'optional';

export interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: ReactNode;
  size?: LabelSize;
  state?: LabelState;
  showInfo?: boolean;
}
