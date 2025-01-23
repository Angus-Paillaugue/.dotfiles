import type { PageServerLoad } from './$types';

export const load = (async ({ params}) => {
  const idConversation = params.id;
  const conversation = await getConversation(idConversation);
  return {};
}) satisfies PageServerLoad;
