import { Worker, Job } from 'bullmq';
import Redis from 'ioredis';

// Mock LLM Provider (would be replaced with actual implementation)
class MockLLMProvider {
  async process(data: { prompt?: string }): Promise<string> {
    console.log('Processing job with data:', data);
    // Simulate LLM processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `Mock LLM response for: ${data.prompt || 'no prompt'}`;
  }
}

const redisConnection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

const llmProvider = new MockLLMProvider();

const worker = new Worker(
  'llm-processing',
  async (job: Job) => {
    console.log(`Processing job ${job.id}...`);

    try {
      const result = await llmProvider.process(job.data);
      console.log(`Job ${job.id} completed successfully`);
      return result;
    } catch (error) {
      console.error(`Job ${job.id} failed:`, error);
      throw error;
    }
  },
  {
    connection: redisConnection,
  }
);

worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} has completed`);
});

worker.on('failed', (job, err) => {
  console.log(`❌ Job ${job?.id} has failed with ${err.message}`);
});

console.log('🚀 Queue worker is running...');

process.on('SIGTERM', async () => {
  console.log('Shutting down worker...');
  await worker.close();
  await redisConnection.quit();
  process.exit(0);
});
