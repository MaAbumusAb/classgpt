import { LLMProvider, LLMMessage, LLMResponse } from '../llm-provider';

export class MockLLMAdapter implements LLMProvider {
  async generateResponse(messages: LLMMessage[]): Promise<LLMResponse> {
    // Mock response - simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const lastUserMessage = messages
      .filter((m) => m.role === 'user')
      .pop();

    const content = lastUserMessage
      ? `This is a mock response to: "${lastUserMessage.content}". In a production environment, this would be replaced with actual LLM output.`
      : 'Mock response: No user message found.';

    return {
      content,
      model: 'mock-llm-v1',
      usage: {
        promptTokens: 50,
        completionTokens: 100,
        totalTokens: 150,
      },
    };
  }
}
