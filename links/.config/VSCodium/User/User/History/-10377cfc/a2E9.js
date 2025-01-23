export async function load() {
  /** @type {import('./$types').LayoutLoad} */
  const docsHomePage = pages.filter((page) => !page?.children)[0];
  return { docsHomePage  };
}
