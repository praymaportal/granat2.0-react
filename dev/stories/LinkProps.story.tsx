import { useState } from 'react';
import { Link } from '../../link';
import type { LinkIconPosition, LinkSize, LinkTone, LinkUnderline } from '../../link';
import StorySection from '../storybook/components/StorySection';

type IconType = 'none' | 'calendar' | 'external';

const sizeOptions: LinkSize[] = [16, 20, 24];
const toneOptions: LinkTone[] = ['primary', 'secondary', 'black', 'white'];
const underlineOptions: LinkUnderline[] = ['none', 'solid', 'dotted'];
const iconMap = {
  calendar: <span className="gr-link__icon gr-link__icon--calendar" aria-hidden="true" />,
  external: <span className="gr-link__icon gr-link__icon--external" aria-hidden="true" />
};

export default function LinkPropsStory() {
  const [text, setText] = useState('Link');
  const [href, setHref] = useState('#');
  const [target, setTarget] = useState<'_self' | '_blank'>('_self');
  const [size, setSize] = useState<LinkSize>(16);
  const [tone, setTone] = useState<LinkTone>('primary');
  const [underline, setUnderline] = useState<LinkUnderline>('none');
  const [iconType, setIconType] = useState<IconType>('none');
  const [iconPosition, setIconPosition] = useState<LinkIconPosition>('right');

  const icon = iconType === 'none' ? undefined : iconMap[iconType];

  return (
    <StorySection id="link-props" title="link props" description="Интерактивные настройки ссылки.">
      <div className="sb-props">
        <div className="sb-props__preview">
          <div
            className={`sb-props__canvas ${
              tone === 'white' ? 'sb-props__canvas--dark' : 'sb-props__canvas--light'
            }`}
          >
            <Link
              href={href}
              target={target}
              size={size}
              tone={tone}
              underline={underline}
              icon={icon}
              iconPosition={iconPosition}
            >
              {text}
            </Link>
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row">
              <span className="sb-control-label">text</span>
              <input
                className="sb-control-input"
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">href</span>
              <input
                className="sb-control-input"
                type="text"
                value={href}
                onChange={(event) => setHref(event.target.value)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">target</span>
              <select
                className="sb-control-select"
                value={target}
                onChange={(event) => setTarget(event.target.value as '_self' | '_blank')}
              >
                <option value="_self">_self</option>
                <option value="_blank">_blank</option>
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">tone</span>
              <select
                className="sb-control-select"
                value={tone}
                onChange={(event) => setTone(event.target.value as LinkTone)}
              >
                {toneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">underline</span>
              <select
                className="sb-control-select"
                value={underline}
                onChange={(event) => setUnderline(event.target.value as LinkUnderline)}
              >
                {underlineOptions.map((option) => (
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
                      name="link-size"
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
                value={iconType}
                onChange={(event) => setIconType(event.target.value as IconType)}
              >
                <option value="none">none</option>
                <option value="calendar">calendar</option>
                <option value="external">external</option>
              </select>
            </div>
            {iconType !== 'none' ? (
              <div className="sb-control-row">
                <span className="sb-control-label">icon position</span>
                <select
                  className="sb-control-select"
                  value={iconPosition}
                  onChange={(event) => setIconPosition(event.target.value as LinkIconPosition)}
                >
                  <option value="left">left</option>
                  <option value="right">right</option>
                </select>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
