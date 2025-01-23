/** @type {import('./$types').PageLoad} */
export async function load() {
  const projects = import.meta.glob('../lib/projects/*', { eager: true });
  console.log(projects);
	return { projects };
}
