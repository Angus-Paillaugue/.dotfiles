import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { name } = params;
	const pages = import.meta.glob(`../../../lib/projects/*`, { eager: true });
	const path = `../../../lib/projects/${name}.md`;
	const component = pages[path];
	if (!component) throw new error(404, "Uh oh. This project doesn't exists");

	await new Promise((resolve) => setTimeout(resolve, 10000));

	return { component: component.default, meta: component.metadata };
}
