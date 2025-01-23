/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { project } = params;
  console.log(project);
  const pages = import.meta.glob(`/docs/**/*`, { eager: true });
  const path = `../../lib/projects/${project}.md`;
	const component = pages[path];
	return { component: component.default };
}
