import { projects } from "$conf";

/** @type {import('./$types').PageLoad} */
export async function load() {
	const fetchedProjects = import.meta.glob('../lib/projects/**/*', { eager: true });

	const meta = {};

	for (const [path, project] of Object.entries(fetchedProjects)) {
		const locale = path.slice(16).split('/')[0];
		meta[locale] = meta[locale] || [];
		meta[locale].push(project.metadata);
	}
	console.log(meta);
	
	return { projects: meta };
}
