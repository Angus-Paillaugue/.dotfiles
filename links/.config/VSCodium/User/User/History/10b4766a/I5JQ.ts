import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  async logIn({ state, effects }) {
  },
};
