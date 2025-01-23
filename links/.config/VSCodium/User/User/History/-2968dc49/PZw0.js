import { error } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';

export async function load({ params }) {
  const page = await pageBySlug(params.slug);

  if (!page) error(404, 'Page not found');
  const pages = import.meta.glob(`/docs/**/*`, { eager: true });
  const docKey = Object.keys(pages).find((key) => key.includes(page));
  console.log(page);

  const component = pages[`/docs/${page.slug}.md`];
  if (!component) error(404, 'Page not found');

  return {
    component: component.default,
    slug: params.slug,
    ...page
  };
}
