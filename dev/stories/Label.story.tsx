import { Label } from '../../label';
import type { LabelHint, LabelSize, LabelStatus } from '../../label';
import StorySection from '../storybook/components/StorySection';

type LabelRow = {
  id: string;
  label: string;
  status: LabelStatus;
  hint: LabelHint;
};

const sizes: LabelSize[] = ['other', 'xl'];

const sizeLabels: Record<LabelSize, string> = {
  other: 'Other',
  xl: 'XL'
};

const rows: LabelRow[] = [
  { id: 'default', label: 'Default', status: 'default', hint: 'none' },
  { id: 'error', label: 'Error', status: 'error', hint: 'none' },
  { id: 'disabled', label: 'Disabled', status: 'disabled', hint: 'none' },
  { id: 'info', label: 'Info', status: 'default', hint: 'info' },
  { id: 'optional', label: 'Optional', status: 'default', hint: 'optional' },
  { id: 'optional-info', label: 'Optional + Info', status: 'default', hint: 'optional-info' }
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
                  <Label size={size} status={row.status} hint={row.hint}>
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
