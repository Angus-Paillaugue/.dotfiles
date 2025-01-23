import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const { name } = params;
	const path = `../../../lib/projects/${name}.md`;
	const enPages = import.meta.glob(`../../../lib/projects/en/*`, { eager: true });
	const enComponent = enPages[path];
	if (!enComponent) throw new error(404, "Uh oh. This project doesn't exists");
	const frPages = import.meta.glob(`../../../lib/projects/fr/*`, { eager: true });
	const frComponent = frPages[path];
	if (!frComponent) throw new error(404, "Oh non. Ce projet n'existe pas");

	return { en: { component: enComponent.default, meta: enComponent.metadata }, fr: { component: frComponent.default, meta: frComponent.metadata } };
}
