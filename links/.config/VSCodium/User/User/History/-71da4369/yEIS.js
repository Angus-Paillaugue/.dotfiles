import { DOMParser } from 'xmldom';

const fluxSources = [
    {
        name: 'Le Monde Informatique',
        url: 'https://www.lemondeinformatique.fr/flux-rss/rss.xml'
    }
];

async function fetchFluxes() {
	let news = [];
	for await (const source of fluxSources) {
		const flux = await fetchFlux(source.url);
		news.push({ name: source.name, flux });
	}

    return news;;
}
async function fetchFlux(url) {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/xml',
			'Access-Control-Allow-Origin': '*'
		}
	});
	const xml = await response.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(xml, 'text/xml');
	const items = doc.getElementsByTagName('item');
	const news = [];
	for await (const item of items) {
		const title = item.getElementsByTagName('title')[0].textContent;
		const link = item.getElementsByTagName('link')[0].textContent;
		const description = item.getElementsByTagName('description')[0].textContent;
		const image = await fetchImage(link);
		news.push({ title, link, description, image });
	}
	return news;
}

  async function fetchImage(url) {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const img = doc.querySelector('meta[property="og:image"]')?.content;
    return img;
}


/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const news = await fetchFluxes();
	return { news  };
}
