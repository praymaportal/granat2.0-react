import { Avatar } from '../../avatar';
import type { AvatarSize, AvatarType } from '../../avatar';
import StorySection from '../storybook/components/StorySection';
import avatarPhoto from '../storybook/assets/avatar-photo.png';

const sizes: AvatarSize[] = [24, 32, 44, 52, 64, 80];

const typeItems: Array<{ type: AvatarType; label: string }> = [
  { type: 'empty-man', label: 'Empty Man' },
  { type: 'empty-woman', label: 'Empty Woman' },
  { type: 'empty-no-gender', label: 'Empty No Gender' },
  { type: 'empty-business', label: 'Empty Business' },
  { type: 'text', label: 'Text' },
  { type: 'photo', label: 'Photo' }
];

const surfaceItems = [
  { id: 'primary', label: 'Primary Bg', className: 'sb-avatar-surface--primary' },
  { id: 'secondary', label: 'Secondary Bg', className: 'sb-avatar-surface--secondary' },
  { id: 'dark', label: 'Dark Bg', className: 'sb-avatar-surface--dark' }
];

export default function AvatarStory() {
  return (
    <StorySection id="avatar" title="avatar" description="Типы, размеры и состояния.">
      <div className="sb-story-stack">
        <div className="sb-story-block">
          <p className="sb-story-block__title">Types</p>
          <div className="sb-avatar-type-grid">
            {typeItems.map((item) => (
              <div key={item.type} className="sb-avatar-type-item">
                <div className="sb-avatar-type-label">{item.label}</div>
                <Avatar
                  size={24}
                  type={item.type}
                  text={item.type === 'text' ? 'AV' : undefined}
                  src={item.type === 'photo' ? avatarPhoto : undefined}
                  alt="Avatar"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Sizes</p>
          <div className="sb-avatar-size-grid">
            {sizes.map((size) => (
              <div key={size} className="sb-avatar-size-item">
                <Avatar size={size} type="empty-man" alt="Avatar" />
                <span className="sb-avatar-size-label">{size}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Stroke</p>
          <div className="sb-avatar-row">
            {sizes.map((size) => (
              <Avatar key={size} size={size} type="empty-no-gender" stroke alt="Avatar" />
            ))}
          </div>
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Premium</p>
          <div className="sb-avatar-row">
            {sizes.map((size) => (
              <Avatar key={size} size={size} type="empty-woman" premium alt="Avatar" />
            ))}
          </div>
        </div>
        <div className="sb-story-block">
          <p className="sb-story-block__title">Surfaces</p>
          <div className="sb-avatar-surface-grid">
            {surfaceItems.map((surface) => (
              <div key={surface.id} className="sb-avatar-surface-item">
                <span className="sb-avatar-surface-label">{surface.label}</span>
                <div className={`sb-avatar-surface ${surface.className}`}>
                  <Avatar size={64} type="photo" src={avatarPhoto} alt="Avatar" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StorySection>
  );
}
