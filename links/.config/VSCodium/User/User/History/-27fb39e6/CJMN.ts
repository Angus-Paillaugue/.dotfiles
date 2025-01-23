import type { User } from '$lib/types';
import { isUsername } from '$lib/utils';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is User['username'] => {
	return isUsername(param);
}) satisfies ParamMatcher;
