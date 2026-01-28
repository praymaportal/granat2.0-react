import { forwardRef } from 'react';
import type { IconButtonProps, IconButtonSize, IconButtonVariant } from './IconButton.types';
import { classNames } from '../utils';
import { Spinner } from '../spinner';
import type { SpinnerSize, SpinnerVariant } from '../spinner';
import './iconbutton.css';

const DEFAULT_SIZE: IconButtonSize = 52;
const DEFAULT_VARIANT: IconButtonVariant = 'primary';

const SIZE_CLASS_MAP: Record<IconButtonSize, string> = {
  24: 'gr-icon-button--24',
  32: 'gr-icon-button--32',
  44: 'gr-icon-button--44',
  52: 'gr-icon-button--52',
  72: 'gr-icon-button--72'
};

const VARIANT_CLASS_MAP: Record<IconButtonVariant, string> = {
  primary: 'gr-icon-button--primary',
  'primary-alternate': 'gr-icon-button--primary-alternate',
  'always-white': 'gr-icon-button--always-white',
  secondary: 'gr-icon-button--secondary',
  'secondary-alternate': 'gr-icon-button--secondary-alternate',
  blur: 'gr-icon-button--blur',
  ghost: 'gr-icon-button--ghost',
  'ghost-secondary': 'gr-icon-button--ghost-secondary',
  scroll: 'gr-icon-button--scroll',
  negative: 'gr-icon-button--negative',
  'negative-alternate': 'gr-icon-button--negative-alternate',
  disabled: 'gr-icon-button--disabled',
  'disabled-ghost': 'gr-icon-button--disabled-ghost'
};

const SPINNER_SIZE_MAP: Record<IconButtonSize, SpinnerSize> = {
  24: 16,
  32: 16,
  44: 24,
  52: 24,
  72: 24
};

const SPINNER_VARIANT_MAP: Record<IconButtonVariant, SpinnerVariant> = {
  primary: 'always-white',
  'primary-alternate': 'always-white',
  'always-white': 'always-black',
  secondary: 'default',
  'secondary-alternate': 'default',
  blur: 'always-white',
  ghost: 'default',
  'ghost-secondary': 'ghost-secondary',
  scroll: 'default',
  negative: 'negative',
  'negative-alternate': 'negative',
  disabled: 'default',
  'disabled-ghost': 'ghost-secondary'
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      label,
      icon,
      size = DEFAULT_SIZE,
      variant = DEFAULT_VARIANT,
      loading = false,
      className,
      type = 'button',
      disabled,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || variant === 'disabled' || variant === 'disabled-ghost';
    const spinnerSize = SPINNER_SIZE_MAP[size];
    const spinnerVariant = SPINNER_VARIANT_MAP[variant];

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        aria-label={label}
        className={classNames(
          'gr-icon-button',
          SIZE_CLASS_MAP[size],
          VARIANT_CLASS_MAP[variant],
          {
            'gr-icon-button--loading': loading
          },
          className
        )}
        {...rest}
      >
        {loading ? (
          <Spinner size={spinnerSize} variant={spinnerVariant} />
        ) : (
          <span className="gr-icon-button__icon">{icon}</span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
