import type { CardProps, CardRadius, CardSize, CardState, CardVariant } from './Card.types';
import { classNames } from '../utils';
import './card.css';

const DEFAULT_VARIANT: CardVariant = 'default';
const DEFAULT_SIZE: CardSize = 's';
const DEFAULT_RADIUS_M: CardRadius = 32;
const DEFAULT_STATE: CardState = 'default';

const VARIANT_CLASS_MAP: Record<CardVariant, string> = {
  default: 'gr-card--elevated',
  'default-no-shadow': 'gr-card--secondary-elevated',
  grey: 'gr-card--secondary',
  outline: 'gr-card--outline',
  elevated: 'gr-card--elevated',
  secondary: 'gr-card--secondary',
  'secondary-elevated': 'gr-card--secondary-elevated',
  blur: 'gr-card--blur',
  transparent: 'gr-card--transparent',
  image: 'gr-card--image'
};

const SIZE_CLASS_MAP: Record<CardSize, string> = {
  s: 'gr-card--size-s',
  m: 'gr-card--size-m'
};

const RADIUS_CLASS_MAP: Record<CardRadius, string> = {
  32: 'gr-card--radius-32',
  40: 'gr-card--radius-40',
  48: 'gr-card--radius-48',
  64: 'gr-card--radius-64',
  80: 'gr-card--radius-80'
};

const STATE_CLASS_MAP: Record<CardState, string> = {
  default: 'gr-card--state-default',
  hover: 'gr-card--state-hover',
  pressed: 'gr-card--state-pressed',
  focus: 'gr-card--state-focus'
};

export function Card({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  radius,
  state = DEFAULT_STATE,
  className,
  children,
  ...rest
}: CardProps) {
  const resolvedRadius = size === 'm' ? radius ?? DEFAULT_RADIUS_M : undefined;

  return (
    <div
      className={classNames(
        'gr-card',
        VARIANT_CLASS_MAP[variant],
        SIZE_CLASS_MAP[size],
        resolvedRadius ? RADIUS_CLASS_MAP[resolvedRadius] : null,
        STATE_CLASS_MAP[state],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
