import { createConversation, type Conversation } from '$lib/server/db/ai';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  async createConversation({ locals }) {
    if (!locals.user) return;
    const conversation: Conversation = {
      id: -1,
      title: 'Chat with OwnLogs\'s AI',
      userId: locals.user.id,
      messages: []
    }
    const ceratedConversation = await createConversation(conversation);

    throw redirect(303, `/app/ai/${ceratedConversation.id}`);
  }
};
