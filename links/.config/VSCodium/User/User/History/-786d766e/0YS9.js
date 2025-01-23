import { error, redirect } from '@sveltejs/kit';
import { pageBySlug } from '$lib/pages';
import { Index } from '$lib/registry';

export async function load({ params }) {
  const name = 'test';

  const component = Index[name];

  return {
    component: component.default,
    slug,
    ...page
  };
}
