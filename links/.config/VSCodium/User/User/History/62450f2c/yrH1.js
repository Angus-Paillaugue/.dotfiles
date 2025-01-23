import { projects } from "$conf";

/** @type {import('./$types').PageLoad} */
export async function load() {
	const fetchedProjects = import.meta.glob('../lib/projects/*', { eager: true });
	const meta = [];

	for (const project of projects) {
		const associatedProject = Object.values(fetchedProjects).find((projectPath) =>
			projectPath.meta.name ===project
	);
	console.log(associatedProject);
		// meta.push(data.metadata);
	}
	// meta.sort((a, b) => a.index - b.index);

	return { projects: meta };
}
