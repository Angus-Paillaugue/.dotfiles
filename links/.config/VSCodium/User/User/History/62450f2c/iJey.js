/** @type {import('./$types').PageLoad} */
export async function load() {
  const projects = import.meta.glob('../lib/projects/*', { eager: true });
  const meta = []

  for (const [path, data] of Object.entries(projects)) {
    meta.push(data.metadata);
  }
	return { projects: meta };
}
