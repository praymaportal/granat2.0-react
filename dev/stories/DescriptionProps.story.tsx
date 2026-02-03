import { useState } from 'react';
import { Description } from '../../description';
import type { DescriptionState } from '../../description';
import StorySection from '../storybook/components/StorySection';

const stateOptions: DescriptionState[] = ['default', 'error', 'success'];

export default function DescriptionPropsStory() {
  const [text, setText] = useState('Description');
  const [state, setState] = useState<DescriptionState>('default');

  return (
    <StorySection
      id="description-props"
      title="description props"
      description="Интерактивные настройки description."
    >
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className="sb-props__canvas sb-props__canvas--light">
            <Description state={state}>{text}</Description>
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
              <span className="sb-control-label">state</span>
              <select
                className="sb-control-select"
                value={state}
                onChange={(event) => setState(event.target.value as DescriptionState)}
              >
                {stateOptions.map((option) => (
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
