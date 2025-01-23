import { DOMParser } from 'xmldom';

const PROXY_URL = 'http://localhost:1458';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url: pageUrl }) {
	const url = pageUrl.searchParams.get('url');
  const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(url)}`);
	const xml = await response.json();
  const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xml.contents, 'text/html');
	console.log(xmlDoc);

	return {};
}
