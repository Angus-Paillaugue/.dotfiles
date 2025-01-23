import { createConversation, type Conversation } from '$lib/server/db/ai';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  async createConversation({ locals }) {
    if (!locals.user) return;
      const id = crypto.randomUUID();
    const conversation: Conversation = {
      id,
      title: 'My first conversation',
      userId: locals.user.id,
      messages: []
    }
    createConversation(conversation);

    throw redirect(303, `/app/ai/${id}`);
  }
};
