import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputValidationState = 'not-validate' | 'success' | 'error';
export type InputDisabledAccessory = 'none' | 'copy' | 'info';
export type InputSize = 'small' | 'medium' | 'large' | 'xl';
export type InputKind =
  | 'default'
  | 'password'
  | 'money'
  | 'phone-number'
  | 'phone-number-with-button'
  | 'date'
  | 'time';
export type InputPasswordVisibility = 'hidden' | 'shown';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  kind?: InputKind;
  isValid?: InputValidationState;
  icon?: ReactNode;
  /**
   * Used as a custom clear button element for clearable inputs (default/money/phone-number).
   * If not provided, Input renders its own clear IconButton.
   */
  iconButton?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  /**
   * Action icon button shown for:
   * - password (toggle show/hide)
   * - phone-number-with-button (contacts)
   * - date (calendar)
   * - time (waiting/clock)
   */
  onActionClick?: () => void;
  /**
   * When input is disabled, shows a trailing accessory:
   * - none: nothing
   * - copy: ghost-secondary IconButton (copies current value)
   * - info: info-circle icon
   */
  disabledAccessory?: InputDisabledAccessory;
  passwordVisibility?: InputPasswordVisibility;
  defaultPasswordVisibility?: InputPasswordVisibility;
  onPasswordVisibilityChange?: (visibility: InputPasswordVisibility) => void;
}
