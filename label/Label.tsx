import type { LabelProps, LabelSize, LabelState } from './Label.types';
import { Badge } from '../badge';
import { Icon } from '../icon';
import { classNames } from '../utils';
import './label.css';

const DEFAULT_SIZE: LabelSize = 'other';
const DEFAULT_STATE: LabelState = 'default';
const DEFAULT_OPTIONAL_LABEL = 'Необязательно';

export function Label({
  label = 'Label',
  children,
  size = DEFAULT_SIZE,
  state = DEFAULT_STATE,
  showInfo = false,
  className,
  ...rest
}: LabelProps) {
  const content = children ?? label;
  const isOptional = state === 'optional';
  const isInfo = state === 'info';
  const isDisabled = state === 'disabled';
  const showInfoIcon = isInfo || (isOptional && showInfo);
  const showLockIcon = isDisabled;
  const showBadge = isOptional;

  return (
    <div
      className={classNames(
        'gr-label',
        `gr-label--${size}`,
        `gr-label--${state}`,
        className
      )}
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
            customBackground="--color-background-secondary"
            customTextColor="--color-text-secondary"
          >
            {DEFAULT_OPTIONAL_LABEL}
          </Badge>
        ) : null}
      </div>
    </div>
  );
}
