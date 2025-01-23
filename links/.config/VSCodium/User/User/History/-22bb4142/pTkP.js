const PROXY_URL = 'http://localhost:1458';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url: pageUrl }) {
	const url = pageUrl.searchParams.get('url');
	console.log(url);

	return {};
}
