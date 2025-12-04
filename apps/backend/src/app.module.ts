import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './auth/auth.module';
import { LlmProviderModule } from './llm-provider/llm-provider.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ChatsModule, AuthModule, LlmProviderModule],
  providers: [PrismaService],
})
export class AppModule {}
