import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { name } = params;
	const pages = import.meta.glob(`../../../lib/projects/**/*`, { eager: true });

	for (const [path, project] of Object.entries(pages)) {
		const locale = path.slice(16).split('/')[0];
		meta[locale] = meta[locale] || [];
		meta[locale].push(project.metadata);
	}

	const frComponent = frPages[frPath];
	if (!frComponent) throw new error(404, "Oh non. Ce projet n'existe pas");

	return { component: component.default, meta: component.metadata };
}
