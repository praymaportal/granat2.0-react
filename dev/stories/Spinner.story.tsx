import { Spinner } from '../../spinner';
import type { SpinnerVariant } from '../../spinner';
import StorySection from '../storybook/components/StorySection';

const sizes = [16, 24, 44] as const;

const variants: Array<{
  id: SpinnerVariant;
  label: string;
  surface?: 'dark' | 'light';
}> = [
  { id: 'default', label: 'Default', surface: 'light' },
  { id: 'inverted', label: 'Inverted', surface: 'dark' },
  { id: 'accent', label: 'Accent', surface: 'light' },
  { id: 'negative', label: 'Negative', surface: 'light' },
  { id: 'always-white', label: 'Always White', surface: 'dark' },
  { id: 'always-black', label: 'Always Black', surface: 'light' },
  { id: 'ghost-primary', label: 'Ghost Primary', surface: 'light' },
  { id: 'ghost-secondary', label: 'Ghost Secondary', surface: 'light' }
];

export default function SpinnerStory() {
  return (
    <StorySection
      id="spinner"
      title="spinner"
      description="Вариации размера и цвета для индикатора загрузки."
    >
      <div className="sb-variants">
        <div className="sb-variants__row sb-variants__row--header">
          <div className="sb-variants__cell sb-variants__cell--label" />
          {variants.map((variant) => (
            <div key={variant.id} className="sb-variants__cell sb-variants__cell--label">
              {variant.label}
            </div>
          ))}
        </div>
        {sizes.map((size) => (
          <div key={size} className="sb-variants__row">
            <div className="sb-variants__cell sb-variants__cell--label">{size}px</div>
            {variants.map((variant) => (
              <div key={`${size}-${variant.id}`} className="sb-variants__cell">
                <div
                  className={`sb-surface ${
                    variant.surface === 'dark' ? 'sb-surface--dark' : 'sb-surface--light'
                  }`}
                >
                  <Spinner size={size} variant={variant.id} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </StorySection>
  );
}
