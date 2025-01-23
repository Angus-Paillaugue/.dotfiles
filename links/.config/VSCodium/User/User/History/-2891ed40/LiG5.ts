import type { RequestHandler } from './$types';
import { type BuildingMessage, type Message } from '$lib/ai';
import { createMessage } from '$lib/server/db/ai';
import { json } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request }) => {
  const { content, role, idConversation }: { content: string; role:Message['role']; idConversation: number } =
    await request.json();

  const message: BuildingMessage = { role, content };
  await createMessage(message, idConversation);

  return json({ success: true });
};
