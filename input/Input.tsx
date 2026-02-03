import { cloneElement, isValidElement, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { InputProps, InputValidationState } from './Input.types';
import { classNames } from '../utils';
import './input.css';

const DEFAULT_VALIDATION: InputValidationState = 'not-validate';
const VALIDATION_CLASS_MAP: Record<InputValidationState, string | null> = {
  'not-validate': null,
  success: 'gr-input--valid-success',
  error: 'gr-input--valid-error'
};

export function Input({
  isValid = DEFAULT_VALIDATION,
  icon,
  iconButton,
  className,
  disabled,
  placeholder = 'Placeholder',
  value,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: InputProps) {
  const isDisabled = Boolean(disabled);
  const hasIcon = Boolean(icon);
  const hasIconButton = Boolean(iconButton);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [innerValue, setInnerValue] = useState(() => {
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return '';
  });

  const resolvedValue = value !== undefined ? value : innerValue;
  const hasValue = Array.isArray(resolvedValue)
    ? resolvedValue.length > 0
    : resolvedValue !== null && resolvedValue !== undefined && String(resolvedValue).length > 0;

  const inputValueProps =
    value !== undefined ? { value } : defaultValue !== undefined ? { defaultValue } : undefined;

  const isStatusIcon = hasIcon && isValid !== 'not-validate';
  const shouldShowIcon = hasIcon && (!isStatusIcon || !isFocused);
  const shouldShowIconButton = hasIconButton && isFocused && hasValue;
  const hasTrailing = shouldShowIcon || shouldShowIconButton;

  const handleChange: InputProps['onChange'] = (event) => {
    if (value === undefined) {
      setInnerValue(event.target.value);
    }
    onChange?.(event);
  };
  const handleFocus: InputProps['onFocus'] = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };
  const handleBlur: InputProps['onBlur'] = (event) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleClear = () => {
    if (isDisabled) return;
    const input = inputRef.current;
    if (input) {
      const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
      descriptor?.set?.call(input, '');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    }
    if (value === undefined) {
      setInnerValue('');
    }
  };

  const renderIconButton = () => {
    if (!shouldShowIconButton) return null;
    const content = isValidElement(iconButton)
      ? (() => {
          const element = iconButton;
          return cloneElement(element, {
            onMouseDown: (event: MouseEvent) => {
              event.preventDefault();
              element.props?.onMouseDown?.(event);
            },
            onClick: (event: MouseEvent) => {
              element.props?.onClick?.(event);
              handleClear();
            }
          });
        })()
      : iconButton;
    return (
      <span
        className="gr-input__icon-button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={!isValidElement(iconButton) ? handleClear : undefined}
      >
        {content}
      </span>
    );
  };

  return (
    <div
      className={classNames(
        'gr-input',
        VALIDATION_CLASS_MAP[isValid],
        {
          'gr-input--with-icon': hasTrailing,
          'gr-input--disabled': isDisabled
        },
        className
      )}
    >
      <input
        className="gr-input__field"
        disabled={isDisabled}
        placeholder={placeholder}
        {...inputValueProps}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...rest}
      />
      {shouldShowIcon ? <span className="gr-input__icon">{icon}</span> : null}
      {renderIconButton()}
    </div>
  );
}
