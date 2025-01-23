import { createConversation, type Conversation } from '$lib/server/db/ai';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  async createConversation({ params }) {
    const id = crypto.randomUUID();
    const conversation: Conversation = {
      id,
      title: 'My first conversation'
    }
    createConversation()
  }
};
