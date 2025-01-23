import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { project } = params;
	const pages = import.meta.glob(`../../lib/projects/*`, { eager: true });
	const path = `../../lib/projects/${project}.md`;
	const component = pages[path];
	if (!component) throw new error(404, 'Uh oh. This project doesn\'t exists');
	return { component: component.default };
}
