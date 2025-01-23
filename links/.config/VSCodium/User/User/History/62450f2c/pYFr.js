import { projects } from "$conf";

/** @type {import('./$types').PageLoad} */
export async function load() {
	const fetchedProjects = import.meta.glob('../lib/projects/*', { eager: true });
	const meta = [];

	for (const project of projects) {
		const associatedProject = Object.values(fetchedProjects).find((projectPath) =>
			projectPath.metadata.name ===project
		);
		// meta.push(data.metadata);
		console.log(associatedProject);
	}
	// meta.sort((a, b) => a.index - b.index);

	return { projects: meta };
}
