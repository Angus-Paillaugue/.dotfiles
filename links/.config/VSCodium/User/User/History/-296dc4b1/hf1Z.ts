import type { RequestHandler } from './$types';
import { deleteconversation } from '$lib/server/db/ai';
import { json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, locals }) => {
  const {
    idConversation
  }: {
    idConversation: number;
  } = await request.json();

  const { user } = locals;
  if (!user) {
    return json({ success: false });
  }
  const userId = user.id;



  return json({ success: true });
};
