import { useState } from 'react';
import { Avatar } from '../../avatar';
import type { AvatarSize, AvatarType } from '../../avatar';
import StorySection from '../storybook/components/StorySection';
import avatarPhoto from '../storybook/assets/avatar-photo.png';

type CanvasSurface = 'light' | 'secondary' | 'dark';

const sizeOptions: AvatarSize[] = [24, 32, 44, 52, 64, 80];

const typeOptions: Array<{ value: AvatarType; label: string }> = [
  { value: 'empty-man', label: 'Empty Man' },
  { value: 'empty-woman', label: 'Empty Woman' },
  { value: 'empty-no-gender', label: 'Empty No Gender' },
  { value: 'empty-business', label: 'Empty Business' },
  { value: 'text', label: 'Text' },
  { value: 'photo', label: 'Photo' }
];

const canvasClassMap: Record<CanvasSurface, string> = {
  light: 'sb-props__canvas--light',
  secondary: 'sb-props__canvas--secondary',
  dark: 'sb-props__canvas--dark'
};

export default function AvatarPropsStory() {
  const [size, setSize] = useState<AvatarSize>(64);
  const [type, setType] = useState<AvatarType>('empty-man');
  const [text, setText] = useState('AV');
  const [alt, setAlt] = useState('Avatar');
  const [src, setSrc] = useState(avatarPhoto);
  const [premium, setPremium] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [surface, setSurface] = useState<CanvasSurface>('light');

  const canvasClass = canvasClassMap[surface];

  return (
    <StorySection id="avatar-props" title="avatar props" description="Интерактивные настройки аватара.">
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className={`sb-props__canvas ${canvasClass}`}>
            <Avatar
              size={size}
              type={type}
              text={type === 'text' ? text : undefined}
              src={type === 'photo' ? src : undefined}
              alt={alt}
              premium={premium}
              stroke={stroke}
            />
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row">
              <span className="sb-control-label">type</span>
              <select
                className="sb-control-select"
                value={type}
                onChange={(event) => setType(event.target.value as AvatarType)}
              >
                {typeOptions.map((option) => (
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
                      name="avatar-size"
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
              <span className="sb-control-label">alt</span>
              <input
                className="sb-control-input"
                type="text"
                value={alt}
                onChange={(event) => setAlt(event.target.value)}
              />
            </div>
            {type === 'text' ? (
              <div className="sb-control-row">
                <span className="sb-control-label">text</span>
                <input
                  className="sb-control-input"
                  type="text"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </div>
            ) : null}
            {type === 'photo' ? (
              <div className="sb-control-row">
                <span className="sb-control-label">src</span>
                <input
                  className="sb-control-input"
                  type="text"
                  value={src}
                  onChange={(event) => setSrc(event.target.value)}
                />
              </div>
            ) : null}
            <div className="sb-control-row">
              <span className="sb-control-label">stroke</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={stroke}
                onChange={(event) => setStroke(event.target.checked)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">premium</span>
              <input
                className="sb-control-checkbox"
                type="checkbox"
                checked={premium}
                onChange={(event) => setPremium(event.target.checked)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">surface</span>
              <select
                className="sb-control-select"
                value={surface}
                onChange={(event) => setSurface(event.target.value as CanvasSurface)}
              >
                <option value="light">Light</option>
                <option value="secondary">Secondary</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
