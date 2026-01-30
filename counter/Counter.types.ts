import type { HTMLAttributes } from 'react';

export type CounterSize = 16 | 20 | 24;

export type CounterType = 'primary' | 'secondary' | 'inverted';

export type CounterSurface = 'primary' | 'secondary';

export type CounterKind = 'counter' | 'notification';

export interface CounterProps extends HTMLAttributes<HTMLSpanElement> {
  value?: number | string;
  max?: number;
  showPlus?: boolean;
  size?: CounterSize;
  type?: CounterType;
  surface?: CounterSurface;
  kind?: CounterKind;
}
