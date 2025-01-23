import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { User } from '$lib/types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isUsername(param: string): param is User['username'] {
	return /^[a-zA-Z0-9_]{3,16}$/.test(param);
}

interface DebounceConfig {
	delay?: number;
	callback: (value: string) => void;
}
export const debounce = (node: HTMLInputElement, config: DebounceConfig) => {
	const { delay = 0, callback } = config;

	let timer: ReturnType<typeof setTimeout>;

	const handleChange = () => {
		const { value } = node;

		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(value);
		}, delay);
	};

	node.addEventListener('input', handleChange);

	return {
		destroy() {
			node.removeEventListener('input', handleChange);
		}
	};
};


export const isDeepEqual = (object1: Record<string, unknown>, object2: Record<string, unknown>): boolean => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (const key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if ((isObjects && !isDeepEqual(value1 as Record<string, unknown>, value2 as Record<string, unknown>)) || (!isObjects && value1 !== value2)) {
      return false;
    }
  }
  return true;
};

const isObject = (object: unknown): object is Record<string, unknown> => {
  return object != null && typeof object === 'object';
};

export const noop = (...args: unknown[]) => {
  void args;
};
