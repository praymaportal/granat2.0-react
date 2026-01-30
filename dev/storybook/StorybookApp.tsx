import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ButtonStory from '../stories/Button.story';
import SpinnerStory from '../stories/Spinner.story';
import IconButtonStory from '../stories/IconButton.story';
import CardStory from '../stories/Card.story';
import BadgeStory from '../stories/Badge.story';

const navItems = [
  { id: 'button', label: 'button' },
  { id: 'icon-button', label: 'icon button' },
  { id: 'badge', label: 'badge' },
  { id: 'card', label: 'card' },
  { id: 'spinner', label: 'spinner' }
];

const storyMap = {
  button: <ButtonStory />,
  'icon-button': <IconButtonStory />,
  badge: <BadgeStory />,
  card: <CardStory />,
  spinner: <SpinnerStory />
} as const;

type StoryId = keyof typeof storyMap;

export default function StorybookApp() {
  const [activeId, setActiveId] = useState<StoryId>('button');

  return (
    <div className="sb-shell">
      <Sidebar items={navItems} activeId={activeId} onSelect={(id) => setActiveId(id as StoryId)} />
      <main className="sb-content">
        <div className="sb-content__inner">{storyMap[activeId]}</div>
      </main>
    </div>
  );
}
