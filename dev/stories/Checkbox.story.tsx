import { Checkbox } from '../../checkbox';
import type { CheckboxSize, CheckboxStatus, CheckboxValue } from '../../checkbox';
import StorySection from '../storybook/components/StorySection';

const sizes: CheckboxSize[] = [16, 24, 32];

const rows: Array<{ label: string; status: CheckboxStatus; value: CheckboxValue }> = [
  { label: 'Default', status: 'default', value: 'unchecked' },
  { label: 'Active', status: 'default', value: 'checked' },
  { label: 'Ind.', status: 'default', value: 'indeterminate' },
  { label: 'Off', status: 'error', value: 'unchecked' },
  { label: 'Error', status: 'error', value: 'checked' },
  { label: 'Error Ind.', status: 'error', value: 'indeterminate' }
];

const disabledRows: Array<{ label: string; value: CheckboxValue }> = [
  { label: 'Off', value: 'unchecked' },
  { label: 'On', value: 'checked' },
  { label: 'Ind.', value: 'indeterminate' }
];

function CheckboxGrid({
  disabled = false
}: {
  disabled?: boolean;
}) {
  return (
    <div className="sb-checkbox-grid">
      <div className="sb-checkbox-grid__row sb-checkbox-grid__row--header">
        <div className="sb-checkbox-grid__cell sb-checkbox-grid__cell--label" />
        {sizes.map((size) => (
          <div key={size} className="sb-checkbox-grid__cell sb-checkbox-grid__cell--label">
            {size}
          </div>
        ))}
      </div>
      {disabled
        ? disabledRows.map((row) => (
            <div key={row.label} className="sb-checkbox-grid__row">
              <div className="sb-checkbox-grid__cell sb-checkbox-grid__cell--label">
                {row.label}
              </div>
              {sizes.map((size) => (
                <div key={`${row.label}-${size}`} className="sb-checkbox-grid__cell">
                  <Checkbox size={size} status="default" value={row.value} disabled />
                </div>
              ))}
            </div>
          ))
        : rows.map((row) => (
            <div key={row.label} className="sb-checkbox-grid__row">
              <div className="sb-checkbox-grid__cell sb-checkbox-grid__cell--label">
                {row.label}
              </div>
              {sizes.map((size) => (
                <div key={`${row.label}-${size}`} className="sb-checkbox-grid__cell">
                  {/* Uncontrolled, so cells are interactive while still having an initial state. */}
                  <Checkbox size={size} status={row.status} defaultValue={row.value} />
                </div>
              ))}
            </div>
          ))}
    </div>
  );
}

export default function CheckboxStory() {
  return (
    <StorySection
      id="checkbox"
      title="checkbox"
      description="Размеры и состояния чекбокса. Наведи/нажми/поставь фокус (Tab), чтобы увидеть hover/press/focus."
    >
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Hover</p>
          <div className="sb-checkbox-canvas" data-mts-theme="light">
            <CheckboxGrid />
          </div>
        </div>

        <div className="sb-story-block">
          <p className="sb-story-block__title">Focus</p>
          <div className="sb-checkbox-canvas" data-mts-theme="light">
            <CheckboxGrid />
          </div>
        </div>

        <div className="sb-story-block">
          <p className="sb-story-block__title">Press</p>
          <div className="sb-checkbox-canvas" data-mts-theme="light">
            <CheckboxGrid />
          </div>
        </div>

        <div className="sb-story-block">
          <p className="sb-story-block__title">Disabled</p>
          <div className="sb-checkbox-canvas" data-mts-theme="light">
            <CheckboxGrid disabled />
          </div>
        </div>
      </div>
    </StorySection>
  );
}
