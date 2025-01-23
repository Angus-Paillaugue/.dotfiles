import { error, redirect } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';
import { slugify } from '$lib/utils';
import { parseJSDoc } from '$lib/jsdocParser';

export async function load({ params }) {
  const slug = slugify(params.slug);
  if (params.slug !== slug) throw redirect(303, `/docs/${slug}`);

  const page = await pageBySlug(slug);
  if (!page) error(404, 'Page not found');

  const pages = import.meta.glob(`/docs/**/*`, { eager: true });


  const component = pages[page.filePath];
  console.log(page);
  if(page?.jsdoc) {
    if(jsdoc instanceof String) {
      const files = import.meta.glob(`/src/lib/components/**/*`, { eager: true });
      const componentFile = files[page.filePath];
      page.jsdoc = parseJSDoc(page.jsdoc);
    }else {
      page.jsdoc = JSON.parse(page.jsdoc);
    }
  }

  if (!component) error(404, 'Page not found');

  return {
    component: component.default,
    slug,
    ...page
  };
}
