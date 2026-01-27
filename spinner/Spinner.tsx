import { classNames } from '../utils';
import type { SpinnerProps, SpinnerSize, SpinnerSpeed, SpinnerVariant } from './Spinner.types';
import './spinner.css';

const SIZE_CLASS_MAP: Record<SpinnerSize, string> = {
  16: 'gr-spinner--16',
  24: 'gr-spinner--24',
  44: 'gr-spinner--44'
};

const VARIANT_CLASS_MAP: Record<SpinnerVariant, string> = {
  default: 'gr-spinner--default',
  inverted: 'gr-spinner--inverted',
  accent: 'gr-spinner--accent',
  negative: 'gr-spinner--negative',
  'always-white': 'gr-spinner--always-white',
  'always-black': 'gr-spinner--always-black',
  'ghost-primary': 'gr-spinner--ghost-primary',
  'ghost-secondary': 'gr-spinner--ghost-secondary'
};

const SPEED_CLASS_MAP: Record<SpinnerSpeed, string> = {
  slow: 'gr-spinner--slow',
  normal: 'gr-spinner--normal',
  fast: 'gr-spinner--fast'
};

export function Spinner({
  size = 24,
  variant = 'default',
  speed = 'normal',
  label = 'Загрузка',
  className,
  ...rest
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={classNames(
        'gr-spinner',
        SIZE_CLASS_MAP[size],
        VARIANT_CLASS_MAP[variant],
        SPEED_CLASS_MAP[speed],
        className
      )}
      {...rest}
    />
  );
}
