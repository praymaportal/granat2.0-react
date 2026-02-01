import { useState } from 'react';
import { Card } from '../../card';
import type { CardRadius, CardSize, CardState, CardVariant } from '../../card';
import StorySection from '../storybook/components/StorySection';

type CanvasSurface = 'light' | 'secondary' | 'blur';

const variantOptions: Array<{ value: CardVariant; label: string }> = [
  { value: 'default', label: 'Default' },
  { value: 'default-no-shadow', label: 'Default No Shadow' },
  { value: 'grey', label: 'Gray' },
  { value: 'outline', label: 'Outline' },
  { value: 'blur', label: 'Transparent Blur' },
  { value: 'transparent', label: 'Transparent' },
  { value: 'image', label: 'Image' }
];

const sizeOptions: Array<{ value: CardSize; label: string }> = [
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' }
];

const radiusOptions: CardRadius[] = [32, 40, 48, 64, 80];

const stateOptions: Array<{ value: CardState; label: string }> = [
  { value: 'default', label: 'Default' },
  { value: 'hover', label: 'Hover' },
  { value: 'pressed', label: 'Pressed' },
  { value: 'focus', label: 'Focus' }
];

const surfaceMap: Record<CardVariant, CanvasSurface> = {
  default: 'light',
  'default-no-shadow': 'secondary',
  grey: 'light',
  outline: 'light',
  blur: 'blur',
  transparent: 'blur',
  image: 'light',
  elevated: 'light',
  secondary: 'light',
  'secondary-elevated': 'secondary'
};

const canvasClassMap: Record<CanvasSurface, string> = {
  light: 'sb-props__canvas--light',
  secondary: 'sb-props__canvas--secondary',
  blur: 'sb-props__canvas--blur'
};

export default function CardPropsStory() {
  const [variant, setVariant] = useState<CardVariant>('default');
  const [size, setSize] = useState<CardSize>('s');
  const [radius, setRadius] = useState<CardRadius>(32);
  const [state, setState] = useState<CardState>('default');
  const [interactive, setInteractive] = useState(false);

  const canvasClass = canvasClassMap[surfaceMap[variant]];
  const resolvedRadius = size === 'm' ? radius : undefined;
  const isImage = variant === 'image';
  const cardClassName = [
    'sb-card-demo',
    interactive ? 'gr-card--interactive' : null,
    isImage ? 'sb-card-demo--image' : null
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <StorySection id="card-props" title="card props" description="Интерактивные настройки карточки.">
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className={`sb-props__canvas ${canvasClass}`}>
            <Card
              variant={variant}
              size={size}
              radius={resolvedRadius}
              state={state}
              className={cardClassName}
              tabIndex={interactive ? 0 : undefined}
              role={interactive ? 'button' : undefined}
            >
              {isImage ? (
                <div className="sb-card-media sb-card-media--image" />
              ) : (
                <div className="sb-card-content">Контент карточки</div>
              )}
            </Card>
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row">
              <span className="sb-control-label">variant</span>
              <select
                className="sb-control-select"
                value={variant}
                onChange={(event) => setVariant(event.target.value as CardVariant)}
              >
                {variantOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">state</span>
              <select
                className="sb-control-select"
                value={state}
                onChange={(event) => setState(event.target.value as CardState)}
              >
                {stateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">interactive</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={interactive}
                onChange={(event) => setInteractive(event.target.checked)}
              />
            </div>
            <div className="sb-control-row sb-control-row--stack">
              <span className="sb-control-label">size</span>
              <div className="sb-control-options">
                {sizeOptions.map((option) => (
                  <label key={option.value} className="sb-control-option">
                    <input
                      type="radio"
                      name="card-size"
                      value={option.value}
                      checked={size === option.value}
                      onChange={() => setSize(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {size === 'm' ? (
              <div className="sb-control-row sb-control-row--stack">
                <span className="sb-control-label">radius</span>
                <div className="sb-control-options">
                  {radiusOptions.map((option) => (
                    <label key={option} className="sb-control-option">
                      <input
                        type="radio"
                        name="card-radius"
                        value={option}
                        checked={radius === option}
                        onChange={() => setRadius(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
