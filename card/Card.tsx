import type { CardProps, CardVariant } from './Card.types';
import { classNames } from '../utils';
import './card.css';

const DEFAULT_VARIANT: CardVariant = 'default';

const VARIANT_CLASS_MAP: Record<CardVariant, string> = {
  default: 'gr-card--default',
  'default-no-shadow': 'gr-card--default-no-shadow',
  grey: 'gr-card--grey',
  transparent: 'gr-card--transparent',
  outline: 'gr-card--outline'
};

export function Card({ variant = DEFAULT_VARIANT, className, children, ...rest }: CardProps) {
  return (
    <div className={classNames('gr-card', VARIANT_CLASS_MAP[variant], className)} {...rest}>
      {children}
    </div>
  );
}
