import type { ReactNode } from 'react';
import { Input } from '../../input';
import { Icon } from '../../icon';
import type { InputDisabledAccessory, InputKind, InputSize, InputValidationState } from '../../input';
import StorySection from '../storybook/components/StorySection';

type StateRow = {
  id: InputValidationState;
  key: string;
  label: string;
  value?: string;
  disabled?: boolean;
  icon?: ReactNode;
  disabledAccessory?: InputDisabledAccessory;
};

const iconWarning = (
  <Icon
    name="warning-circle"
    size={24}
    variant="fill"
    className="gr-input__status-icon--warning"
  />
);
const iconCheck = (
  <Icon
    name="check-circle"
    size={24}
    variant="fill"
    className="gr-input__status-icon--check"
  />
);

const sizes: Array<{ value: InputSize; label: string }> = [
  { value: 'small', label: 'Small (32)' },
  { value: 'medium', label: 'Medium (44)' },
  { value: 'large', label: 'Large (52)' },
  { value: 'xl', label: 'Extra Large (72)' }
];

const states: StateRow[] = [
  { key: 'default', id: 'not-validate', label: 'Not validate' },
  { key: 'success', id: 'success', label: 'Success', value: 'Filled text', icon: iconCheck },
  { key: 'error', id: 'error', label: 'Error', icon: iconWarning },
  { key: 'disabled-none', id: 'not-validate', label: 'Disabled (No icon)', disabled: true },
  {
    key: 'disabled-copy',
    id: 'not-validate',
    label: 'Disabled (Copy)',
    value: 'Filled text',
    disabled: true,
    disabledAccessory: 'copy'
  },
  {
    key: 'disabled-info',
    id: 'not-validate',
    label: 'Disabled (Info)',
    value: 'Filled text',
    disabled: true,
    disabledAccessory: 'info'
  },
  { key: 'filled', id: 'not-validate', label: 'Filled', value: 'Input text' }
];

const kindRows: Array<{
  key: string;
  label: string;
  kind: InputKind;
  filledValue?: string;
}> = [
  { key: 'default', label: 'Default', kind: 'default', filledValue: 'Input text' },
  { key: 'password', label: 'Password', kind: 'password', filledValue: 'Secret' },
  { key: 'money', label: 'Money', kind: 'money', filledValue: '12 345,67' },
  { key: 'phone', label: 'Phone number', kind: 'phone-number', filledValue: '+7 916 000-00-00' },
  {
    key: 'phonebtn',
    label: 'Phone number with button',
    kind: 'phone-number-with-button',
    filledValue: '+7 916 000-00-00'
  },
  { key: 'date', label: 'Date', kind: 'date', filledValue: '31.12.2026' },
  { key: 'time', label: 'Time', kind: 'time', filledValue: '12:30' }
];

export default function InputStory() {
  return (
    <StorySection id="input" title="input" description="Состояния текстового поля.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">States</p>
          <div className="sb-input-matrix">
            <div className="sb-input-matrix__row sb-input-matrix__row--header">
              <div className="sb-input-matrix__cell sb-input-matrix__cell--label" />
              {sizes.map((size) => (
                <div
                  key={size.value}
                  className="sb-input-matrix__cell sb-input-matrix__cell--label"
                >
                  {size.label}
                </div>
              ))}
            </div>
            {states.map((item) => (
              <div key={item.key} className="sb-input-matrix__row">
                <div className="sb-input-matrix__cell sb-input-matrix__cell--label">
                  {item.label}
                </div>
                {sizes.map((size) => (
                  <div key={`${item.key}-${size.value}`} className="sb-input-matrix__cell">
                    <Input
                      size={size.value}
                      isValid={item.id}
                      defaultValue={item.value}
                      disabled={item.disabled}
                      placeholder="Placeholder"
                      icon={item.icon}
                      disabledAccessory={item.disabledAccessory}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Kinds</p>
          <div className="sb-input-matrix">
            <div className="sb-input-matrix__row sb-input-matrix__row--header">
              <div className="sb-input-matrix__cell sb-input-matrix__cell--label" />
              <div className="sb-input-matrix__cell sb-input-matrix__cell--label">Empty</div>
              <div className="sb-input-matrix__cell sb-input-matrix__cell--label">Filled</div>
            </div>
            {kindRows.map((row) => (
              <div key={row.key} className="sb-input-matrix__row">
                <div className="sb-input-matrix__cell sb-input-matrix__cell--label">
                  {row.label}
                </div>
                <div className="sb-input-matrix__cell">
                  <Input size="medium" kind={row.kind} />
                </div>
                <div className="sb-input-matrix__cell">
                  <Input size="medium" kind={row.kind} defaultValue={row.filledValue} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
