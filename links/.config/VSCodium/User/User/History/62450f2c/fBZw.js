import { projects } from "$conf";

/** @type {import('./$types').PageLoad} */
export async function load() {
	const fetchedProjects = import.meta.glob('../lib/projects/**/*', { eager: true });

	const meta = [];

	for (const project of Object.values(fetchedProjects)) {
		console.log(project);
		meta.push(project.metadata);
	}

	return { projects: meta };
}
