import { Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import { MockLLMProvider } from './llm-provider';

const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

const llmProvider = new MockLLMProvider();

interface LLMJobData {
  prompt: string;
  userId: string;
  chatId: string;
  maxTokens?: number;
}

const worker = new Worker(
  'llm-processing',
  async (job: Job<LLMJobData>) => {
    console.log(`Processing job ${job.id} for user ${job.data.userId}`);
    
    try {
      const response = await llmProvider.generateCompletion(
        job.data.prompt,
        job.data.maxTokens
      );
      
      console.log(`Job ${job.id} completed successfully`);
      
      return {
        response,
        userId: job.data.userId,
        chatId: job.data.chatId,
      };
    } catch (error) {
      console.error(`Job ${job.id} failed:`, error);
      throw error;
    }
  },
  { connection }
);

worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} has completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} has failed with error:`, err.message);
});

worker.on('error', (err) => {
  console.error('Worker error:', err);
});

console.log('🚀 Queue worker started and listening for jobs...');

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await worker.close();
  await connection.quit();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await worker.close();
  await connection.quit();
  process.exit(0);
});
