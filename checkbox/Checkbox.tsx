import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { CheckboxProps, CheckboxSize, CheckboxStatus, CheckboxValue } from './Checkbox.types';
import { classNames } from '../utils';
import './checkbox.css';

const DEFAULT_SIZE: CheckboxSize = 24;
const DEFAULT_STATUS: CheckboxStatus = 'default';
const DEFAULT_VALUE: CheckboxValue = 'unchecked';

const SIZE_CLASS_MAP: Record<CheckboxSize, string> = {
  16: 'gr-checkbox--16',
  24: 'gr-checkbox--24',
  32: 'gr-checkbox--32'
};

const SVG_PATHS: Record<
  CheckboxSize,
  {
    viewBox: string;
    defaultShapeD: string;
    activeShapeD: string;
    checkD: string;
    checkTransform?: string;
    minusD: string;
    minusTransform?: string;
  }
> = {
  16: {
    viewBox: '0 0 12 12',
    // checkbox-default-16.svg
    defaultShapeD:
      'M6 0.75C6.44485 0.75 6.89239 0.769256 7.3291 0.801758C9.12348 0.935305 9.69796 1.00655 10.3457 1.6543C10.9934 2.30204 11.0647 2.87652 11.1982 4.6709C11.2307 5.10761 11.25 5.55515 11.25 6C11.25 6.44485 11.2307 6.89239 11.1982 7.3291C11.0647 9.12348 10.9934 9.69796 10.3457 10.3457C9.69796 10.9934 9.12348 11.0647 7.3291 11.1982C6.89239 11.2307 6.44485 11.25 6 11.25C5.55515 11.25 5.10761 11.2307 4.6709 11.1982C2.87652 11.0647 2.30204 10.9934 1.6543 10.3457C1.00655 9.69796 0.935305 9.12348 0.801758 7.3291C0.769256 6.89239 0.75 6.44485 0.75 6C0.75 5.55515 0.769256 5.10761 0.801758 4.6709C0.935305 2.87652 1.00655 2.30204 1.6543 1.6543C2.30204 1.00655 2.87652 0.935305 4.6709 0.801758C5.10761 0.769256 5.55515 0.75 6 0.75Z',
    // checkbox-checked-16.svg / checkbox-indeterminate-16.svg (bg)
    activeShapeD:
      'M0.0540354 4.61522C0.183832 2.87122 0.24873 1.99923 1.12398 1.12398C1.99923 0.24873 2.87122 0.183832 4.61522 0.0540354C5.0673 0.0203889 5.53365 0 6 0C6.46635 0 6.9327 0.0203889 7.38479 0.0540354C9.12878 0.183832 10.0008 0.24873 10.876 1.12398C11.7513 1.99923 11.8162 2.87122 11.946 4.61522C11.9796 5.0673 12 5.53365 12 6C12 6.46635 11.9796 6.9327 11.946 7.38479C11.8162 9.12878 11.7513 10.0008 10.876 10.876C10.0008 11.7513 9.12878 11.8162 7.38478 11.946C6.9327 11.9796 6.46635 12 6 12C5.53365 12 5.0673 11.9796 4.61522 11.946C2.87122 11.8162 1.99923 11.7513 1.12398 10.876C0.24873 10.0008 0.183832 9.12878 0.0540354 7.38478C0.0203889 6.9327 0 6.46635 0 6C0 5.53365 0.0203889 5.0673 0.0540354 4.61522Z',
    // checkbox-checked-16.svg
    checkD:
      'M8.78118 4.94441C9.07409 4.65153 9.07411 4.17666 8.78123 3.88375C8.48834 3.59085 8.01347 3.59083 7.72057 3.88371L5.33334 6.27075L4.28229 5.21968C3.98939 4.92679 3.51452 4.92679 3.22163 5.21968C2.92873 5.51257 2.92873 5.98744 3.22162 6.28034L4.80299 7.86172C5.09587 8.1546 5.57073 8.15461 5.86363 7.86174L8.78118 4.94441Z',
    // checkbox-indeterminate-16.svg
    minusD:
      'M3.75 5.25C3.33579 5.25 3 5.58579 3 6C3 6.41421 3.33579 6.75 3.75 6.75H8.25029C8.66451 6.75 9.00029 6.41421 9.00029 6C9.00029 5.58579 8.66451 5.25 8.25029 5.25H3.75Z'
  },
  24: {
    viewBox: '0 0 18 18',
    // checkbox-default-24.svg
    defaultShapeD:
      'M9 0.75C9.67803 0.75 10.3587 0.779776 11.0215 0.829102C13.6879 1.02755 14.6988 1.13045 15.7842 2.21582C16.8696 3.30119 16.9725 4.31214 17.1709 6.97852C17.2202 7.64127 17.25 8.32197 17.25 9C17.25 9.67803 17.2202 10.3587 17.1709 11.0215C16.9725 13.6879 16.8696 14.6988 15.7842 15.7842C14.6988 16.8696 13.6879 16.9725 11.0215 17.1709C10.3587 17.2202 9.67803 17.25 9 17.25C8.32197 17.25 7.64127 17.2202 6.97852 17.1709C4.31214 16.9725 3.30119 16.8696 2.21582 15.7842C1.13045 14.6988 1.02755 13.6879 0.829102 11.0215C0.779776 10.3587 0.75 9.67803 0.75 9C0.75 8.32197 0.779776 7.64127 0.829102 6.97852C1.02755 4.31214 1.13045 3.30119 2.21582 2.21582C3.30119 1.13045 4.31214 1.02755 6.97852 0.829102C7.64127 0.779776 8.32197 0.75 9 0.75Z',
    // checkbox-indeterminate-24.svg (bg)
    activeShapeD:
      'M0.0810531 6.92282C0.275748 4.30684 0.373095 2.99884 1.68597 1.68597C2.99884 0.373095 4.30684 0.275748 6.92282 0.0810532C7.60095 0.0305834 8.30048 0 9 0C9.69952 0 10.399 0.0305833 11.0772 0.0810531C13.6932 0.275748 15.0012 0.373095 16.314 1.68597C17.6269 2.99884 17.7243 4.30684 17.9189 6.92282C17.9694 7.60095 18 8.30048 18 9C18 9.69952 17.9694 10.399 17.9189 11.0772C17.7243 13.6932 17.6269 15.0012 16.314 16.314C15.0012 17.6269 13.6932 17.7243 11.0772 17.9189C10.399 17.9694 9.69952 18 9 18C8.30048 18 7.60095 17.9694 6.92282 17.9189C4.30684 17.7243 2.99884 17.6269 1.68597 16.314C0.373095 15.0012 0.275748 13.6932 0.0810532 11.0772C0.0305834 10.399 0 9.69952 0 9C0 8.30048 0.0305833 7.60095 0.0810531 6.92282Z',
    // checkbox-checked-24.svg
    checkD:
      'M17.3849 7.61221C17.873 8.10037 17.873 8.89182 17.3849 9.37998L11.3849 15.38C10.8967 15.8681 10.1052 15.8681 9.61709 15.38L7.11709 12.88C6.62894 12.3918 6.62894 11.6004 7.11709 11.1122C7.60525 10.6241 8.3967 10.6241 8.88486 11.1122L10.501 12.7283L15.6171 7.61221C16.1052 7.12405 16.8967 7.12405 17.3849 7.61221Z',
    // checkbox-checked-24.svg appears to be exported in a 24x24 coordinate space.
    // Our 24px checkbox icon uses an 18x18 viewBox, so we scale the glyph down.
    checkTransform: 'scale(0.75)',
    // checkbox-indeterminate-24.svg
    minusD:
      'M6 8C5.44772 8 5 8.44771 5 9C5 9.55228 5.44772 10 6 10H12C12.5523 10 13 9.55229 13 9C13 8.44772 12.5523 8 12 8L6 8Z'
  },
  32: {
    viewBox: '0 0 24 24',
    // checkbox-default-32.svg
    defaultShapeD:
      'M12 1C12.904 1 13.8116 1.0397 14.6953 1.10547C18.2505 1.37006 19.5978 1.50792 21.0449 2.95508C22.4921 4.40224 22.6299 5.74952 22.8945 9.30469C22.9603 10.1884 23 11.096 23 12C23 12.904 22.9603 13.8116 22.8945 14.6953C22.6299 18.2505 22.4921 19.5978 21.0449 21.0449C19.5978 22.4921 18.2505 22.6299 14.6953 22.8945C13.8116 22.9603 12.904 23 12 23C11.096 23 10.1884 22.9603 9.30469 22.8945C5.74952 22.6299 4.40224 22.4921 2.95508 21.0449C1.50792 19.5978 1.37006 18.2505 1.10547 14.6953C1.0397 13.8116 1 12.904 1 12C1 11.096 1.0397 10.1884 1.10547 9.30469C1.37006 5.74952 1.50792 4.40224 2.95508 2.95508C4.40224 1.50792 5.74952 1.37006 9.30469 1.10547C10.1884 1.0397 11.096 1 12 1Z',
    // checkbox-checked-32.svg / checkbox-indeterminate-32.svg (bg)
    activeShapeD:
      'M0.108071 9.23043C0.367664 5.74245 0.49746 3.99846 2.24796 2.24796C3.99846 0.49746 5.74245 0.367664 9.23043 0.108071C10.1346 0.0407778 11.0673 0 12 0C12.9327 0 13.8654 0.0407778 14.7696 0.108071C18.2576 0.367664 20.0015 0.49746 21.752 2.24796C23.5025 3.99846 23.6323 5.74245 23.8919 9.23043C23.9592 10.1346 24 11.0673 24 12C24 12.9327 23.9592 13.8654 23.8919 14.7696C23.6323 18.2576 23.5025 20.0015 21.752 21.752C20.0015 23.5025 18.2576 23.6323 14.7696 23.8919C13.8654 23.9592 12.9327 24 12 24C11.0673 24 10.1346 23.9592 9.23043 23.8919C5.74245 23.6323 3.99846 23.5025 2.24796 21.752C0.49746 20.0015 0.367664 18.2576 0.108071 14.7696C0.0407778 13.8654 0 12.9327 0 12C0 11.0673 0.0407778 10.1346 0.108071 9.23043Z',
    // checkbox-checked-32.svg
    checkD:
      'M17.3849 7.61221C17.873 8.10037 17.873 8.89182 17.3849 9.37998L11.3849 15.38C10.8967 15.8681 10.1052 15.8681 9.61709 15.38L7.11709 12.88C6.62894 12.3918 6.62894 11.6004 7.11709 11.1122C7.60525 10.6241 8.3967 10.6241 8.88486 11.1122L10.501 12.7283L15.6171 7.61221C16.1052 7.12405 16.8967 7.12405 17.3849 7.61221Z',
    // checkbox-indeterminate-32.svg
    minusD:
      'M8.00098 10.7461C7.31062 10.7461 6.75098 11.3057 6.75098 11.9961C6.75098 12.6865 7.31062 13.2461 8.00098 13.2461H16.001C16.6913 13.2461 17.251 12.6865 17.251 11.9961C17.251 11.3057 16.6913 10.7461 16.001 10.7461H8.00098Z'
  }
};

function normalizeValue(value?: CheckboxValue): CheckboxValue {
  return value ?? DEFAULT_VALUE;
}

function nextValueFromInput(checked: boolean): CheckboxValue {
  return checked ? 'checked' : 'unchecked';
}

export function Checkbox({
  size = DEFAULT_SIZE,
  status = DEFAULT_STATUS,
  value,
  defaultValue = DEFAULT_VALUE,
  onValueChange,
  className,
  disabled,
  onChange,
  ...rest
}: CheckboxProps) {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<CheckboxValue>(defaultValue);
  const resolvedValue = normalizeValue(isControlled ? value : innerValue);

  const inputRef = useRef<HTMLInputElement>(null);
  const isIndeterminate = resolvedValue === 'indeterminate';
  const isChecked = resolvedValue === 'checked';
  const svg = SVG_PATHS[size];

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    // For indeterminate, browsers will toggle `checked` and clear `indeterminate` on click.
    // We treat indeterminate as a dedicated value and let the consumer control it if needed.
    const next = nextValueFromInput(event.target.checked);

    if (!isControlled) {
      setInnerValue(next);
    }
    onValueChange?.(next);
    onChange?.(event);
  };

  return (
    <span
      className={classNames(
        'gr-checkbox',
        SIZE_CLASS_MAP[size],
        `gr-checkbox--status-${status}`,
        {
          'gr-checkbox--checked': isChecked,
          'gr-checkbox--indeterminate': isIndeterminate,
          'gr-checkbox--disabled': Boolean(disabled)
        },
        className
      )}
    >
      <input
        ref={inputRef}
        className="gr-checkbox__input"
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <svg
        className="gr-checkbox__icon"
        viewBox={svg.viewBox}
        aria-hidden="true"
        focusable="false"
      >
        {/* Default state (bg + border). */}
        <path className="gr-checkbox__icon-default" d={svg.defaultShapeD} />

        {/* Active state background (checked/indeterminate). */}
        <path className="gr-checkbox__icon-active" d={svg.activeShapeD} />

        {/* Mark glyphs. */}
        <path
          className="gr-checkbox__icon-check"
          d={svg.checkD}
          transform={svg.checkTransform}
        />
        <path
          className="gr-checkbox__icon-minus"
          d={svg.minusD}
          transform={svg.minusTransform}
        />

        {/* Hover overlay. */}
        <path className="gr-checkbox__icon-opacity" d={svg.activeShapeD} />
      </svg>
    </span>
  );
}
