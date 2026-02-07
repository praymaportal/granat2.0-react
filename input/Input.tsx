import { cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import IMask from 'imask';
import type {
  InputDisabledAccessory,
  InputKind,
  InputPasswordVisibility,
  InputProps,
  InputSize,
  InputValidationState
} from './Input.types';
import { classNames } from '../utils';
import { IconButton } from '../iconbutton';
import { Icon } from '../icon';
import './input.css';

const DEFAULT_VALIDATION: InputValidationState = 'not-validate';
const DEFAULT_DISABLED_ACCESSORY: InputDisabledAccessory = 'none';
const DEFAULT_SIZE: InputSize = 'medium';
const DEFAULT_KIND: InputKind = 'default';
const DEFAULT_PASSWORD_VISIBILITY: InputPasswordVisibility = 'hidden';
const VALIDATION_CLASS_MAP: Record<InputValidationState, string | null> = {
  'not-validate': null,
  success: 'gr-input--valid-success',
  error: 'gr-input--valid-error'
};
const SIZE_CLASS_MAP: Record<InputSize, string> = {
  small: 'gr-input--size-small',
  medium: 'gr-input--size-medium',
  large: 'gr-input--size-large',
  xl: 'gr-input--size-xl'
};

async function copyToClipboard(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback below
    }
  }

  if (typeof document === 'undefined') return false;
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function Input({
  size = DEFAULT_SIZE,
  kind = DEFAULT_KIND,
  isValid = DEFAULT_VALIDATION,
  icon,
  iconButton,
  clearable = true,
  onClear,
  onActionClick,
  disabledAccessory = DEFAULT_DISABLED_ACCESSORY,
  passwordVisibility,
  defaultPasswordVisibility = DEFAULT_PASSWORD_VISIBILITY,
  onPasswordVisibilityChange,
  className,
  disabled,
  placeholder: placeholderProp,
  type: typeProp,
  inputMode: inputModeProp,
  value,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: InputProps) {
  const isDisabled = Boolean(disabled);
  const hasIcon = Boolean(icon);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // imask typings are quite strict around factory overloads; runtime use is stable here.
  const maskRef = useRef<any>(null);

  const [uncontrolledPasswordVisibility, setUncontrolledPasswordVisibility] =
    useState<InputPasswordVisibility>(defaultPasswordVisibility);
  const resolvedPasswordVisibility = passwordVisibility ?? uncontrolledPasswordVisibility;
  const isPasswordShown = resolvedPasswordVisibility === 'shown';

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

  const placeholder = useMemo(() => {
    if (placeholderProp !== undefined) return placeholderProp;
    switch (kind) {
      case 'date':
        return 'ДД.ММ.ГГГГ';
      case 'time':
        return 'чч:мм';
      case 'money':
        return '0';
      case 'phone-number':
      case 'phone-number-with-button':
        // Keep the placeholder minimal; IMask will enforce the +7 prefix on input.
        return '+7';
      default:
        return 'Placeholder';
    }
  }, [kind, placeholderProp]);

  const isClearKind = kind === 'default' || kind === 'money' || kind === 'phone-number';
  const isActionKind =
    kind === 'password' || kind === 'phone-number-with-button' || kind === 'date' || kind === 'time';

  const maskOptions = useMemo(() => {
    switch (kind) {
      case 'phone-number':
      case 'phone-number-with-button':
        return { mask: '+{7} 000 000-00-00' } as const;
      case 'date':
        return { mask: '00.00.0000' } as const;
      case 'time':
        return { mask: '00:00' } as const;
      case 'money':
        return {
          mask: Number,
          scale: 2,
          radix: ',',
          thousandsSeparator: ' ',
          mapToRadix: ['.'],
          normalizeZeros: true
        } as const;
      default:
        return null;
    }
  }, [kind]);

  const maskKey = useMemo(() => {
    if (!maskOptions) return null;
    if (typeof maskOptions.mask === 'string') return `${kind}:${maskOptions.mask}`;
    if (maskOptions.mask === Number) return `${kind}:number`;
    return kind;
  }, [kind, maskOptions]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    if (!maskOptions) {
      maskRef.current?.destroy();
      maskRef.current = null;
      return;
    }

    // Re-create mask when kind changes.
    maskRef.current?.destroy();
    maskRef.current = IMask(input, maskOptions as any);

    // Sync initial value for uncontrolled inputs.
    if (value === undefined) {
      const next = String(resolvedValue ?? '');
      if (maskRef.current.value !== next) {
        maskRef.current.value = next;
      }
    }

    return () => {
      maskRef.current?.destroy();
      maskRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maskKey]);

  useEffect(() => {
    if (value === undefined) return;
    if (!maskRef.current) return;
    const next = String(value ?? '');
    if (maskRef.current.value !== next) {
      maskRef.current.value = next;
    }
  }, [value]);

  const inputValueProps =
    value !== undefined ? { value } : defaultValue !== undefined ? { defaultValue } : undefined;

  const isStatusIcon = hasIcon && isValid !== 'not-validate';
  const shouldShowIcon = !isDisabled && hasIcon && (!isStatusIcon || !isFocused);
  const shouldShowDisabledCopy = isDisabled && disabledAccessory === 'copy';
  const shouldShowDisabledInfo = isDisabled && disabledAccessory === 'info';
  const shouldShowClearButton = !isDisabled && isClearKind && clearable && isFocused && hasValue;
  const shouldShowActionButton = !isDisabled && isActionKind;
  const hasTrailing =
    shouldShowIcon ||
    shouldShowDisabledCopy ||
    shouldShowDisabledInfo ||
    shouldShowClearButton ||
    shouldShowActionButton;

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
      if (maskRef.current) {
        maskRef.current.value = '';
      }
      const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
      descriptor?.set?.call(input, '');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    }
    if (value === undefined) {
      setInnerValue('');
    }
    onClear?.();
  };

  const defaultClearButton = useMemo(
    () => (
      <IconButton
        size={32}
        variant="ghost-secondary"
        label="Clear"
        icon={<Icon name="cross-circle" size={24} variant="fill" />}
      />
    ),
    []
  );

  const renderClearButton = () => {
    if (!shouldShowClearButton) return null;

    const node = iconButton ?? defaultClearButton;
    const content = isValidElement(node)
      ? (() => {
          const element = node as any;
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
      : node;
    return (
      <span
        className="gr-input__icon-button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={!isValidElement(node) ? handleClear : undefined}
      >
        {content}
      </span>
    );
  };

  const renderActionButton = () => {
    if (!shouldShowActionButton) return null;

    const actionIconName =
      kind === 'password'
        ? isPasswordShown
          ? 'hide'
          : 'show'
        : kind === 'phone-number-with-button'
          ? 'contacts'
          : kind === 'date'
            ? 'calendar'
            : 'waiting';

    const handleAction = () => {
      if (kind === 'password') {
        const next: InputPasswordVisibility = isPasswordShown ? 'hidden' : 'shown';
        if (passwordVisibility === undefined) {
          setUncontrolledPasswordVisibility(next);
        }
        onPasswordVisibilityChange?.(next);
      }
      onActionClick?.();
    };

    return (
      <span className="gr-input__icon-button" onMouseDown={(event) => event.preventDefault()}>
        <IconButton
          size={32}
          variant="ghost-secondary"
          label={
            kind === 'password'
              ? isPasswordShown
                ? 'Hide password'
                : 'Show password'
              : kind === 'phone-number-with-button'
                ? 'Contacts'
                : kind === 'date'
                  ? 'Calendar'
                  : 'Time'
          }
          icon={<Icon name={actionIconName} size={24} variant="fill" />}
          onClick={handleAction}
        />
      </span>
    );
  };

  const renderDisabledAccessory = () => {
    if (shouldShowDisabledInfo) {
      return (
        <span className="gr-input__icon gr-input__icon--centered">
          <Icon name="info-circle" size={24} variant="fill" ariaLabel="Info" />
        </span>
      );
    }

    if (shouldShowDisabledCopy) {
      return (
        <span className="gr-input__icon-button">
          <IconButton
            size={32}
            variant="ghost-secondary"
            label="Copy"
            icon={<Icon name="copy" size={24} variant="fill" />}
            onClick={() => {
              void copyToClipboard(String(resolvedValue ?? ''));
            }}
          />
        </span>
      );
    }

    return null;
  };

  const inputType =
    kind === 'password' ? (isPasswordShown ? 'text' : 'password') : (typeProp ?? 'text');
  const inputMode =
    kind === 'money'
      ? 'decimal'
      : kind === 'phone-number' || kind === 'phone-number-with-button'
        ? 'tel'
        : kind === 'date' || kind === 'time'
          ? 'numeric'
          : inputModeProp;

  return (
    <div
      className={classNames(
        'gr-input',
        SIZE_CLASS_MAP[size],
        !isDisabled ? VALIDATION_CLASS_MAP[isValid] : null,
        {
          'gr-input--with-icon': hasTrailing,
          'gr-input--disabled': isDisabled,
          'gr-input--focused': isFocused,
          'gr-input--filled': hasValue,
          'gr-input--kind-password': kind === 'password',
          'gr-input--kind-money': kind === 'money',
          'gr-input--kind-phone': kind === 'phone-number' || kind === 'phone-number-with-button',
          'gr-input--kind-date': kind === 'date',
          'gr-input--kind-time': kind === 'time'
        },
        className
      )}
    >
      <input
        className="gr-input__field"
        disabled={isDisabled}
        placeholder={placeholder}
        type={inputType}
        inputMode={inputMode}
        {...inputValueProps}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...rest}
      />
      {shouldShowIcon ? <span className="gr-input__icon">{icon}</span> : null}
      {renderDisabledAccessory()}
      {renderActionButton()}
      {renderClearButton()}
    </div>
  );
}
