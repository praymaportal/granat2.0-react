import { Link } from '../../link';
import type { LinkSize, LinkTone, LinkUnderline } from '../../link';
import StorySection from '../storybook/components/StorySection';

type Variant = {
  id: string;
  label: string;
  underline: LinkUnderline;
  iconType?: 'custom' | 'external';
  iconPosition?: 'left' | 'right';
};

const sizes: LinkSize[] = [16, 20, 24];

const sizeLabels: Record<LinkSize, string> = {
  16: '16 Small',
  20: '20 Medium',
  24: '24 Large'
};

const tones: Array<{ id: LinkTone; label: string; surface: 'light' | 'dark' }> = [
  { id: 'primary', label: 'Primary', surface: 'light' },
  { id: 'secondary', label: 'Secondary', surface: 'light' },
  { id: 'black', label: 'Black', surface: 'light' },
  { id: 'white', label: 'White', surface: 'dark' }
];

const variants: Variant[] = [
  { id: 'default', label: 'Link', underline: 'none' },
  { id: 'underline-solid', label: 'Link w straight line', underline: 'solid' },
  { id: 'underline-dotted', label: 'Link w dotted line', underline: 'dotted' },
  { id: 'external', label: 'Link External', underline: 'none', iconType: 'external', iconPosition: 'right' },
  { id: 'icon-right', label: 'Link w right icon', underline: 'none', iconType: 'custom', iconPosition: 'right' },
  { id: 'icon-left', label: 'Link w left icon', underline: 'none', iconType: 'custom', iconPosition: 'left' }
];

const iconMap = {
  custom: <span className="gr-link__icon gr-link__icon--custom" aria-hidden="true" />,
  external: <span className="gr-link__icon gr-link__icon--external" aria-hidden="true" />
};

export default function LinkStory() {
  return (
    <StorySection id="link" title="link" description="Типы, размеры и состояния ссылок.">
      <div className="sb-story-stack">
        {tones.map((tone) => (
          <div key={tone.id} className="sb-story-block">
            <p className="sb-story-block__title">{tone.label}</p>
            <div
              className={`sb-link-surface ${
                tone.surface === 'dark' ? 'sb-link-surface--dark' : 'sb-link-surface--light'
              }`}
            >
              <div className="sb-link-grid">
                <div className="sb-link-grid__row sb-link-grid__row--header">
                  <div className="sb-link-grid__cell sb-link-grid__cell--label" />
                  {variants.map((variant) => (
                    <div key={variant.id} className="sb-link-grid__cell sb-link-grid__cell--header">
                      <span className="sb-link-grid__variant">{variant.label}</span>
                    </div>
                  ))}
                </div>
                {sizes.map((size) => (
                  <div key={`${tone.id}-${size}`} className="sb-link-grid__row">
                    <div className="sb-link-grid__cell sb-link-grid__cell--label">
                      {sizeLabels[size]}
                    </div>
                    {variants.map((variant) => {
                      const icon =
                        variant.iconType ? iconMap[variant.iconType] : undefined;
                      const iconPosition = variant.iconPosition ?? 'right';

                      return (
                        <div key={`${tone.id}-${variant.id}-${size}`} className="sb-link-grid__cell">
                          <Link
                            href="#"
                            size={size}
                            tone={tone.id}
                            underline={variant.underline}
                            icon={icon}
                            iconPosition={iconPosition}
                          >
                            Link
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </StorySection>
  );
}
