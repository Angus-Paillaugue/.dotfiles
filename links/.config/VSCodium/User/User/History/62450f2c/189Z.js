/** @type {import('./$types').PageLoad} */
export async function load() {
  const projects = import.meta.glob('../lib/projects/*', { eager: true });
  const meta = []

  console.log(projects);
  for (const [path, data] in projects) {
    meta.push(data.metadata);
  }
	return { projects: meta };
}
