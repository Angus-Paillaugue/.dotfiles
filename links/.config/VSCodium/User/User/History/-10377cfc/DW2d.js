/** @type {import('./$types').LayoutLoad} */
export async function load() {
  pages.filter((page) => !page?.children)[0];
  return {};
}
