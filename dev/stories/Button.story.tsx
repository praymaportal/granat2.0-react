import { Button } from '../../button';
import type { ButtonVariant, ButtonSize, ButtonIconPosition } from '../../button';
import StorySection from '../storybook/components/StorySection';
import { Icon } from '../../icon';

const sizes: ButtonSize[] = [24, 32, 44, 52, 72];

const sizeLabels: Record<ButtonSize, string> = {
  24: '24 Extra Small',
  32: '32 Small',
  44: '44 Medium',
  52: '52 Large',
  72: '72 Extra Large'
};

const variants: Array<{
  id: ButtonVariant;
  label: string;
  surface?: 'dark' | 'light' | 'secondary';
  surfaceClass?: string;
}> = [
  { id: 'primary', label: 'Primary', surface: 'light' },
  { id: 'primary-alternate', label: 'Primary Alternate', surface: 'light' },
  { id: 'always-white', label: 'Always White', surface: 'dark' },
  { id: 'secondary', label: 'Secondary', surface: 'light' },
  { id: 'secondary-alternate', label: 'Secondary Alternate', surface: 'secondary' },
  { id: 'negative', label: 'Negative', surface: 'light' },
  { id: 'negative-alternate', label: 'Negative Alternate', surface: 'secondary' },
  { id: 'ghost', label: 'Ghost', surface: 'light' },
  { id: 'blur', label: 'Blur', surface: 'light', surfaceClass: 'sb-surface--blur' },
  { id: 'disabled', label: 'Disabled', surface: 'light' }
];

function renderButtonGrid(
  iconPosition?: ButtonIconPosition,
  loading = false,
  fluid = false
) {
  return (
    <div className="sb-button-grid">
      <div className="sb-button-grid__row sb-button-grid__row--header">
        <div className="sb-button-grid__cell sb-button-grid__cell--label" />
        {sizes.map((size) => (
          <div key={size} className="sb-button-grid__cell sb-button-grid__cell--label">
            {sizeLabels[size]}
          </div>
        ))}
      </div>
      {variants.map((variant) => (
        <div key={`${variant.id}-${iconPosition ?? 'text'}`} className="sb-button-grid__row">
          <div className="sb-button-grid__cell sb-button-grid__cell--label">{variant.label}</div>
          {sizes.map((size) => {
            const iconSize = size <= 32 ? 16 : 24;
            const iconNode = iconPosition ? (
              <Icon name="plus" size={iconSize} variant="outline" />
            ) : undefined;

            return (
              <div key={`${variant.id}-${size}`} className="sb-button-grid__cell">
                <div
                  className={`sb-surface ${
                    variant.surface === 'dark'
                      ? 'sb-surface--dark'
                      : variant.surface === 'secondary'
                        ? 'sb-surface--secondary'
                        : 'sb-surface--light'
                  } ${variant.surfaceClass ?? ''}`}
                >
                  <Button
                    size={size}
                    variant={variant.id}
                    label="Кнопка"
                    icon={iconNode}
                    showIcon={Boolean(iconPosition)}
                    iconPosition={iconPosition}
                    loading={loading}
                    fluid={fluid}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function ButtonStory() {
  return (
    <StorySection id="button" title="button" description="Типы и размеры кнопки.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Text only</p>
          {renderButtonGrid()}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Icon left</p>
          {renderButtonGrid('left')}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Icon right</p>
          {renderButtonGrid('right')}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Loading</p>
          {renderButtonGrid(undefined, true)}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Fluid</p>
          {renderButtonGrid(undefined, false, true)}
        </div>
      </div>
    </StorySection>
  );
}
