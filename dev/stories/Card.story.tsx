import { Card } from '../../card';
import type { CardRadius, CardSize, CardVariant } from '../../card';
import StorySection from '../storybook/components/StorySection';

const variants: Array<{
  id: CardVariant;
  label: string;
  surface?: 'light' | 'secondary' | 'blur' | 'dark';
}> = [
  { id: 'elevated', label: 'Default', surface: 'light' },
  { id: 'secondary-elevated', label: 'Default No Shadow', surface: 'secondary' },
  { id: 'secondary', label: 'Gray', surface: 'light' },
  { id: 'outline', label: 'Outline', surface: 'light' },
  { id: 'blur', label: 'Transparent Blur', surface: 'blur' },
  { id: 'transparent', label: 'Transparent', surface: 'blur' }
];

const clickableItems: Array<
  | { id: CardVariant; label: string; surface?: 'light' | 'secondary' | 'blur' | 'dark' }
  | { id: 'image'; label: string; surface?: 'light' | 'secondary' | 'blur' | 'dark' }
> = [...variants, { id: 'image', label: 'Image', surface: 'light' }];

const shadowTokens = [
  { id: 'lowest', label: 'Lowest', className: 'sb-shadow-lowest' },
  { id: 'low', label: 'Low', className: 'sb-shadow-low' },
  { id: 'middle', label: 'Middle', className: 'sb-shadow-middle' },
  { id: 'upper-middle', label: 'Upper Middle', className: 'sb-shadow-upper-middle' },
  { id: 'high', label: 'High', className: 'sb-shadow-high' }
];

const sizeSamples: Array<{
  id: string;
  label: string;
  size: CardSize;
  radius?: CardRadius;
}> = [
  { id: 's', label: 'S (radius 24)', size: 's' },
  { id: 'm-32', label: 'M (radius 32)', size: 'm', radius: 32 },
  { id: 'm-40', label: 'M (radius 40)', size: 'm', radius: 40 },
  { id: 'm-48', label: 'M (radius 48)', size: 'm', radius: 48 },
  { id: 'm-64', label: 'M (radius 64)', size: 'm', radius: 64 },
  { id: 'm-80', label: 'M (radius 80)', size: 'm', radius: 80 }
];

export default function CardStory() {
  return (
    <StorySection id="card" title="card" description="Фон и стили карточки.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Clickable</p>
          <div className="sb-card-list">
            {clickableItems.map((item) => {
              const isImage = item.id === 'image';
              const previewClass =
                item.surface === 'secondary'
                  ? 'sb-card-preview--secondary'
                  : item.surface === 'blur'
                    ? 'sb-card-preview--blur'
                    : item.surface === 'dark'
                      ? 'sb-card-preview--dark'
                      : 'sb-card-preview--light';

              return (
                <div key={item.id} className="sb-card-row">
                  <div className="sb-card-label">{item.label}</div>
                  <div className={`sb-card-preview ${previewClass}`}>
                    <Card
                      variant={isImage ? 'image' : item.id}
                      className={`sb-card-demo gr-card--interactive${isImage ? ' sb-card-demo--image' : ''}`}
                      tabIndex={0}
                      role="button"
                    >
                      {isImage ? (
                        <div className="sb-card-media sb-card-media--image" />
                      ) : (
                        <div className="sb-card-content">Наведи или кликни</div>
                      )}
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
                        : variant.surface === 'dark'
                          ? 'sb-card-preview--dark'
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
        <div className="sb-story-block">
          <p className="sb-story-block__title">Sizes</p>
          <div className="sb-card-size-grid">
            {sizeSamples.map((sample) => (
              <div key={sample.id} className="sb-card-size-item">
                <Card variant="default" size={sample.size} radius={sample.radius}>
                  <div className="sb-card-content">Контент карточки</div>
                </Card>
                <span className="sb-card-size-label">{sample.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
