import type { RequestHandler } from './$types';
import { DEFAULT_CONFIG, type BuildingMessage } from '$lib/ai';
import { createMessage, getMessages } from '$lib/server/db/ai';
import { Ollama } from 'ollama/browser';
import EventEmitter from 'events';

const ollama = new Ollama({ host: process.env.OLLAMA_HOST });Creates a reader and locks the stream to it. While the stream is locked, no other reader can be acquired until this one is released.

export const POST: RequestHandler = async ({ request }) => {
  const { text: text, idConversation }: { text: string; idConversation: number } =
    await request.json();

  const message: BuildingMessage = { role: 'user', content: text };
  createMessage(message, idConversation);
  const messages = await getMessages(idConversation);
  const response = await ollama.chat({ model: DEFAULT_CONFIG.model, messages, stream: true });
  let outputMessage = '';
  const messagePartEventEmitter = new EventEmitter();

  const stream = new ReadableStream({
    start(controller) {
      messagePartEventEmitter.on('part', (part) => {
        console.log(part);
        controller.enqueue(part);
      });

      messagePartEventEmitter.on('end', () => {
        controller.close();
      });
    },
    cancel() {
      response.abort();
    }
  });

  for await (const part of response) {
    if(part?.done && part.done === true) {
      const aiMessage: BuildingMessage = { role: 'assistant', content: outputMessage };
      await createMessage(aiMessage, idConversation);
      messagePartEventEmitter.emit('end');
    }else {
      outputMessage += part.message.content;
      messagePartEventEmitter.emit('part', part.message.content);
    }
  }

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream'
    }
  });
};
