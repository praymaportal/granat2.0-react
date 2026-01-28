import { forwardRef } from 'react';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';
import { classNames } from '../utils';
import { Spinner } from '../spinner';
import type { SpinnerSize, SpinnerVariant } from '../spinner';
import './button.css';

const DEFAULT_SIZE: ButtonSize = 52;
const DEFAULT_VARIANT: ButtonVariant = 'primary';

const SIZE_CLASS_MAP: Record<ButtonSize, string> = {
  24: 'gr-button--24',
  32: 'gr-button--32',
  44: 'gr-button--44',
  52: 'gr-button--52',
  72: 'gr-button--72'
};

const VARIANT_CLASS_MAP: Record<ButtonVariant, string> = {
  primary: 'gr-button--primary',
  'primary-alternate': 'gr-button--primary-alternate',
  'always-white': 'gr-button--always-white',
  secondary: 'gr-button--secondary',
  'secondary-alternate': 'gr-button--secondary-alternate',
  negative: 'gr-button--negative',
  'negative-alternate': 'gr-button--negative-alternate',
  ghost: 'gr-button--ghost',
  blur: 'gr-button--blur',
  disabled: 'gr-button--disabled'
};

const SPINNER_SIZE_MAP: Record<ButtonSize, SpinnerSize> = {
  24: 16,
  32: 16,
  44: 24,
  52: 24,
  72: 24
};

const SPINNER_VARIANT_MAP: Record<ButtonVariant, SpinnerVariant> = {
  primary: 'always-white',
  'primary-alternate': 'inverted',
  'always-white': 'always-black',
  secondary: 'default',
  'secondary-alternate': 'default',
  negative: 'negative',
  'negative-alternate': 'negative',
  ghost: 'default',
  blur: 'always-white',
  disabled: 'default'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      children,
      size = DEFAULT_SIZE,
      variant = DEFAULT_VARIANT,
      icon,
      showIcon,
      iconPosition = 'left',
      iconOnly = false,
      loading = false,
      fluid = false,
      className,
      type = 'button',
      disabled,
      ...rest
    },
    ref
  ) => {
    const content = children ?? label;
    const shouldShowIcon = showIcon ?? Boolean(icon);
    const isIconOnly = iconOnly || (shouldShowIcon && !content);
    const isDisabled = disabled || variant === 'disabled';
    const isLoading = loading;
    const spinnerSize = SPINNER_SIZE_MAP[size];
    const spinnerVariant = SPINNER_VARIANT_MAP[variant];
    const ariaLabel =
      typeof label === 'string' ? label : typeof children === 'string' ? children : undefined;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        aria-disabled={isLoading || undefined}
        aria-label={ariaLabel}
        className={classNames(
          'gr-button',
          SIZE_CLASS_MAP[size],
          VARIANT_CLASS_MAP[variant],
          {
            'gr-button--icon-only': isIconOnly,
            'gr-button--icon-right': shouldShowIcon && iconPosition === 'right',
            'gr-button--has-icon': shouldShowIcon,
            'gr-button--loading': isLoading,
            'gr-button--fluid': fluid
          },
          className
        )}
        {...rest}
      >
        {isLoading ? (
          <Spinner size={spinnerSize} variant={spinnerVariant} />
        ) : (
          <>
            {shouldShowIcon && iconPosition === 'left' ? (
              <span className="gr-button__icon">{icon}</span>
            ) : null}
            {content ? <span className="gr-button__label">{content}</span> : null}
            {shouldShowIcon && iconPosition === 'right' ? (
              <span className="gr-button__icon">{icon}</span>
            ) : null}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
