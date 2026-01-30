import { Counter } from '../../counter';
import type { CounterSize, CounterSurface, CounterType } from '../../counter';
import StorySection from '../storybook/components/StorySection';

const sizes: CounterSize[] = [16, 20, 24];
const valueSamples = [1, '99+'];

const types: Array<{ id: CounterType; label: string }> = [
  { id: 'primary', label: 'Primary' },
  { id: 'secondary', label: 'Secondary' },
  { id: 'inverted', label: 'Inverted' }
];

const surfaces: Array<{ id: CounterSurface; label: string; className: string }> = [
  { id: 'primary', label: 'On Primary Bg', className: 'sb-counter-surface--primary' },
  { id: 'secondary', label: 'On Secondary Bg', className: 'sb-counter-surface--secondary' }
];

function renderCounterGrid(surface: CounterSurface) {
  return (
    <div className="sb-counter-grid">
      <div className="sb-counter-row sb-counter-row--header">
        <div className="sb-counter-cell sb-counter-cell--label" />
        {sizes.map((size) => (
          <div key={size} className="sb-counter-cell sb-counter-cell--label">
            {size}
          </div>
        ))}
      </div>
      {types.map((type) => (
        <div key={`${surface}-${type.id}`} className="sb-counter-row">
          <div className="sb-counter-cell sb-counter-cell--label">{type.label}</div>
          {sizes.map((size) => (
            <div key={`${surface}-${type.id}-${size}`} className="sb-counter-cell">
              <div className="sb-counter-stack">
                {valueSamples.map((value) => (
                  <Counter
                    key={`${surface}-${type.id}-${size}-${value}`}
                    size={size}
                    type={type.id}
                    surface={surface}
                    value={value}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function CounterStory() {
  return (
    <StorySection id="counter" title="counter" description="Размеры и варианты счетчика.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Notification</p>
          <div className="sb-counter-dot-row">
            <Counter kind="notification" type="primary" />
            <Counter kind="notification" type="inverted" />
          </div>
        </div>
        {surfaces.map((surface) => (
          <div key={surface.id} className="sb-story-block">
            <p className="sb-story-block__title">{surface.label}</p>
            <div className={`sb-counter-surface ${surface.className}`}>
              {renderCounterGrid(surface.id)}
            </div>
          </div>
        ))}
      </div>
    </StorySection>
  );
}
