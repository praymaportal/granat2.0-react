import { useState } from 'react';
import { Checkbox } from '../../checkbox';
import type { CheckboxSize, CheckboxStatus, CheckboxValue } from '../../checkbox';
import StorySection from '../storybook/components/StorySection';

const sizeOptions: Array<{ value: CheckboxSize; label: string }> = [
  { value: 16, label: '16 S' },
  { value: 24, label: '24 M' },
  { value: 32, label: '32 L' }
];

const statusOptions: CheckboxStatus[] = ['default', 'error'];
const valueOptions: Array<{ value: CheckboxValue; label: string }> = [
  { value: 'unchecked', label: 'Unchecked' },
  { value: 'checked', label: 'Checked' },
  { value: 'indeterminate', label: 'Indeterminate' }
];

export default function CheckboxPropsStory() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [size, setSize] = useState<CheckboxSize>(24);
  const [status, setStatus] = useState<CheckboxStatus>('default');
  const [value, setValue] = useState<CheckboxValue>('unchecked');
  const [disabled, setDisabled] = useState(false);

  return (
    <StorySection
      id="checkbox-props"
      title="checkbox props"
      description="Интерактивные настройки checkbox."
    >
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className="sb-props__canvas sb-props__canvas--light" data-mts-theme={theme}>
            <Checkbox
              size={size}
              status={status}
              value={value}
              disabled={disabled}
              onValueChange={(next) => setValue(next)}
            />
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row">
              <span className="sb-control-label">theme</span>
              <select
                className="sb-control-select"
                value={theme}
                onChange={(event) => setTheme(event.target.value as 'light' | 'dark')}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="sb-control-row sb-control-row--stack">
              <span className="sb-control-label">size</span>
              <div className="sb-control-options">
                {sizeOptions.map((option) => (
                  <label key={option.value} className="sb-control-option">
                    <input
                      type="radio"
                      name="checkbox-size"
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
              <span className="sb-control-label">status</span>
              <select
                className="sb-control-select"
                value={status}
                onChange={(event) => setStatus(event.target.value as CheckboxStatus)}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">value</span>
              <select
                className="sb-control-select"
                value={value}
                disabled={disabled}
                onChange={(event) => setValue(event.target.value as CheckboxValue)}
              >
                {valueOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">disabled</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={disabled}
                onChange={(event) => setDisabled(event.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}

