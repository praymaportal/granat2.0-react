import { useState } from 'react';
import { Label } from '../../label';
import type { LabelHint, LabelOptionalColor, LabelSize, LabelStatus } from '../../label';
import StorySection from '../storybook/components/StorySection';

const sizeOptions: LabelSize[] = ['other', 'xl'];
const statusOptions: LabelStatus[] = ['default', 'error', 'disabled'];
const hintOptions: Array<{ value: LabelHint; label: string }> = [
  { value: 'none', label: 'None' },
  { value: 'info', label: 'Info' },
  { value: 'optional', label: 'Optional' },
  { value: 'optional-info', label: 'Info + Optional' }
];
const optionalColorOptions: Array<{ value: LabelOptionalColor; label: string }> = [
  { value: 'on-primary-bg', label: 'On primary background' },
  { value: 'on-secondary-bg', label: 'On secondary background' }
];

export default function LabelPropsStory() {
  const [text, setText] = useState('Label');
  const [size, setSize] = useState<LabelSize>('other');
  const [status, setStatus] = useState<LabelStatus>('default');
  const [hint, setHint] = useState<LabelHint>('none');
  const [optionalColor, setOptionalColor] = useState<LabelOptionalColor>('on-primary-bg');

  const canvasClass =
    optionalColor === 'on-secondary-bg' ? 'sb-props__canvas--secondary' : 'sb-props__canvas--light';

  return (
    <StorySection id="label-props" title="label props" description="Интерактивные настройки label.">
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className={`sb-props__canvas ${canvasClass}`}>
            <Label
              label={text}
              size={size}
              status={status}
              hint={hint}
              optionalColor={optionalColor}
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
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">status</span>
              <select
                className="sb-control-select"
                value={status}
                onChange={(event) => setStatus(event.target.value as LabelStatus)}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">hint</span>
              <select
                className="sb-control-select"
                value={hint}
                onChange={(event) => setHint(event.target.value as LabelHint)}
              >
                {hintOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">optional color</span>
              <select
                className="sb-control-select"
                value={optionalColor}
                onChange={(event) => setOptionalColor(event.target.value as LabelOptionalColor)}
              >
                {optionalColorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">size</span>
              <select
                className="sb-control-select"
                value={size}
                onChange={(event) => setSize(event.target.value as LabelSize)}
              >
                {sizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </StorySection>
  );
}
