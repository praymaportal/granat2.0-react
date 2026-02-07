import { IconButton } from '../../iconbutton';
import type { IconButtonSize, IconButtonVariant } from '../../iconbutton';
import StorySection from '../storybook/components/StorySection';
import { Icon } from '../../icon';

const sizes: IconButtonSize[] = [24, 32, 44, 52, 72];

const sizeLabels: Record<IconButtonSize, string> = {
  24: '24 Extra Small',
  32: '32 Small',
  44: '44 Medium',
  52: '52 Large',
  72: '72 Extra Large'
};

const variants: Array<{
  id: IconButtonVariant;
  label: string;
  surface?: 'dark' | 'light' | 'secondary';
  surfaceClass?: string;
}> = [
  { id: 'primary', label: 'Primary', surface: 'light' },
  { id: 'primary-alternate', label: 'Primary Alternate', surface: 'light' },
  { id: 'secondary', label: 'Secondary', surface: 'light' },
  { id: 'secondary-alternate', label: 'Secondary Alternate', surface: 'secondary' },
  { id: 'blur', label: 'Blur', surface: 'light', surfaceClass: 'sb-surface--blur' },
  { id: 'always-white', label: 'Always White', surface: 'dark' },
  { id: 'ghost', label: 'Ghost Primary', surface: 'light' },
  { id: 'ghost-secondary', label: 'Ghost Secondary', surface: 'light' },
  { id: 'scroll', label: 'Scroll', surface: 'light', surfaceClass: 'sb-surface--blur' },
  { id: 'negative', label: 'Negative', surface: 'light' },
  { id: 'negative-alternate', label: 'Negative Alternate', surface: 'secondary' },
  { id: 'disabled', label: 'Disabled', surface: 'light' },
  { id: 'disabled-ghost', label: 'Disabled Ghost', surface: 'light' }
];

function renderIconButtonGrid(loading = false) {
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
          <div key={`${variant.id}-${loading ? 'loading' : 'default'}`} className="sb-button-grid__row">
          <div className="sb-button-grid__cell sb-button-grid__cell--label">{variant.label}</div>
          {sizes.map((size) => {
            const iconSize = size <= 24 ? 16 : size <= 44 ? 24 : 32;
            const iconNode = <Icon name="plus" size={iconSize} variant="outline" />;

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
                  <IconButton
                    size={size}
                    variant={variant.id}
                    icon={iconNode}
                    label="Кнопка"
                    loading={loading}
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

export default function IconButtonStory() {
  return (
    <StorySection id="icon-button" title="icon button" description="Иконка в кнопке.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Default</p>
          {renderIconButtonGrid(false)}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Loading</p>
          {renderIconButtonGrid(true)}
        </div>
      </div>
    </StorySection>
  );
}
