import { useState } from 'react';
import { Input } from '../../input';
import type {
  InputDisabledAccessory,
  InputKind,
  InputPasswordVisibility,
  InputSize,
  InputValidationState
} from '../../input';
import { Icon } from '../../icon';
import StorySection from '../storybook/components/StorySection';

const stateOptions: InputValidationState[] = ['not-validate', 'success', 'error'];
const kindOptions: Array<{ value: InputKind; label: string }> = [
  { value: 'default', label: 'Default' },
  { value: 'password', label: 'Password' },
  { value: 'money', label: 'Money' },
  { value: 'phone-number', label: 'Phone number' },
  { value: 'phone-number-with-button', label: 'Phone number with button' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' }
];
const passwordVisibilityOptions: Array<{ value: InputPasswordVisibility; label: string }> = [
  { value: 'hidden', label: 'Hidden' },
  { value: 'shown', label: 'Shown' }
];
const disabledAccessoryOptions: Array<{ value: InputDisabledAccessory; label: string }> = [
  { value: 'none', label: 'No icon' },
  { value: 'copy', label: 'Copy' },
  { value: 'info', label: 'Info' }
];

const sizeOptions: Array<{ value: InputSize; label: string }> = [
  { value: 'small', label: 'Small (32)' },
  { value: 'medium', label: 'Medium (44)' },
  { value: 'large', label: 'Large (52)' },
  { value: 'xl', label: 'Extra Large (72)' }
];

export default function InputPropsStory() {
  const [size, setSize] = useState<InputSize>('medium');
  const [kind, setKind] = useState<InputKind>('default');
  const [isValid, setIsValid] = useState<InputValidationState>('not-validate');
  const [value, setValue] = useState('');
  const [useCustomPlaceholder, setUseCustomPlaceholder] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [disabledAccessory, setDisabledAccessory] = useState<InputDisabledAccessory>('none');
  const [clearable, setClearable] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState<InputPasswordVisibility>('hidden');

  const resolvedIsValid: InputValidationState = disabled ? 'not-validate' : isValid;
  const iconNode =
    resolvedIsValid === 'success' ? (
      <Icon
        name="check-circle"
        size={24}
        variant="fill"
        className="gr-input__status-icon--check"
      />
    ) : resolvedIsValid === 'error' ? (
      <Icon
        name="warning-circle"
        size={24}
        variant="fill"
        className="gr-input__status-icon--warning"
      />
    ) : null;

  return (
    <StorySection id="input-props" title="input props" description="Интерактивные настройки input.">
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className="sb-props__canvas sb-props__canvas--light">
            <Input
              size={size}
              kind={kind}
              isValid={resolvedIsValid}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={useCustomPlaceholder ? placeholder : undefined}
              disabled={disabled}
              disabledAccessory={disabledAccessory}
              clearable={clearable}
              icon={iconNode ?? undefined}
              passwordVisibility={kind === 'password' ? passwordVisibility : undefined}
              onPasswordVisibilityChange={
                kind === 'password' ? (next) => setPasswordVisibility(next) : undefined
              }
              onActionClick={
                kind === 'password' ||
                kind === 'phone-number-with-button' ||
                kind === 'date' ||
                kind === 'time'
                  ? () => {}
                  : undefined
              }
            />
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row sb-control-row--stack">
              <span className="sb-control-label">size</span>
              <div className="sb-control-options">
                {sizeOptions.map((option) => (
                  <label key={option.value} className="sb-control-option">
                    <input
                      type="radio"
                      name="input-size"
                      value={option.value}
                      checked={size === option.value}
                      onChange={() => setSize(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">kind</span>
              <select
                className="sb-control-select"
                value={kind}
                onChange={(event) => setKind(event.target.value as InputKind)}
              >
                {kindOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">is valid</span>
              <select
                className="sb-control-select"
                value={isValid}
                disabled={disabled}
                onChange={(event) => setIsValid(event.target.value as InputValidationState)}
              >
                {stateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {kind === 'default' || kind === 'money' || kind === 'phone-number' ? (
              <div className="sb-control-row">
                <span className="sb-control-label">clearable</span>
                <input
                  className="sb-control-checkbox"
                  type="checkbox"
                  checked={clearable}
                  disabled={disabled}
                  onChange={(event) => setClearable(event.target.checked)}
                />
              </div>
            ) : null}
            {kind === 'password' ? (
              <div className="sb-control-row">
                <span className="sb-control-label">password visibility</span>
                <select
                  className="sb-control-select"
                  value={passwordVisibility}
                  disabled={disabled}
                  onChange={(event) =>
                    setPasswordVisibility(event.target.value as InputPasswordVisibility)
                  }
                >
                  {passwordVisibilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className="sb-control-row">
              <span className="sb-control-label">disabled</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={disabled}
                onChange={(event) => setDisabled(event.target.checked)}
              />
            </div>
            {disabled ? (
              <div className="sb-control-row sb-control-row--stack">
                <span className="sb-control-label">disabled accessory</span>
                <div className="sb-control-options">
                  {disabledAccessoryOptions.map((option) => (
                    <label key={option.value} className="sb-control-option">
                      <input
                        type="radio"
                        name="input-disabled-accessory"
                        value={option.value}
                        checked={disabledAccessory === option.value}
                        onChange={() => setDisabledAccessory(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="sb-control-row">
              <span className="sb-control-label">value</span>
              <input
                className="sb-control-input"
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">custom placeholder</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={useCustomPlaceholder}
                onChange={(event) => setUseCustomPlaceholder(event.target.checked)}
              />
            </div>
            {useCustomPlaceholder ? (
              <div className="sb-control-row">
                <span className="sb-control-label">placeholder</span>
                <input
                  className="sb-control-input"
                  type="text"
                  value={placeholder}
                  onChange={(event) => setPlaceholder(event.target.value)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
