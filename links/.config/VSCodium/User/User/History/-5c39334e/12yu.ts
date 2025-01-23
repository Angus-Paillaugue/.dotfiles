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
	const { delay = 750, callback } = config;

	let timer: ReturnType<typeof setTimeout>;

	const handleChange = () => {
		const { value } = node;
    console.log(value);

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
