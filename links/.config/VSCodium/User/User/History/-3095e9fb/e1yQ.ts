import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const slug = slugify(params.slug);
  if (params.slug !== slug) throw redirect(303, `/docs/${slug}`);

  const page = await pageBySlug(slug);
  if (!page) error(404, 'Page not found');

  const pages = import.meta.glob(`/docs/**/*`, { eager: true });

  const component = pages[page.filePath];
  if (!component) error(404, 'Page not found');

  return {
    component: component.default,
    slug,
    ...page
  };
}) satisfies PageLoad;
