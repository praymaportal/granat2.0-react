import type { HTMLAttributes } from 'react';

export type AvatarSize = 24 | 32 | 44 | 52 | 64 | 80;

export type AvatarType =
  | 'empty-man'
  | 'empty-woman'
  | 'empty-no-gender'
  | 'empty-business'
  | 'text'
  | 'photo';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  type?: AvatarType;
  src?: string;
  alt?: string;
  text?: string;
  premium?: boolean;
  stroke?: boolean;
}
