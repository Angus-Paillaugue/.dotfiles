import type { RequestHandler } from './$types';
import { DEFAULT_CONFIG, type BuildingMessage } from '$lib/ai';
import { createMessage, getMessages } from '$lib/server/db/ai';
import { Ollama } from 'ollama/browser';
import { EventEmitter } from 'stream';

const ollama = new Ollama({ host: 'http://127.0.0.1:5000' });

export const POST: RequestHandler = async ({ request }) => {
  const { text: text, idConversation }: { text: string; idConversation: number } =
    await request.json();

  const ac = new AbortController();
  const message: BuildingMessage = { role: 'user', content: text };
  createMessage(message, idConversation);
  const messages = await getMessages(idConversation);
  const response = await ollama.chat({ model: DEFAULT_CONFIG.model, messages, stream: true });
  let outputMessage = '';
  const messagePartEventEmitter = new EventEmitter();

  for await (const part of response) {
    if(part.done) {
      const aiMessage: BuildingMessage = { role: 'assistant', content: outputMessage };
      await createMessage(aiMessage, idConversation);
    }else {
      outputMessage += part.message.content;
      messagePartEventEmitter.emit('part', part.message.content);
    }
  }
  const stream = new ReadableStream({
    start(controller) {
      messagePartEventEmitter.on(
        'part',
        (part) => {
          console.log(part.price);
          controller.enqueue(part);
        }
      );
    },
    cancel() {
      console.log('cancel and abort');
      ac.abort();
    }
  });

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream'
    }
  });
};
