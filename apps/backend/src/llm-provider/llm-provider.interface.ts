export interface LLMProvider {
  generateCompletion(prompt: string, maxTokens?: number): Promise<string>;
}

export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
