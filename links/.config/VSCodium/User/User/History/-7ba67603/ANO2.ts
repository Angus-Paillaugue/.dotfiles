import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request }) => {
  const { initialMessage }: { initialMessage: string } = await request.json();

  // Call AI to generate a title
  const title = await generateTitle(initialMessage);
  const openai = new OpenAI({
    baseURL: PUBLIC_OLLAMA_URL,
    apiKey: 'unused',
  });

  return json({ success: true });
};
