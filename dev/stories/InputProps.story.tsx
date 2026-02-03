import { useState } from 'react';
import { Input } from '../../input';
import type { InputValidationState } from '../../input';
import { IconButton } from '../../iconbutton';
import StorySection from '../storybook/components/StorySection';

const stateOptions: InputValidationState[] = ['not-validate', 'success', 'error'];

export default function InputPropsStory() {
  const [isValid, setIsValid] = useState<InputValidationState>('not-validate');
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Placeholder');
  const [disabled, setDisabled] = useState(false);

  const iconNode =
    isValid === 'success' ? (
      <span className="gr-input__icon-symbol gr-input__icon-symbol--check" aria-hidden="true" />
    ) : isValid === 'error' ? (
      <span className="gr-input__icon-symbol gr-input__icon-symbol--warning" aria-hidden="true" />
    ) : null;

  const iconButtonNode = (
    <IconButton
      size={32}
      variant="ghost"
      label="Clear"
      icon={<span className="gr-input__icon-button-symbol gr-input__icon-button-symbol--cross" />}
    />
  );

  return (
    <StorySection id="input-props" title="input props" description="Интерактивные настройки input.">
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className="sb-props__canvas sb-props__canvas--light">
            <Input
              isValid={isValid}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              icon={iconNode ?? undefined}
              iconButton={iconButtonNode}
            />
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row">
              <span className="sb-control-label">is valid</span>
              <select
                className="sb-control-select"
                value={isValid}
                onChange={(event) => setIsValid(event.target.value as InputValidationState)}
              >
                {stateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
              <span className="sb-control-label">placeholder</span>
              <input
                className="sb-control-input"
                type="text"
                value={placeholder}
                onChange={(event) => setPlaceholder(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
