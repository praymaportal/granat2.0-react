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
  const [twoLines, setTwoLines] = useState(false);
  const [firstLine, setFirstLine] = useState('First Line');
  const [optionalLabel, setOptionalLabel] = useState('Необязательно');

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
              twoLines={twoLines}
              firstLine={firstLine}
              optionalLabel={optionalLabel}
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
              <>
                <div className="sb-control-row">
                  <span className="sb-control-label">show info</span>
                  <input
                    className="sb-control-checkbox"
                    type="checkbox"
                    checked={showInfo}
                    onChange={(event) => setShowInfo(event.target.checked)}
                  />
                </div>
                <div className="sb-control-row">
                  <span className="sb-control-label">two lines</span>
                  <input
                    className="sb-control-checkbox"
                    type="checkbox"
                    checked={twoLines}
                    onChange={(event) => setTwoLines(event.target.checked)}
                  />
                </div>
                {twoLines ? (
                  <div className="sb-control-row">
                    <span className="sb-control-label">first line</span>
                    <input
                      className="sb-control-input"
                      type="text"
                      value={firstLine}
                      onChange={(event) => setFirstLine(event.target.value)}
                    />
                  </div>
                ) : null}
                <div className="sb-control-row">
                  <span className="sb-control-label">optional label</span>
                  <input
                    className="sb-control-input"
                    type="text"
                    value={optionalLabel}
                    onChange={(event) => setOptionalLabel(event.target.value)}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
