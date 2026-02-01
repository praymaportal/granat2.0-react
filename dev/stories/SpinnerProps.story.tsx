import { useState } from 'react';
import { Spinner } from '../../spinner';
import type { SpinnerSize, SpinnerSpeed, SpinnerVariant } from '../../spinner';
import StorySection from '../storybook/components/StorySection';

type CanvasSurface = 'light' | 'dark';

const sizeOptions: SpinnerSize[] = [16, 24, 44];

const variantOptions: Array<{ value: SpinnerVariant; label: string }> = [
  { value: 'default', label: 'Default' },
  { value: 'inverted', label: 'Inverted' },
  { value: 'accent', label: 'Accent' },
  { value: 'negative', label: 'Negative' },
  { value: 'always-white', label: 'Always White' },
  { value: 'always-black', label: 'Always Black' },
  { value: 'ghost-primary', label: 'Ghost Primary' },
  { value: 'ghost-secondary', label: 'Ghost Secondary' }
];

const speedOptions: SpinnerSpeed[] = ['slow', 'normal', 'fast'];

const surfaceMap: Record<SpinnerVariant, CanvasSurface> = {
  default: 'light',
  inverted: 'dark',
  accent: 'light',
  negative: 'light',
  'always-white': 'dark',
  'always-black': 'light',
  'ghost-primary': 'light',
  'ghost-secondary': 'light'
};

const canvasClassMap: Record<CanvasSurface, string> = {
  light: 'sb-props__canvas--light',
  dark: 'sb-props__canvas--dark'
};

export default function SpinnerPropsStory() {
  const [size, setSize] = useState<SpinnerSize>(24);
  const [variant, setVariant] = useState<SpinnerVariant>('default');
  const [speed, setSpeed] = useState<SpinnerSpeed>('normal');
  const [label, setLabel] = useState('Загрузка');

  const canvasClass = canvasClassMap[surfaceMap[variant]];

  return (
    <StorySection
      id="spinner-props"
      title="spinner props"
      description="Интерактивные настройки спиннера."
    >
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className={`sb-props__canvas ${canvasClass}`}>
            <Spinner size={size} variant={variant} speed={speed} label={label} />
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
                onChange={(event) => setVariant(event.target.value as SpinnerVariant)}
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
                      name="spinner-size"
                      value={option}
                      checked={size === option}
                      onChange={() => setSize(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="sb-control-row sb-control-row--stack">
              <span className="sb-control-label">speed</span>
              <div className="sb-control-options">
                {speedOptions.map((option) => (
                  <label key={option} className="sb-control-option">
                    <input
                      type="radio"
                      name="spinner-speed"
                      value={option}
                      checked={speed === option}
                      onChange={() => setSpeed(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
