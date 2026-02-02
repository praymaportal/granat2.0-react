import type { LinkIconPosition, LinkProps, LinkSize, LinkTone, LinkUnderline } from './Link.types';
import { classNames } from '../utils';
import './link.css';

const DEFAULT_SIZE: LinkSize = 16;
const DEFAULT_TONE: LinkTone = 'primary';
const DEFAULT_UNDERLINE: LinkUnderline = 'none';
const DEFAULT_ICON_POSITION: LinkIconPosition = 'right';
const SIZE_CLASS_MAP: Record<LinkSize, string> = {
  16: 'gr-link--16',
  20: 'gr-link--20',
  24: 'gr-link--24'
};

const TONE_CLASS_MAP: Record<LinkTone, string> = {
  primary: 'gr-link--tone-primary',
  secondary: 'gr-link--tone-secondary',
  black: 'gr-link--tone-black',
  white: 'gr-link--tone-white'
};

const UNDERLINE_CLASS_MAP: Record<LinkUnderline, string> = {
  none: 'gr-link--underline-none',
  solid: 'gr-link--underline-solid',
  dotted: 'gr-link--underline-dotted'
};

export function Link({
  label,
  children,
  size = DEFAULT_SIZE,
  tone = DEFAULT_TONE,
  underline = DEFAULT_UNDERLINE,
  icon,
  iconPosition = DEFAULT_ICON_POSITION,
  className,
  ...rest
}: LinkProps) {
  const content = children ?? label;
  const hasIcon = Boolean(icon);

  return (
    <a
      className={classNames(
        'gr-link',
        SIZE_CLASS_MAP[size],
        TONE_CLASS_MAP[tone],
        UNDERLINE_CLASS_MAP[underline],
        {
          'gr-link--with-icon': hasIcon,
          'gr-link--icon-left': hasIcon && iconPosition === 'left'
        },
        className
      )}
      {...rest}
    >
      {hasIcon && iconPosition === 'left' ? (
        <span className="gr-link__icon-wrap" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {content ? <span className="gr-link__label">{content}</span> : null}
      {hasIcon && iconPosition === 'right' ? (
        <span className="gr-link__icon-wrap" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
