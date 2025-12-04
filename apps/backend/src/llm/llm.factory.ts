import { LLMProvider } from './llm-provider';
import { MockLLMAdapter } from './adapters/mock';
import { OpenAIAdapter } from './adapters/openai';

export function createLLMProvider(): LLMProvider {
  const useOpenAI = process.env.USE_OPENAI === 'true';

  if (useOpenAI) {
    return new OpenAIAdapter();
  }

  return new MockLLMAdapter();
}
