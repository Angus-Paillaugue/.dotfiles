import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { name } = params;
	const enPages = import.meta.glob(`../../../lib/projects/*`, { eager: true });
	const path = `../../../lib/projects/${name}.md`;
	const enComponent = enPages[path];
	if (!enComponent) throw new error(404, "Uh oh. This project doesn't exists");

	return { component: component.default, meta: component.metadata };
}
