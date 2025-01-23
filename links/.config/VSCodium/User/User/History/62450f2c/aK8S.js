/** @type {import('./$types').PageLoad} */
export async function load() {
  const projects = await import('../lib/projects/*', { eager: true });
  console.log(projects);
	return { projects };
}
