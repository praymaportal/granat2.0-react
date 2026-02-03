import { Description } from '../../description';
import type { DescriptionState } from '../../description';
import StorySection from '../storybook/components/StorySection';

const states: Array<{ id: DescriptionState; label: string; text: string }> = [
  { id: 'default', label: 'Default', text: 'Description' },
  { id: 'error', label: 'Error', text: 'Error text' },
  { id: 'success', label: 'Success', text: 'Success text' }
];

export default function DescriptionStory() {
  return (
    <StorySection id="description" title="description" description="Состояния вспомогательного текста.">
      <div className="sb-description-grid">
        {states.map((state) => (
          <div key={state.id} className="sb-description-row">
            <div className="sb-description-label">{state.label}</div>
            <div className="sb-description-value">
              <Description state={state.id}>{state.text}</Description>
            </div>
          </div>
        ))}
      </div>
    </StorySection>
  );
}
