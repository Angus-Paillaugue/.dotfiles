import type { AIConfig, BuildingMessage, Message } from '$lib/types';
import { Ollama } from 'ollama/browser';
import OpenAI from 'openai';
import { env } from '$env/dynamic/public';
import Context from '$lib/assets/ai/context.md?raw';

const ollama = new Ollama({ host: 'http://127.0.0.1:5000' });

const openai = new OpenAI({
  baseURL: env.PUBLIC_OLLAMA_URL,
  apiKey: 'ollama',
  dangerouslyAllowBrowser: true
});

interface MessageForModel {
  role: Message['role'];
  content: Message['content'];
}

export const DEFAULT_CONFIG: AIConfig = {
  model: 'llama3.2:3b'
};

export async function getModels() {
  return await ollama.list();
}

export async function init() {
  const models = await getModels();
  if (!models.models.map((m) => m.name).includes(DEFAULT_CONFIG.model)) {
    return ollama.pull({ model: DEFAULT_CONFIG.model, stream: true });
  }
}

export async function ask(messages: BuildingMessage[]) {
  // First message sent to the model
  const contextMessage: MessageForModel = {
    role: 'system',
    content: Context
  };
  const messagesForModel: MessageForModel[] = [contextMessage, ...messages].slice(0, -1).map((m) => ({ // Adds the system prompt with project context. The slice is here because on the page, we create an empty message to display a loading state but the AI does not need it.
    role: m.role,
    content: m.content
  }));
  console.log('Messages for model:', messagesForModel);
  // const completion = await openai.chat.completions.create({
  //   model: DEFAULT_CONFIG.model,
  //   messages: messagesForModel,
  //   stream: true,
  //   n: 1,
  //   modalities: ['text'],
  //   max_tokens: 8192,
  // });
  const completion = await ollama.chat({
    model: DEFAULT_CONFIG.model,
    stream: true,
    messages: messagesForModel,
    options: {
      num_ctx: 4096
    }
  });
  return completion;
}
