import { useState } from 'react';
import { Button } from '../../button';
import type { ButtonSize, ButtonVariant } from '../../button';
import StorySection from '../storybook/components/StorySection';
import { Icon } from '../../icon';

type IconPositionOption = 'none' | 'left' | 'right';
type CanvasSurface = 'light' | 'secondary' | 'dark' | 'blur';

const sizeOptions: ButtonSize[] = [24, 32, 44, 52, 72];

const variantOptions: Array<{ value: ButtonVariant; label: string }> = [
  { value: 'primary', label: 'Primary' },
  { value: 'primary-alternate', label: 'Primary Alternate' },
  { value: 'always-white', label: 'Always White' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'secondary-alternate', label: 'Secondary Alternate' },
  { value: 'negative', label: 'Negative' },
  { value: 'negative-alternate', label: 'Negative Alternate' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'blur', label: 'Blur' },
  { value: 'disabled', label: 'Disabled' }
];

const surfaceMap: Record<ButtonVariant, CanvasSurface> = {
  primary: 'light',
  'primary-alternate': 'light',
  'always-white': 'dark',
  secondary: 'light',
  'secondary-alternate': 'secondary',
  negative: 'light',
  'negative-alternate': 'secondary',
  ghost: 'light',
  blur: 'blur',
  disabled: 'light'
};

const canvasClassMap: Record<CanvasSurface, string> = {
  light: 'sb-props__canvas--light',
  secondary: 'sb-props__canvas--secondary',
  dark: 'sb-props__canvas--dark',
  blur: 'sb-props__canvas--blur'
};

export default function ButtonPropsStory() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>(52);
  const [label, setLabel] = useState('Кнопка');
  const [iconPosition, setIconPosition] = useState<IconPositionOption>('none');
  const [loading, setLoading] = useState(false);
  const [fluid, setFluid] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const iconSize = size <= 32 ? 16 : 24;
  const showIcon = iconPosition !== 'none';
  const resolvedIconPosition = iconPosition === 'none' ? 'left' : iconPosition;
  const iconNode = showIcon ? <Icon name="plus" size={iconSize} variant="outline" /> : undefined;
  const canvasClass = canvasClassMap[surfaceMap[variant]];

  return (
    <StorySection
      id="button-props"
      title="button props"
      description="Интерактивные настройки кнопки."
    >
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className={`sb-props__canvas ${canvasClass}`}>
            <Button
              size={size}
              variant={variant}
              label={label}
              icon={iconNode}
              showIcon={showIcon}
              iconPosition={resolvedIconPosition}
              loading={loading}
              fluid={fluid}
              disabled={disabled}
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
                onChange={(event) => setVariant(event.target.value as ButtonVariant)}
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
                      name="button-size"
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
            <div className="sb-control-row">
              <span className="sb-control-label">loading</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={loading}
                onChange={(event) => setLoading(event.target.checked)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">fluid</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={fluid}
                onChange={(event) => setFluid(event.target.checked)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">disabled</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={disabled}
                onChange={(event) => setDisabled(event.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
