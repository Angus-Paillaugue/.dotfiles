import { error } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';
import { normalizePath } from '$lib/utils';

export async function load({ params }) {
  const slug = normalizePath(params.slug);
  const page = await pageBySlug(slug);
  if (!page) error(404, 'Page not found');

  const pages = import.meta.glob(`/docs/**/*`, { eager: true });
  // console.log(pages);

  const component = pages[page.filePath];
  if (!component) error(404, 'Page not found');

  return {
    component: component.default,
    slug,
    ...page
  };
}
