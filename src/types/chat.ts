export type MistralModel = 
  | 'mistral-small-latest'
  | 'open-mistral-nemo'
  | 'mistral-large-latest'
  | 'pixtral-large-latest'
  | 'pixtral-12b'
  | 'codestral-latest';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: string | null; // Add image property
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}