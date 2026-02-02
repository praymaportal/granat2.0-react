import type { LabelProps, LabelSize, LabelState } from './Label.types';
import { Badge } from '../badge';
import { classNames } from '../utils';
import './label.css';

const DEFAULT_SIZE: LabelSize = 'other';
const DEFAULT_STATE: LabelState = 'default';
const DEFAULT_OPTIONAL_LABEL = 'Необязательно';
const DEFAULT_FIRST_LINE = 'First Line';

export function Label({
  label = 'Label',
  children,
  size = DEFAULT_SIZE,
  state = DEFAULT_STATE,
  showInfo = false,
  twoLines = false,
  firstLine = DEFAULT_FIRST_LINE,
  optionalLabel = DEFAULT_OPTIONAL_LABEL,
  className,
  ...rest
}: LabelProps) {
  const content = children ?? label;
  const isOptional = state === 'optional';
  const isInfo = state === 'info';
  const isDisabled = state === 'disabled';
  const showInfoIcon = isInfo || (isOptional && showInfo);
  const showLockIcon = isDisabled;
  const showBadge = isOptional && Boolean(optionalLabel);

  return (
    <div
      className={classNames(
        'gr-label',
        `gr-label--${size}`,
        `gr-label--${state}`,
        {
          'gr-label--two-lines': isOptional && twoLines
        },
        className
      )}
      {...rest}
    >
      {isOptional && twoLines ? <span className="gr-label__line">{firstLine}</span> : null}
      <div className="gr-label__row">
        {content ? <span className="gr-label__text">{content}</span> : null}
        {showInfoIcon ? <span className="gr-label__icon gr-label__icon--info" aria-hidden="true" /> : null}
        {showLockIcon ? <span className="gr-label__icon gr-label__icon--lock" aria-hidden="true" /> : null}
        {showBadge ? (
          <Badge
            size={16}
            variant="custom"
            className="gr-label__badge"
            customBackground="--color-background-secondary"
            customTextColor="--color-text-secondary"
          >
            {optionalLabel}
          </Badge>
        ) : null}
      </div>
    </div>
  );
}
