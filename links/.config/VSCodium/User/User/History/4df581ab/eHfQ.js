import { pageByUrl } from '$lib/pages';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const { slug } = params;
	const page = pageByUrl(slug);
	if (!page) {
		const error = {
			status: 404,
			message: `Page not found: ${slug.replace('/docs', '')}`
		};
		throw new Error(`Page not found: ${slug}`);
	}
	return new Response();
}
