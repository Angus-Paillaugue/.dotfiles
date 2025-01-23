import { pageByUrl } from '$lib/pages';

export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	const slug = decodeURIComponent(url.pathname);

	const page = pageByUrl(slug);

	return {
		...page
	};
}
