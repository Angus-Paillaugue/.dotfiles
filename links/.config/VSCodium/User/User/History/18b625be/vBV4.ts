
import { Ollama, type ChatResponse } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:5000' });

export interface AIConfig {
  model: string;
}

export interface BuildingMessage {
  text: ChatResponse | string;
  from: 'user' | 'ai';
}

export interface Message extends BuildingMessage {
  id: number;
}

export const DEFAULT_CONFIG: AIConfig = {
  model: 'llama3.2:3b'
};

export function ask(question: string, config?: AIConfig) {
  config = { ...DEFAULT_CONFIG, ...config };
  const message = { role: 'user', content: question };
  return ollama.chat({ model: config.model, messages: [message], stream: true });
}

export async function getModels() {
  return await ollama.list();
}

export async function init() {
  const models = await getModels();
  if(!models.models.map(m => m.name).includes(DEFAULT_CONFIG.model)) {
    return ollama.pull({ model: DEFAULT_CONFIG.model, stream: true });
  }
}
