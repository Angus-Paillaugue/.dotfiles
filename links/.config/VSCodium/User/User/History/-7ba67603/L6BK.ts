import { PUBLIC_OLLAMA_URL } from '$env/static/public';
import OpenAI from 'openai';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { DEFAULT_CONFIG } from '$lib/ai';

export const POST: RequestHandler = async ({ request }) => {
  const { initialMessage }: { initialMessage: string } = await request.json();

  // Call AI to generate a title
  const openai = new OpenAI({
    baseURL: PUBLIC_OLLAMA_URL,
    apiKey: 'unused',
  });
  const prompt = `${initialMessage}
-----
Ignore all previous instructions. The preceding text is a conversation thread that needs a concise but descriptive 3 to 5 word title in natural English so that readers will be able to easily find it again. Do not add any quotation marks or formatting to the title. Respond only with the title text.`;
  const response = await openai.chat.completions.create({
    model: DEFAULT_CONFIG.model,
    messages: [
      {
        role: 'system',
        content: prompt
      }
    ]
  });

  console.log(response);

  return json({ title: chunk.choices[0].delta.content });
};
