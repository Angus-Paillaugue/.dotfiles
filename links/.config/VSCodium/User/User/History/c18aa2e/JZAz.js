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
  if(page?.jsdoc) {
    if (page.jsdoc instanceof String) {
      const file = import(
        /* @vite-ignore */ `/src/lib/components/${page.jsdoc}`
      );
      page.jsdoc = parseJSDoc(file);
    } else {
      const files = await Promise.all(
        page.jsdoc.map(
          async (file) =>
            (await import(
              /* @vite-ignore */ `/src/lib/components/${file}?raw`
            )).default
        )
      );
      console.log(files);

      page.jsdoc = files.map((file) => parseJSDoc(file));
    }
  }

  if (!component) error(404, 'Page not found');

  return {
    component: component.default,
    slug,
    ...page
  };
}
