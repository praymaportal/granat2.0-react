import { useState } from 'react';
import { Badge } from '../../badge';
import type { BadgeSize, BadgeSurface, BadgeVariant } from '../../badge';
import StorySection from '../storybook/components/StorySection';
import Icon from '../storybook/components/Icon';

type IconPositionOption = 'none' | 'left' | 'right';

const sizeOptions: BadgeSize[] = [16, 20, 24, 32];

const variantOptions: Array<{ value: BadgeVariant; label: string }> = [
  { value: 'default', label: 'Default' },
  { value: 'custom', label: 'Custom' }
];

const surfaceOptions: Array<{ value: BadgeSurface; label: string }> = [
  { value: 'primary', label: 'On primary background' },
  { value: 'secondary', label: 'On secondary background' }
];

const customBackgroundOptions = [
  '--color-constant-blueberry-dark',
  '--color-accent-notification',
  '--color-brand',
  '--color-control-secondary-active',
  '--color-background-inverted',
  '--color-background-secondary'
];

const customTextOptions = [
  '--color-constant-greyscale-0',
  '--color-text-primary',
  '--color-text-inverted',
  '--color-constant-greyscale-900'
];

const customIconOptions = [
  '--color-constant-greyscale-0',
  '--color-icon-primary',
  '--color-icon-secondary',
  '--color-text-inverted'
];

export default function BadgePropsStory() {
  const [size, setSize] = useState<BadgeSize>(24);
  const [variant, setVariant] = useState<BadgeVariant>('default');
  const [surface, setSurface] = useState<BadgeSurface>('primary');
  const [label, setLabel] = useState('Badge');
  const [iconPosition, setIconPosition] = useState<IconPositionOption>('none');
  const [customBackground, setCustomBackground] = useState(customBackgroundOptions[0]);
  const [customTextColor, setCustomTextColor] = useState(customTextOptions[0]);
  const [customIconColor, setCustomIconColor] = useState(customIconOptions[0]);

  const showIcon = iconPosition !== 'none';
  const resolvedIconPosition = iconPosition === 'none' ? 'left' : iconPosition;
  const iconSize = size === 32 ? 24 : 16;
  const iconNode = showIcon ? <Icon name="plus" size={iconSize} /> : undefined;
  const canvasClass =
    surface === 'secondary' ? 'sb-props__canvas--secondary' : 'sb-props__canvas--light';

  return (
    <StorySection
      id="badge-props"
      title="badge props"
      description="Интерактивные настройки бейджа."
    >
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className={`sb-props__canvas ${canvasClass}`}>
            <Badge
              size={size}
              variant={variant}
              surface={surface}
              label={label || undefined}
              icon={iconNode}
              showIcon={showIcon}
              iconPosition={resolvedIconPosition}
              customBackground={variant === 'custom' ? customBackground : undefined}
              customTextColor={variant === 'custom' ? customTextColor : undefined}
              customIconColor={variant === 'custom' ? customIconColor : undefined}
            />
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row">
              <span className="sb-control-label">label</span>
              <input
                className="sb-control-input"
                type="text"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">variant</span>
              <select
                className="sb-control-select"
                value={variant}
                onChange={(event) => setVariant(event.target.value as BadgeVariant)}
              >
                {variantOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {variant === 'default' ? (
              <div className="sb-control-row">
                <span className="sb-control-label">surface</span>
                <select
                  className="sb-control-select"
                  value={surface}
                  onChange={(event) => setSurface(event.target.value as BadgeSurface)}
                >
                  {surfaceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className="sb-control-row sb-control-row--stack">
              <span className="sb-control-label">size</span>
              <div className="sb-control-options">
                {sizeOptions.map((option) => (
                  <label key={option} className="sb-control-option">
                    <input
                      type="radio"
                      name="badge-size"
                      value={option}
                      checked={size === option}
                      onChange={() => setSize(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">icon</span>
              <select
                className="sb-control-select"
                value={iconPosition}
                onChange={(event) => setIconPosition(event.target.value as IconPositionOption)}
              >
                <option value="none">none</option>
                <option value="left">left</option>
                <option value="right">right</option>
              </select>
            </div>
            {variant === 'custom' ? (
              <>
                <div className="sb-control-row">
                  <span className="sb-control-label">custom background</span>
                  <select
                    className="sb-control-select"
                    value={customBackground}
                    onChange={(event) => setCustomBackground(event.target.value)}
                  >
                    {customBackgroundOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sb-control-row">
                  <span className="sb-control-label">custom text</span>
                  <select
                    className="sb-control-select"
                    value={customTextColor}
                    onChange={(event) => setCustomTextColor(event.target.value)}
                  >
                    {customTextOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sb-control-row">
                  <span className="sb-control-label">custom icon</span>
                  <select
                    className="sb-control-select"
                    value={customIconColor}
                    onChange={(event) => setCustomIconColor(event.target.value)}
                  >
                    {customIconOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
