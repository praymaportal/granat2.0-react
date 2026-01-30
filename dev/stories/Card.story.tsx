import { Card } from '../../card';
import type { CardVariant } from '../../card';
import StorySection from '../storybook/components/StorySection';

const variants: Array<{
  id: CardVariant;
  label: string;
  surface?: 'light' | 'secondary' | 'blur';
}> = [
  { id: 'default', label: 'Default', surface: 'light' },
  { id: 'default-no-shadow', label: 'Default No Shadow', surface: 'light' },
  { id: 'grey', label: 'Grey', surface: 'secondary' },
  { id: 'transparent', label: 'Transparent', surface: 'blur' },
  { id: 'outline', label: 'Outline', surface: 'light' }
];

const shadowTokens = [
  { id: 'lowest', label: 'Lowest', className: 'sb-shadow-lowest' },
  { id: 'low', label: 'Low', className: 'sb-shadow-low' },
  { id: 'middle', label: 'Middle', className: 'sb-shadow-middle' },
  { id: 'upper-middle', label: 'Upper Middle', className: 'sb-shadow-upper-middle' },
  { id: 'high', label: 'High', className: 'sb-shadow-high' }
];

export default function CardStory() {
  return (
    <StorySection id="card" title="card" description="Фон и стили карточки.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Variants</p>
          <div className="sb-card-list">
            {variants.map((variant) => (
              <div key={variant.id} className="sb-card-row">
                <div className="sb-card-label">{variant.label}</div>
                <div
                  className={`sb-card-preview ${
                    variant.surface === 'secondary'
                      ? 'sb-card-preview--secondary'
                      : variant.surface === 'blur'
                        ? 'sb-card-preview--blur'
                        : 'sb-card-preview--light'
                  }`}
                >
                  <Card variant={variant.id} className="sb-card-demo">
                    <div className="sb-card-content">Контент карточки</div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Shadows</p>
          <div className="sb-card-shadow-grid">
            {shadowTokens.map((shadow) => (
              <div key={shadow.id} className="sb-card-shadow-item">
                <div className={`sb-card-shadow-sample ${shadow.className}`} />
                <span className="sb-card-shadow-label">{shadow.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
