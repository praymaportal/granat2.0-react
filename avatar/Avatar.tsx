import type { AvatarProps, AvatarSize, AvatarType } from './Avatar.types';
import { classNames } from '../utils';
import emptyMan from './assets/empty-man.svg';
import emptyWoman from './assets/empty-woman.svg';
import emptyNoGender from './assets/empty-no-gender.svg';
import emptyBusiness from './assets/empty-business.svg';
import './avatar.css';

const DEFAULT_SIZE: AvatarSize = 64;
const DEFAULT_TYPE: AvatarType = 'empty-man';

const SIZE_CLASS_MAP: Record<AvatarSize, string> = {
  24: 'gr-avatar--24',
  32: 'gr-avatar--32',
  44: 'gr-avatar--44',
  52: 'gr-avatar--52',
  64: 'gr-avatar--64',
  80: 'gr-avatar--80'
};

const TYPE_CLASS_MAP: Record<AvatarType, string> = {
  'empty-man': 'gr-avatar--empty-man',
  'empty-woman': 'gr-avatar--empty-woman',
  'empty-no-gender': 'gr-avatar--empty-no-gender',
  'empty-business': 'gr-avatar--empty-business',
  text: 'gr-avatar--text',
  photo: 'gr-avatar--photo'
};

const EMPTY_ASSET_MAP: Record<
  Extract<AvatarType, 'empty-man' | 'empty-woman' | 'empty-no-gender' | 'empty-business'>,
  string
> = {
  'empty-man': emptyMan,
  'empty-woman': emptyWoman,
  'empty-no-gender': emptyNoGender,
  'empty-business': emptyBusiness
};

const getInitials = (value?: string) => {
  if (!value) return '';
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  const letters = parts.slice(0, 2).map((part) => part[0]);
  return letters.join('').toUpperCase();
};

export function Avatar({
  size = DEFAULT_SIZE,
  type = DEFAULT_TYPE,
  src,
  alt,
  text,
  premium = false,
  stroke = false,
  className,
  ...rest
}: AvatarProps) {
  const isPhoto = type === 'photo';
  const isText = type === 'text';
  const resolvedText = (text ?? getInitials(alt)) || 'AA';
  const iconSrc =
    type === 'empty-man' ||
    type === 'empty-woman' ||
    type === 'empty-no-gender' ||
    type === 'empty-business'
      ? EMPTY_ASSET_MAP[type]
      : undefined;
  const fallbackIcon = EMPTY_ASSET_MAP['empty-man'];

  return (
    <div
      className={classNames(
        'gr-avatar',
        SIZE_CLASS_MAP[size],
        TYPE_CLASS_MAP[type],
        {
          'gr-avatar--premium': premium,
          'gr-avatar--stroke': stroke
        },
        className
      )}
      {...(!isPhoto && {
        role: 'img',
        'aria-label': alt ?? resolvedText
      })}
      {...rest}
    >
      <span className="gr-avatar__surface">
        {isPhoto && src ? (
          <img className="gr-avatar__photo" src={src} alt={alt ?? ''} />
        ) : isText ? (
          <span className="gr-avatar__text">{resolvedText}</span>
        ) : iconSrc ? (
          <img className="gr-avatar__icon" src={iconSrc} alt="" aria-hidden="true" />
        ) : isPhoto ? (
          <img className="gr-avatar__icon" src={fallbackIcon} alt="" aria-hidden="true" />
        ) : null}
      </span>
    </div>
  );
}
