import { Ollama, } from 'ollama/browser';
import type OpenAI from 'openai';

const ollama = new Ollama({ host: 'http://127.0.0.1:5000' });

export interface AIConfig {
  model: string;
}

export interface BuildingMessage {
  content: string;
  role: 'user' | 'assistant';
  error: string | null;
}

export interface Message extends BuildingMessage {
  id: number;
}

export const DEFAULT_CONFIG: OpenAI = {
  model: 'llama3.2:3b',
  stream: true,
  n: 1,
  modalities: ['text']
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
