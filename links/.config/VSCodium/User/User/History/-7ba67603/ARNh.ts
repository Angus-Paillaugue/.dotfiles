import { PUBLIC_OLLAMA_URL } from '$env/static/public';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request }) => {
  const { initialMessage }: { initialMessage: string } = await request.json();

  // Call AI to generate a title
  const openai = new OpenAI({
    baseURL: PUBLIC_OLLAMA_URL,
    apiKey: 'unused',
  });
  const response = await openai.;

  return json({ success: true });
};
