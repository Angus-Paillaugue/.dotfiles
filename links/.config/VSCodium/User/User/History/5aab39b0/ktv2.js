import { pages } from '$conf';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const docsHomePage = pages.filter((page) => !page?.children)[0];

  throw redire
}
