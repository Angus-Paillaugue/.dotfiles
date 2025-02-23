import { error } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';
import { slugValidator } from '$lib/utils';

export async function load({ params }) {
  const slug = slugValidator;
  const page = await pageBySlug(params.slug);
  if (!page) error(404, 'Page not found');

  const pages = import.meta.glob(`/docs/**/*`, { eager: true });
  // console.log(pages);

  const component = pages[page.filePath];
  if (!component) error(404, 'Page not found');

  return {
    component: component.default,
    slug: params.slug,
    ...page
  };
}
