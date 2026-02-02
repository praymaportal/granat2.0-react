import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import ButtonStory from '../stories/Button.story';
import ButtonPropsStory from '../stories/ButtonProps.story';
import SpinnerStory from '../stories/Spinner.story';
import SpinnerPropsStory from '../stories/SpinnerProps.story';
import IconButtonStory from '../stories/IconButton.story';
import IconButtonPropsStory from '../stories/IconButtonProps.story';
import CardStory from '../stories/Card.story';
import CardPropsStory from '../stories/CardProps.story';
import BadgeStory from '../stories/Badge.story';
import BadgePropsStory from '../stories/BadgeProps.story';
import CounterStory from '../stories/Counter.story';
import CounterPropsStory from '../stories/CounterProps.story';
import AvatarStory from '../stories/Avatar.story';
import AvatarPropsStory from '../stories/AvatarProps.story';
import LinkStory from '../stories/Link.story';
import LinkPropsStory from '../stories/LinkProps.story';
import LabelStory from '../stories/Label.story';
import LabelPropsStory from '../stories/LabelProps.story';

const navItems = [
  {
    id: 'button',
    label: 'button',
    children: [
      { id: 'button-all', label: 'all vars' },
      { id: 'button-props', label: 'button props' }
    ]
  },
  {
    id: 'icon-button',
    label: 'icon button',
    children: [
      { id: 'icon-button-all', label: 'all vars' },
      { id: 'icon-button-props', label: 'icon button props' }
    ]
  },
  {
    id: 'badge',
    label: 'badge',
    children: [
      { id: 'badge-all', label: 'all vars' },
      { id: 'badge-props', label: 'badge props' }
    ]
  },
  {
    id: 'avatar',
    label: 'avatar',
    children: [
      { id: 'avatar-all', label: 'all vars' },
      { id: 'avatar-props', label: 'avatar props' }
    ]
  },
  {
    id: 'link',
    label: 'link',
    children: [
      { id: 'link-all', label: 'all vars' },
      { id: 'link-props', label: 'link props' }
    ]
  },
  {
    id: 'label',
    label: 'label',
    children: [
      { id: 'label-all', label: 'all vars' },
      { id: 'label-props', label: 'label props' }
    ]
  },
  {
    id: 'counter',
    label: 'counter',
    children: [
      { id: 'counter-all', label: 'all vars' },
      { id: 'counter-props', label: 'counter props' }
    ]
  },
  {
    id: 'card',
    label: 'card',
    children: [
      { id: 'card-all', label: 'all vars' },
      { id: 'card-props', label: 'card props' }
    ]
  },
  {
    id: 'spinner',
    label: 'spinner',
    children: [
      { id: 'spinner-all', label: 'all vars' },
      { id: 'spinner-props', label: 'spinner props' }
    ]
  }
];

const storyMap = {
  'button-all': <ButtonStory />,
  'button-props': <ButtonPropsStory />,
  'icon-button-all': <IconButtonStory />,
  'icon-button-props': <IconButtonPropsStory />,
  'badge-all': <BadgeStory />,
  'badge-props': <BadgePropsStory />,
  'avatar-all': <AvatarStory />,
  'avatar-props': <AvatarPropsStory />,
  'link-all': <LinkStory />,
  'link-props': <LinkPropsStory />,
  'label-all': <LabelStory />,
  'label-props': <LabelPropsStory />,
  'counter-all': <CounterStory />,
  'counter-props': <CounterPropsStory />,
  'card-all': <CardStory />,
  'card-props': <CardPropsStory />,
  'spinner-all': <SpinnerStory />,
  'spinner-props': <SpinnerPropsStory />
} as const;

type StoryId = keyof typeof storyMap;

export default function StorybookApp() {
  const [activeId, setActiveId] = useState<StoryId>(() => {
    if (typeof window === 'undefined') {
      return 'button-all';
    }
    try {
      const stored = window.localStorage.getItem('granat-storybook-active');
      if (stored && stored in storyMap) {
        return stored as StoryId;
      }
    } catch {
      // ignore storage errors
    }
    return 'button-all';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem('granat-storybook-active', activeId);
    } catch {
      // ignore storage errors
    }
  }, [activeId]);

  return (
    <div className="sb-shell">
      <Sidebar items={navItems} activeId={activeId} onSelect={(id) => setActiveId(id as StoryId)} />
      <main className="sb-content">
        <div className="sb-content__inner">{storyMap[activeId]}</div>
      </main>
    </div>
  );
}
