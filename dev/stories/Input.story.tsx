import type { ReactNode } from 'react';
import { Input } from '../../input';
import { IconButton } from '../../iconbutton';
import type { InputValidationState } from '../../input';
import StorySection from '../storybook/components/StorySection';

type StateRow = {
  id: InputValidationState;
  key: string;
  label: string;
  value?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconButton?: ReactNode;
};

const iconWarning = <span className="gr-input__icon-symbol gr-input__icon-symbol--warning" />;
const iconCheck = <span className="gr-input__icon-symbol gr-input__icon-symbol--check" />;
const clearButton = (
  <IconButton
    size={32}
    variant="ghost"
    label="Clear"
    icon={<span className="gr-input__icon-button-symbol gr-input__icon-button-symbol--cross" />}
  />
);

const states: StateRow[] = [
  { key: 'default', id: 'not-validate', label: 'Not validate' },
  { key: 'success', id: 'success', label: 'Success', value: 'Filled text', icon: iconCheck },
  { key: 'error', id: 'error', label: 'Error', icon: iconWarning },
  { key: 'disabled', id: 'not-validate', label: 'Disabled', disabled: true },
  {
    key: 'disabled-filled',
    id: 'not-validate',
    label: 'Disabled Filled',
    value: 'Filled text',
    disabled: true
  },
  { key: 'filled', id: 'not-validate', label: 'Filled', value: 'Input text' }
];

export default function InputStory() {
  return (
    <StorySection id="input" title="input" description="Состояния текстового поля.">
      <div className="sb-input-grid">
        {states.map((item) => (
          <div key={item.key} className="sb-input-row">
            <div className="sb-input-label">{item.label}</div>
            <div className="sb-input-field">
              <Input
                isValid={item.id}
                defaultValue={item.value}
                disabled={item.disabled}
                placeholder="Placeholder"
                icon={item.icon}
                iconButton={item.iconButton ?? clearButton}
              />
            </div>
          </div>
        ))}
      </div>
    </StorySection>
  );
}
