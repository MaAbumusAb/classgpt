import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { PrismaService } from '../prisma.service';
import { LlmProviderModule } from '../llm-provider/llm-provider.module';

@Module({
  imports: [LlmProviderModule],
  controllers: [ChatsController],
  providers: [ChatsService, PrismaService],
})
export class ChatsModule {}
