import type { HTMLAttributes, ReactNode } from 'react';

export type LabelSize = 'other' | 'xl';

export type LabelStatus = 'default' | 'error' | 'disabled';

export type LabelHint = 'none' | 'info' | 'optional' | 'optional-info';

export type LabelOptionalColor = 'on-primary-bg' | 'on-secondary-bg';

export interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: ReactNode;
  size?: LabelSize;
  status?: LabelStatus;
  hint?: LabelHint;
  /**
   * Controls the optional badge ("Необязательно") background depending on
   * the surface the label sits on.
   *
   * - on-primary-bg (default): badge background is secondary.
   * - on-secondary-bg: badge background is secondary elevated.
   */
  optionalColor?: LabelOptionalColor;
}
