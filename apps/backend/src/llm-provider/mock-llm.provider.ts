import { Injectable } from '@nestjs/common';
import { LLMProvider } from './llm-provider.interface';

@Injectable()
export class MockLLMProvider implements LLMProvider {
  async generateCompletion(prompt: string, maxTokens = 500): Promise<string> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return `Mock LLM response to: "${prompt.substring(0, 50)}..." (max tokens: ${maxTokens})`;
  }
}
