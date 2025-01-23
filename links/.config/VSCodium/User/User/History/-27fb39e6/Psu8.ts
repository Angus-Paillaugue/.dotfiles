import type { User } from '$lib/types';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is User['username'] => {
	return param === 'apple' || param === 'orange';
}) satisfies ParamMatcher;
