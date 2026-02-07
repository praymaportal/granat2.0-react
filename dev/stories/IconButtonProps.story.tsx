import { useState } from 'react';
import { IconButton } from '../../iconbutton';
import type { IconButtonSize, IconButtonVariant } from '../../iconbutton';
import StorySection from '../storybook/components/StorySection';
import { Icon } from '../../icon';

type CanvasSurface = 'light' | 'secondary' | 'dark' | 'blur';

const sizeOptions: IconButtonSize[] = [24, 32, 44, 52, 72];

const variantOptions: Array<{ value: IconButtonVariant; label: string }> = [
  { value: 'primary', label: 'Primary' },
  { value: 'primary-alternate', label: 'Primary Alternate' },
  { value: 'always-white', label: 'Always White' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'secondary-alternate', label: 'Secondary Alternate' },
  { value: 'blur', label: 'Blur' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'ghost-secondary', label: 'Ghost Secondary' },
  { value: 'scroll', label: 'Scroll' },
  { value: 'negative', label: 'Negative' },
  { value: 'negative-alternate', label: 'Negative Alternate' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'disabled-ghost', label: 'Disabled Ghost' }
];

const surfaceMap: Record<IconButtonVariant, CanvasSurface> = {
  primary: 'light',
  'primary-alternate': 'light',
  'always-white': 'dark',
  secondary: 'light',
  'secondary-alternate': 'secondary',
  blur: 'blur',
  ghost: 'light',
  'ghost-secondary': 'secondary',
  scroll: 'blur',
  negative: 'light',
  'negative-alternate': 'secondary',
  disabled: 'light',
  'disabled-ghost': 'light'
};

const canvasClassMap: Record<CanvasSurface, string> = {
  light: 'sb-props__canvas--light',
  secondary: 'sb-props__canvas--secondary',
  dark: 'sb-props__canvas--dark',
  blur: 'sb-props__canvas--blur'
};

export default function IconButtonPropsStory() {
  const [variant, setVariant] = useState<IconButtonVariant>('primary');
  const [size, setSize] = useState<IconButtonSize>(52);
  const [label, setLabel] = useState('Кнопка');
  const [loading, setLoading] = useState(false);

  const iconSize = size <= 24 ? 16 : size <= 44 ? 24 : 32;
  const iconNode = <Icon name="plus" size={iconSize} variant="outline" />;
  const canvasClass = canvasClassMap[surfaceMap[variant]];

  return (
    <StorySection
      id="icon-button-props"
      title="icon button props"
      description="Интерактивные настройки кнопки-иконки."
    >
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className={`sb-props__canvas ${canvasClass}`}>
            <IconButton
              size={size}
              variant={variant}
              label={label}
              icon={iconNode}
              loading={loading}
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
                onChange={(event) => setVariant(event.target.value as IconButtonVariant)}
              >
                {variantOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row sb-control-row--stack">
              <span className="sb-control-label">size</span>
              <div className="sb-control-options">
                {sizeOptions.map((option) => (
                  <label key={option} className="sb-control-option">
                    <input
                      type="radio"
                      name="icon-button-size"
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
              <span className="sb-control-label">loading</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={loading}
                onChange={(event) => setLoading(event.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
