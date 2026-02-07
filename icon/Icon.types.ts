import type { HTMLAttributes } from 'react';

export type IconSize = 16 | 24 | 32 | 44;
export type IconVariant = 'outline' | 'fill';
export type IconPack = 'web2' | 'interface' | 'interface-documents';

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Icon folder name inside `icons/<pack>/<name>/...`
   * Example: "plus", "cross-circle", "warning-circle"
   */
  name: string;
  pack?: IconPack;
  size?: IconSize;
  variant?: IconVariant;
  /**
   * If provided, icon is exposed to screen readers.
   * Otherwise, it's treated as decorative (`aria-hidden`).
   */
  ariaLabel?: string;
}
