import { Icon } from '../../icon';
import type { IconSize, IconVariant } from '../../icon';
import StorySection from '../storybook/components/StorySection';

const sizes: IconSize[] = [16, 24, 32, 44];
const variants: IconVariant[] = ['outline', 'fill'];

const iconNames = ['info-circle', 'check-circle', 'warning-circle', 'cross-circle'] as const;

export default function IconStory() {
  return (
    <StorySection id="icon" title="icon" description="Иконки из дизайн-системы.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Default</p>
          <div className="sb-button-grid">
            <div className="sb-button-grid__row sb-button-grid__row--header">
              <div className="sb-button-grid__cell sb-button-grid__cell--label" />
              {sizes.map((size) => (
                <div key={size} className="sb-button-grid__cell sb-button-grid__cell--label">
                  {size}
                </div>
              ))}
            </div>
            {iconNames.map((name) =>
              variants.map((variant) => (
                <div key={`${name}-${variant}`} className="sb-button-grid__row">
                  <div className="sb-button-grid__cell sb-button-grid__cell--label">
                    {name} / {variant}
                  </div>
                  {sizes.map((size) => (
                    <div key={`${name}-${variant}-${size}`} className="sb-button-grid__cell">
                      <Icon name={name} size={size} variant={variant} />
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
