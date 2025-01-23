import { pageByUrl } from '$lib/pages';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const { slug } = params;
  console.log(params);

	const page = pageByUrl(slug);
	if (!page) {
		return json(
			{
				message: `Page not found: ${slug.replace('/docs', '')}`
			},
			{
				status: 404
			}
		);
	}
	return json( page );
}
