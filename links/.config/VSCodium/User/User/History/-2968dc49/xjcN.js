import { error } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';

export async function load({ params }) {
  console.time('dbsave');

  const page = await pageBySlug(params.slug);

  if (!page) error(404, 'Page not found');
  const pages = import.meta.glob(`/docs/**/*`, { eager: true });
  const component = pages[`/docs/${page.slug}.md`];

  console.timeEnd('dbsave');
  return {
    component: component.default,
    slug: params.slug,
    ...page
  };
}
