import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Page {
  url: string;
  title: string;
  children?: Page[];
}

export function flattenPages(tree: Page[]): Page[] {
  const newPages: Page[] = [];
  function traverse(items: Page[]) {
    for (const item of items) {
      if (item.url) {
        newPages.push(item);
      }
      if (item.children) {
        traverse(item.children);
      }
    }
  }
  traverse(tree);
  return newPages;
}

export function slugify(path: string): string {
  return path.replace(/ /g, '-');
}
