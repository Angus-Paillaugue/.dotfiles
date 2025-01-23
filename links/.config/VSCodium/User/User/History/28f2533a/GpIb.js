import clsx from 'clsx';
import { merge } from 'tailwind-merge';

export function cn(...c) {
  return clsx(merge(...c));
}
