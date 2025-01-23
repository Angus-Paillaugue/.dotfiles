/** @type {import('./$types').PageLoad} */
export async function load() {
  const projects = import.meta.glob('../lib/projects/*', { eager: true });
  const meta = []

  for (const [path, data] in Object.entries(projects)) {
    console.log(data);
    meta.push(data.metadata);
  }
	return { projects: meta };
}
