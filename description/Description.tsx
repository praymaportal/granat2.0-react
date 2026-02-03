import type { DescriptionProps, DescriptionState } from './Description.types';
import { classNames } from '../utils';
import './description.css';

const DEFAULT_STATE: DescriptionState = 'default';

const STATE_CLASS_MAP: Record<DescriptionState, string> = {
  default: 'gr-description--default',
  error: 'gr-description--error',
  success: 'gr-description--success'
};

export function Description({
  text = 'Description',
  children,
  state = DEFAULT_STATE,
  className,
  ...rest
}: DescriptionProps) {
  const content = children ?? text;

  return (
    <p className={classNames('gr-description', STATE_CLASS_MAP[state], className)} {...rest}>
      {content}
    </p>
  );
}
