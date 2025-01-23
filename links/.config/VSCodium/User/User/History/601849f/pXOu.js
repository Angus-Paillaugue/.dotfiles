import { pageByUrl } from '$lib/pages';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  
	const page = pageByUrl(slug);
	if (!page) {
		const error = {
			status: 404,
			message: `Page not found: ${slug.replace('/docs', '')}`
		};
		throw new Error(`Page not found: ${slug}`);
	}
}
