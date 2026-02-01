import { useState } from 'react';
import { Counter } from '../../counter';
import type { CounterKind, CounterSize, CounterSurface, CounterType } from '../../counter';
import StorySection from '../storybook/components/StorySection';

const sizeOptions: CounterSize[] = [16, 20, 24];

const typeOptions: Array<{ value: CounterType; label: string }> = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'inverted', label: 'Inverted' }
];

const surfaceOptions: Array<{ value: CounterSurface; label: string }> = [
  { value: 'primary', label: 'On primary background' },
  { value: 'secondary', label: 'On secondary background' }
];

const kindOptions: Array<{ value: CounterKind; label: string }> = [
  { value: 'counter', label: 'Counter' },
  { value: 'notification', label: 'Notification' }
];

export default function CounterPropsStory() {
  const [size, setSize] = useState<CounterSize>(24);
  const [type, setType] = useState<CounterType>('primary');
  const [surface, setSurface] = useState<CounterSurface>('primary');
  const [kind, setKind] = useState<CounterKind>('counter');
  const [value, setValue] = useState(8);
  const [max, setMax] = useState(99);
  const [showPlus, setShowPlus] = useState(true);

  const canvasClass =
    surface === 'secondary' ? 'sb-props__canvas--secondary' : 'sb-props__canvas--light';

  return (
    <StorySection
      id="counter-props"
      title="counter props"
      description="Интерактивные настройки счетчика."
    >
      <div className="sb-props">
        <div className="sb-props__preview">
          <div className={`sb-props__canvas ${canvasClass}`}>
            <Counter
              size={size}
              type={type}
              surface={surface}
              kind={kind}
              value={value}
              max={max}
              showPlus={showPlus}
            />
          </div>
        </div>
        <div className="sb-props__panel">
          <div className="sb-props__panel-title">Props</div>
          <div className="sb-props__controls">
            <div className="sb-control-row">
              <span className="sb-control-label">kind</span>
              <select
                className="sb-control-select"
                value={kind}
                onChange={(event) => setKind(event.target.value as CounterKind)}
              >
                {kindOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">type</span>
              <select
                className="sb-control-select"
                value={type}
                onChange={(event) => setType(event.target.value as CounterType)}
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="sb-control-row">
              <span className="sb-control-label">surface</span>
              <select
                className="sb-control-select"
                value={surface}
                onChange={(event) => setSurface(event.target.value as CounterSurface)}
              >
                {surfaceOptions.map((option) => (
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
                      name="counter-size"
                      value={option}
                      checked={size === option}
                      onChange={() => setSize(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            {kind === 'counter' ? (
              <>
                <div className="sb-control-row">
                  <span className="sb-control-label">value</span>
                  <input
                    className="sb-control-input"
                    type="number"
                    value={value}
                    onChange={(event) => setValue(Number(event.target.value))}
                  />
                </div>
                <div className="sb-control-row">
                  <span className="sb-control-label">max</span>
                  <input
                    className="sb-control-input"
                    type="number"
                    value={max}
                    onChange={(event) => setMax(Number(event.target.value))}
                  />
                </div>
                <div className="sb-control-row">
                  <span className="sb-control-label">show plus</span>
                  <input
                    className="sb-control-checkbox"
                    type="checkbox"
                    checked={showPlus}
                    onChange={(event) => setShowPlus(event.target.checked)}
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
