import type { RequestHandler } from './$types';
import { DEFAULT_CONFIG, type BuildingMessage } from '$lib/ai';
import { createMessage, getMessages } from '$lib/server/db/ai';
import { Ollama } from 'ollama/browser';
import EventEmitter from 'events';
import { env } from '$env/dynamic/private';

const ollama = new Ollama({ host: env.OLLAMA_URL });

export const POST: RequestHandler = async ({ request }) => {
  const { content, role, idConversation }: { content: string; role:Message idConversation: number } =
    await request.json();

  const message: BuildingMessage = { role: 'user', content };
  await createMessage(message, idConversation);
  }

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream'
    }
  });
};
