/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { project } = params;
	const pages = import.meta.glob(`../../lib/projects/*`, { eager: true });
	const path = `../../lib/projects/${project}.md`;
	const component = pages[path];
	console.log(component);
	return { component: component.default };
}
