import { useState } from 'react';
import { Icon } from '../../icon';
import type { IconPack, IconSize, IconVariant } from '../../icon';
import StorySection from '../storybook/components/StorySection';

const packOptions: Array<{ value: IconPack; label: string }> = [
  { value: 'web2', label: 'web2' },
  { value: 'interface', label: 'interface' },
  { value: 'interface-documents', label: 'interface-documents' }
];

const sizeOptions: IconSize[] = [16, 24, 32, 44];
const variantOptions: IconVariant[] = ['outline', 'fill'];

// Keep this list short; Icon library contains thousands of icons.
const nameOptions = [
  'info-circle',
  'check-circle',
  'warning-circle',
  'cross-circle',
  'copy',
  'link',
  'open-in-new'
];

export default function IconPropsStory() {
  const [pack, setPack] = useState<IconPack>('web2');
  const [name, setName] = useState<string>('info-circle');
  const [size, setSize] = useState<IconSize>(24);
  const [variant, setVariant] = useState<IconVariant>('outline');
  const [color, setColor] = useState<'primary' | 'secondary'>('primary');
  const [ariaLabel, setAriaLabel] = useState('');
  const colorClass = color === 'secondary' ? 'sb-icon-color--secondary' : 'sb-icon-color--primary';

  return (
    <StorySection id="icon-props" title="icon props" description="Интерактивные настройки иконки.">
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className="sb-props__canvas sb-props__canvas--light">
            <span className={`sb-icon-color ${colorClass}`}>
              <Icon
                pack={pack}
                name={name}
                size={size}
                variant={variant}
                ariaLabel={ariaLabel.trim() ? ariaLabel.trim() : undefined}
              />
            </span>
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row">
              <span className="sb-control-label">pack</span>
              <select
                className="sb-control-select"
                value={pack}
                onChange={(event) => setPack(event.target.value as IconPack)}
              >
                {packOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">name</span>
              <select
                className="sb-control-select"
                value={name}
                onChange={(event) => setName(event.target.value)}
              >
                {nameOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                      name="icon-size"
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
              <span className="sb-control-label">variant</span>
              <div className="sb-control-options">
                {variantOptions.map((option) => (
                  <label key={option} className="sb-control-option">
                    <input
                      type="radio"
                      name="icon-variant"
                      value={option}
                      checked={variant === option}
                      onChange={() => setVariant(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="sb-control-row sb-control-row--stack">
              <span className="sb-control-label">color</span>
              <div className="sb-control-options">
                {(['primary', 'secondary'] as const).map((option) => (
                  <label key={option} className="sb-control-option">
                    <input
                      type="radio"
                      name="icon-color"
                      value={option}
                      checked={color === option}
                      onChange={() => setColor(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">aria label</span>
              <input
                className="sb-control-input"
                type="text"
                value={ariaLabel}
                onChange={(event) => setAriaLabel(event.target.value)}
                placeholder="(decorative)"
              />
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
