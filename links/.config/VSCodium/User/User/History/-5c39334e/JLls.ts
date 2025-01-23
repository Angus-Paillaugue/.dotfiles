import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { User } from '$lib/types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isUsername(param: string): param is User['username'] {
	return /^[a-zA-Z0-9_]{3,16}$/.test(param);
}

export const debounce = (node: HTMLElement, config) => {
	const { delay = 750, callback } = config;

	let timer;

	const handleChange = (e) => {
		const { value } = e.target;

		clearTimeout(timer);
		timer = window.setTimeout(() => {
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
