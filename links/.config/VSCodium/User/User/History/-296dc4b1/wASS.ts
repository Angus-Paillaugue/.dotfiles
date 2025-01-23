import type { RequestHandler } from './$types';
import { type BuildingMessage, type Message } from '$lib/ai';
import { createMessage } from '$lib/server/db/ai';
import { json } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request, locals }) => {
  const {
    idConversation
  }: {
    idConversation: number;
  } = await request.json();

  const message: BuildingMessage = { role, content, error };
  await createMessage(message, idConversation);

  return json({ success: true });
};
