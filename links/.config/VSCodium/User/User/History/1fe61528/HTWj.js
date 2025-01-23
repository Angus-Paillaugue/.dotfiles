import { error } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';

export async function load({ params }) {
  const page = await pageBySlug(params.slug);
  if (!page) error(404, 'Page not found');

  const pages = import.meta.glob(`/docs/**/*`, { eager: true });
  // console.log(pages);

  const component = pages[page.filePath];
  if (!component) error(404, 'Page not found');

  await new Promise((resolve) => setTimeout(resolve, 2000));


  return {
    component: component.default,
    slug: params.slug,
    ...page
  };
}
