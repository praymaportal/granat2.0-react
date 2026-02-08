import type { InputHTMLAttributes } from 'react';

export type CheckboxSize = 16 | 24 | 32;
export type CheckboxStatus = 'default' | 'error';
export type CheckboxValue = 'unchecked' | 'checked' | 'indeterminate';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'checked' | 'defaultChecked'> {
  size?: CheckboxSize;
  status?: CheckboxStatus;
  /**
   * Tri-state value:
   * - unchecked: empty
   * - checked: check mark
   * - indeterminate: minus mark
   */
  value?: CheckboxValue;
  defaultValue?: CheckboxValue;
  onValueChange?: (next: CheckboxValue) => void;
}

