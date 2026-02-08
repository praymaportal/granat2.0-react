import type { InputHTMLAttributes, ReactNode } from 'react';
import type { LabelHint } from '../label';
import type { DescriptionState } from '../description';

export type InputValidationState = 'not-validate' | 'success' | 'error';
export type InputDisabledAccessory = 'none' | 'copy' | 'info';
export type InputSize = 'small' | 'medium' | 'large' | 'xl';
export type InputColor = 'on-primary-bg' | 'on-secondary-bg';
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
  /**
   * Surface behind the input. Used to adjust input background for contrast.
   * - on-primary-bg (default): input background is secondary.
   * - on-secondary-bg: input background is secondary elevated.
   */
  color?: InputColor;

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

  /**
   * Optional Label.
   * Label size is derived from input size:
   * - small/medium/large -> Label size "other"
   * - xl -> animated "xl" (centered) -> "other" (floating) on focus/filled
   */
  showLabel?: boolean;
  label?: ReactNode;
  labelHint?: LabelHint;

  /**
   * Optional Description.
   * Note: error state is always forced by input `isValid="error"` (when not disabled).
   */
  showDescription?: boolean;
  description?: ReactNode;
  descriptionState?: DescriptionState;
}
