import { Index } from '$lib/registry';

export async function load() {
  const name = 'test';

  const component = Index[name];

  return {
    component
  };
}
