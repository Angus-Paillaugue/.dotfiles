import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...c) {
  return clsx(twMerge(...c));
}
