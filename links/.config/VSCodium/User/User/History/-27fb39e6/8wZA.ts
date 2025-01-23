import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): boolean => {
	return param === 'apple' || param === 'orange';
}) satisfies ParamMatcher;
