import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Appends strings of classes. If non-truthy values are passed, they are ignored.
 * Uses tailwind-merge to merge tailwind classes.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
