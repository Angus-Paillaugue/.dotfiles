import { projects } from "$conf";

/** @type {import('./$types').PageLoad} */
export async function load() {
	const fetchedProjects = import.meta.glob('../lib/projects/**/*', { eager: true });

	const meta = [];

	for (const [path, project] of Object.entries(fetchedProjects)) {
		console.log(path.slice(16).split('/')[0]);
		meta.push(project.metadata);
	}

	return { projects: meta };
}
