import type { LabelHint, LabelOptionalColor, LabelProps, LabelSize, LabelStatus } from './Label.types';
import { Badge } from '../badge';
import { Icon } from '../icon';
import { classNames } from '../utils';
import './label.css';

const DEFAULT_SIZE: LabelSize = 'other';
const DEFAULT_STATUS: LabelStatus = 'default';
const DEFAULT_HINT: LabelHint = 'none';
const DEFAULT_OPTIONAL_COLOR: LabelOptionalColor = 'on-primary-bg';
const DEFAULT_OPTIONAL_LABEL = 'Необязательно';

export function Label({
  label = 'Label',
  children,
  size = DEFAULT_SIZE,
  status = DEFAULT_STATUS,
  hint = DEFAULT_HINT,
  optionalColor = DEFAULT_OPTIONAL_COLOR,
  className,
  ...rest
}: LabelProps) {
  const content = children ?? label;
  const isOptional = hint === 'optional' || hint === 'optional-info';
  const showInfoIcon = hint === 'info' || hint === 'optional-info';
  const isDisabled = status === 'disabled';
  const showLockIcon = isDisabled;
  const showBadge = isOptional;
  const optionalBadgeBackgroundVar =
    optionalColor === 'on-secondary-bg'
      ? '--color-background-secondary-elevated'
      : '--color-background-secondary';

  return (
    <div
      className={classNames('gr-label', `gr-label--${size}`, `gr-label--${status}`, className)}
      {...rest}
    >
      <div className="gr-label__row">
        {content ? <span className="gr-label__text">{content}</span> : null}
        {showInfoIcon ? (
          <Icon
            className="gr-label__icon gr-label__icon--info"
            name="question-circle"
            size={16}
            variant="fill"
          />
        ) : null}
        {showLockIcon ? (
          <Icon
            className="gr-label__icon gr-label__icon--lock"
            name="lock"
            size={16}
            variant="fill"
          />
        ) : null}
        {showBadge ? (
          <Badge
            size={16}
            variant="custom"
            className="gr-label__badge"
            customBackground={optionalBadgeBackgroundVar}
            customTextColor="--color-text-secondary"
          >
            {DEFAULT_OPTIONAL_LABEL}
          </Badge>
        ) : null}
      </div>
    </div>
  );
}
