import type { CSSProperties } from 'react';
import type {
  BadgeIconPosition,
  BadgeProps,
  BadgeSize,
  BadgeSurface,
  BadgeVariant
} from './Badge.types';
import { classNames } from '../utils';
import './badge.css';

const DEFAULT_SIZE: BadgeSize = 24;
const DEFAULT_VARIANT: BadgeVariant = 'default';
const DEFAULT_SURFACE: BadgeSurface = 'primary';
const DEFAULT_ICON_POSITION: BadgeIconPosition = 'left';

const SIZE_CLASS_MAP: Record<BadgeSize, string> = {
  16: 'gr-badge--16',
  20: 'gr-badge--20',
  24: 'gr-badge--24',
  32: 'gr-badge--32'
};

const VARIANT_CLASS_MAP: Record<BadgeVariant, string> = {
  default: 'gr-badge--default',
  custom: 'gr-badge--custom'
};

const SURFACE_CLASS_MAP: Record<BadgeSurface, string> = {
  primary: 'gr-badge--on-primary',
  secondary: 'gr-badge--on-secondary'
};

const resolveCssVar = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith('var(')) return trimmed;
  if (trimmed.startsWith('--')) return `var(${trimmed})`;
  return trimmed;
};

export function Badge({
  label,
  children,
  size = DEFAULT_SIZE,
  variant = DEFAULT_VARIANT,
  surface = DEFAULT_SURFACE,
  icon,
  showIcon,
  iconPosition = DEFAULT_ICON_POSITION,
  customBackground,
  customTextColor,
  customIconColor,
  className,
  ...rest
}: BadgeProps) {
  const content = children ?? label;
  const shouldShowIcon = showIcon ?? Boolean(icon);
  const isIconOnly = shouldShowIcon && !content;

  const customStyles: CSSProperties | undefined =
    variant === 'custom' &&
    (customBackground || customTextColor || customIconColor)
      ? {
          '--gr-badge-bg': resolveCssVar(customBackground),
          '--gr-badge-text-color': resolveCssVar(customTextColor),
          '--gr-badge-icon-color': resolveCssVar(customIconColor)
        }
      : undefined;

  return (
    <span
      className={classNames(
        'gr-badge',
        SIZE_CLASS_MAP[size],
        VARIANT_CLASS_MAP[variant],
        variant === 'default' ? SURFACE_CLASS_MAP[surface] : null,
        {
          'gr-badge--icon-only': isIconOnly,
          'gr-badge--icon-right': shouldShowIcon && iconPosition === 'right'
        },
        className
      )}
      style={customStyles}
      {...rest}
    >
      {shouldShowIcon && iconPosition === 'left' ? (
        <span className="gr-badge__icon">{icon}</span>
      ) : null}
      {content ? <span className="gr-badge__label">{content}</span> : null}
      {shouldShowIcon && iconPosition === 'right' ? (
        <span className="gr-badge__icon">{icon}</span>
      ) : null}
    </span>
  );
}
