import type {
  CounterProps,
  CounterSize,
  CounterKind,
  CounterSurface,
  CounterType
} from './Counter.types';
import { classNames } from '../utils';
import './counter.css';

const DEFAULT_SIZE: CounterSize = 24;
const DEFAULT_TYPE: CounterType = 'primary';
const DEFAULT_SURFACE: CounterSurface = 'primary';
const DEFAULT_KIND: CounterKind = 'counter';

const SIZE_CLASS_MAP: Record<CounterSize, string> = {
  16: 'gr-counter--16',
  20: 'gr-counter--20',
  24: 'gr-counter--24'
};

const TYPE_CLASS_MAP: Record<CounterType, string> = {
  primary: 'gr-counter--primary',
  secondary: 'gr-counter--secondary',
  inverted: 'gr-counter--inverted'
};

const SURFACE_CLASS_MAP: Record<CounterSurface, string> = {
  primary: 'gr-counter--on-primary',
  secondary: 'gr-counter--on-secondary'
};

export function Counter({
  value = 1,
  max = 99,
  showPlus = true,
  size = DEFAULT_SIZE,
  type = DEFAULT_TYPE,
  surface = DEFAULT_SURFACE,
  kind = DEFAULT_KIND,
  className,
  ...rest
}: CounterProps) {
  const isNotification = kind === 'notification';
  const resolvedValue =
    typeof value === 'number'
      ? value > max && showPlus
        ? `${max}+`
        : `${value}`
      : value;

  return (
    <span
      className={classNames(
        'gr-counter',
        SIZE_CLASS_MAP[size],
        TYPE_CLASS_MAP[type],
        SURFACE_CLASS_MAP[surface],
        {
          'gr-counter--notification': isNotification
        },
        className
      )}
      aria-label={!isNotification ? String(resolvedValue) : undefined}
      {...rest}
    >
      {isNotification ? null : <span className="gr-counter__value">{resolvedValue}</span>}
    </span>
  );
}
