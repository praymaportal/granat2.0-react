import { useState } from 'react';
import { Label } from '../../label';
import type { LabelSize, LabelState } from '../../label';
import StorySection from '../storybook/components/StorySection';

const sizeOptions: LabelSize[] = ['other', 'xl'];
const stateOptions: LabelState[] = ['default', 'error', 'disabled', 'info', 'optional'];

export default function LabelPropsStory() {
  const [text, setText] = useState('Label');
  const [size, setSize] = useState<LabelSize>('other');
  const [state, setState] = useState<LabelState>('default');
  const [showInfo, setShowInfo] = useState(false);

  return (
    <StorySection id="label-props" title="label props" description="Интерактивные настройки label.">
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className="sb-props__canvas sb-props__canvas--light">
            <Label
              label={text}
              size={size}
              state={state}
              showInfo={showInfo}
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
              <span className="sb-control-label">state</span>
              <select
                className="sb-control-select"
                value={state}
                onChange={(event) => setState(event.target.value as LabelState)}
              >
                {stateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
            {state === 'optional' ? (
              <div className="sb-control-row">
                <span className="sb-control-label">show info</span>
                <input
                  className="sb-control-checkbox"
                  type="checkbox"
                  checked={showInfo}
                  onChange={(event) => setShowInfo(event.target.checked)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
