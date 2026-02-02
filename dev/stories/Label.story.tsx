import { Label } from '../../label';
import type { LabelSize, LabelState } from '../../label';
import StorySection from '../storybook/components/StorySection';

type LabelRow = {
  id: string;
  label: string;
  state: LabelState;
  showInfo?: boolean;
};

const sizes: LabelSize[] = ['other', 'xl'];

const sizeLabels: Record<LabelSize, string> = {
  other: 'Other',
  xl: 'XL'
};

const rows: LabelRow[] = [
  { id: 'default', label: 'Default', state: 'default' },
  { id: 'error', label: 'Error', state: 'error' },
  { id: 'disabled', label: 'Disabled', state: 'disabled' },
  { id: 'info', label: 'Info', state: 'info' },
  { id: 'optional', label: 'Optional', state: 'optional' },
  { id: 'optional-info', label: 'Optional + Info', state: 'optional', showInfo: true }
];

export default function LabelStory() {
  return (
    <StorySection id="label" title="label" description="Состояния и размеры label.">
      <div className="sb-label-grid">
        <div className="sb-label-grid__row sb-label-grid__row--header">
          <div className="sb-label-grid__cell sb-label-grid__cell--label" />
          {sizes.map((size) => (
            <div key={size} className="sb-label-grid__cell sb-label-grid__cell--label">
              {sizeLabels[size]}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.id} className="sb-label-grid__row">
            <div className="sb-label-grid__cell sb-label-grid__cell--label">{row.label}</div>
            {sizes.map((size) => (
              <div key={`${row.id}-${size}`} className="sb-label-grid__cell">
                <Label size={size} state={row.state} showInfo={row.showInfo}>
                  Label
                </Label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </StorySection>
  );
}
