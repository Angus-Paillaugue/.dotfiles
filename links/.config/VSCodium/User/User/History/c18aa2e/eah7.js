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
    if (page.jsdoc instanceof String) {
      const file = import(`/src/lib/components/${page.jsdoc}`).then(
        (m) => m.default
      );
      page.jsdoc = parseJSDoc(file);
    } else {
      const files = page.jsdoc.map((file) =>
        import(`/src/lib/components/${file}`).then((m) => m.default)
      );
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
