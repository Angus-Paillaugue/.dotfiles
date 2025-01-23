import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isUsername(param: string): param is User['username'] {
	return /^[a-zA-Z0-9_]{3,16}$/.test(param);
}
