/** @type {import('./$types').PageLoad} */
export async function load() {
  const projects = import.meta.glob('../lib/projects/*', { eager: true });
  console.log(projects.map((el) => el.metadata));
	return { projects: projects.map(el => el.metadata) };
}
