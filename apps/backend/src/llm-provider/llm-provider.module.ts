import { Module } from '@nestjs/common';
import { MockLLMProvider } from './mock-llm.provider';
import { OpenAILLMProvider } from './openai-llm.provider';

const useOpenAI = process.env.USE_OPENAI === 'true';

@Module({
  providers: [
    {
      provide: 'LLM_PROVIDER',
      useClass: useOpenAI ? OpenAILLMProvider : MockLLMProvider,
    },
  ],
  exports: ['LLM_PROVIDER'],
})
export class LlmProviderModule {}
