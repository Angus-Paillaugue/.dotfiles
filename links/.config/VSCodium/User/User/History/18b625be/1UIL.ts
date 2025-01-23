
import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://127.0.0.1:5000' });

export interface AIConfig {
  model: string;
}

export const DEFAULT_CONFIG: AIConfig = {
  model: 'llama3.3',
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
  console.log('Models:', models.models);
  if(!models.models.includes(DEFAULT_CONFIG.model)) {
    return ollama.pull({ model: DEFAULT_CONFIG.model });
  }
}
