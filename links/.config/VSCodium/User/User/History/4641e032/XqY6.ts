import { createConversation } from '$lib/server/db/ai';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  async createConversation() {
    createConversation
  }
};
