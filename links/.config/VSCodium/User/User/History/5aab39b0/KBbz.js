import { pages } from '$conf';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const docsHomePage = pages.filter((page) => !page?.children)[0];

  throw redirect
}
