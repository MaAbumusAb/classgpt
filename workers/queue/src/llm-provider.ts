export interface LLMProvider {
  generateCompletion(prompt: string, maxTokens?: number): Promise<string>;
}

export class MockLLMProvider implements LLMProvider {
  async generateCompletion(prompt: string, maxTokens = 500): Promise<string> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log(`Processing prompt (${maxTokens} max tokens): ${prompt.substring(0, 50)}...`);
    
    return `Mock LLM response to: "${prompt.substring(0, 50)}..." (generated with max ${maxTokens} tokens)`;
  }
}
