import { error } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';
import mdsvexConfig from '../../../../mdsvex.config.js';

export async function load({ params }) {
  const page = await pageBySlug(params.slug);

  if (!page) error(404, 'Page not found');
  const pages = import.meta.glob('/docs/**/*', { eager: true });
  const component = await import(`../../../../docs/${page.slug}.md`);

  return {
    component: component.default,
    slug: params.slug,
    ...page
  };
}
