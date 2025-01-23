import { error } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';

export async function load({ params }) {
  const page = await pageBySlug(params.slug);

  if (!page) error(404, 'Page not found');
  const pages = import.meta.glob('./dir/*.js', { eager: true })

  const component = await import(`../../../../docs/${page.slug}.md`);

  return {
    component: component.default,
    slug: params.slug,
    ...page
  };
}
