export interface AIConfig {
  model: string;
}

export interface BuildingMessage {
  content: string;
  role: 'user' | 'system';
  error: string | null;
}

export interface Message extends BuildingMessage {
  id: number;
}
