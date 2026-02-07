import { Badge } from '../../badge';
import type { BadgeIconPosition, BadgeSize, BadgeSurface } from '../../badge';
import StorySection from '../storybook/components/StorySection';
import { Icon } from '../../icon';

const sizes: BadgeSize[] = [16, 20, 24, 32];

const sizeLabels: Record<BadgeSize, string> = {
  16: '16',
  20: '20',
  24: '24',
  32: '32'
};

const surfaces: Array<{ id: BadgeSurface; label: string; className: string }> = [
  { id: 'primary', label: 'On primary background', className: 'sb-badge-surface--primary' },
  { id: 'secondary', label: 'On secondary background', className: 'sb-badge-surface--secondary' }
];

const customSchemes = [
  {
    id: 'blueberry',
    label: 'Custom Blueberry',
    background: '--color-constant-blueberry-dark',
    text: '--color-constant-greyscale-0',
    icon: '--color-constant-greyscale-0'
  },
  {
    id: 'brand',
    label: 'Custom Brand',
    background: '--color-brand',
    text: '--color-constant-greyscale-0',
    icon: '--color-constant-greyscale-0'
  }
];

function renderDefaultGrid(iconPosition?: BadgeIconPosition) {
  return (
    <div className="sb-badge-grid">
      <div className="sb-badge-grid__row sb-badge-grid__row--header">
        <div className="sb-badge-grid__cell sb-badge-grid__cell--label" />
        {surfaces.map((surface) => (
          <div key={surface.id} className="sb-badge-grid__cell sb-badge-grid__cell--label">
            {surface.label}
          </div>
        ))}
      </div>
      {sizes.map((size) => {
        const iconSize = size >= 32 ? 24 : 16;
        const iconNode = iconPosition ? (
          <Icon name="plus" size={iconSize} variant="outline" />
        ) : undefined;

        return (
          <div key={size} className="sb-badge-grid__row">
            <div className="sb-badge-grid__cell sb-badge-grid__cell--label">
              {sizeLabels[size]}
            </div>
            {surfaces.map((surface) => (
              <div key={`${size}-${surface.id}`} className="sb-badge-grid__cell">
                <div className={`sb-badge-surface ${surface.className}`}>
                  <Badge
                    size={size}
                    variant="default"
                    surface={surface.id}
                    icon={iconNode}
                    showIcon={Boolean(iconPosition)}
                    iconPosition={iconPosition}
                  >
                    Badge
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function renderCustomGrid(iconPosition?: BadgeIconPosition) {
  return (
    <div className="sb-badge-grid sb-badge-grid--custom">
      <div className="sb-badge-grid__row sb-badge-grid__row--header">
        <div className="sb-badge-grid__cell sb-badge-grid__cell--label" />
        {customSchemes.map((scheme) => (
          <div key={scheme.id} className="sb-badge-grid__cell sb-badge-grid__cell--label">
            {scheme.label}
          </div>
        ))}
      </div>
      {sizes.map((size) => {
        const iconSize = size >= 32 ? 24 : 16;
        const iconNode = iconPosition ? (
          <Icon name="plus" size={iconSize} variant="outline" />
        ) : undefined;

        return (
          <div key={`custom-${size}`} className="sb-badge-grid__row">
            <div className="sb-badge-grid__cell sb-badge-grid__cell--label">
              {sizeLabels[size]}
            </div>
            {customSchemes.map((scheme) => (
              <div key={`${scheme.id}-${size}`} className="sb-badge-grid__cell">
                <div className="sb-badge-surface sb-badge-surface--primary">
                  <Badge
                    size={size}
                    variant="custom"
                    icon={iconNode}
                    showIcon={Boolean(iconPosition)}
                    iconPosition={iconPosition}
                    customBackground={scheme.background}
                    customTextColor={scheme.text}
                    customIconColor={scheme.icon}
                  >
                    Badge
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function BadgeStory() {
  return (
    <StorySection id="badge" title="badge" description="Размеры и варианты бейджа.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Default</p>
          {renderDefaultGrid()}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Default + Icon Left</p>
          {renderDefaultGrid('left')}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Default + Icon Right</p>
          {renderDefaultGrid('right')}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Custom</p>
          {renderCustomGrid()}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Custom + Icon Left</p>
          {renderCustomGrid('left')}
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Custom + Icon Right</p>
          {renderCustomGrid('right')}
        </div>
      </div>
    </StorySection>
  );
}
