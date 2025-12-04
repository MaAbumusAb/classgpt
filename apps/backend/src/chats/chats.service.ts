import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LLMProvider } from '../llm-provider/llm-provider.interface';

@Injectable()
export class ChatsService {
  constructor(
    private prisma: PrismaService,
    @Inject('LLM_PROVIDER') private llmProvider: LLMProvider
  ) {}

  async createChat(userId: string, title: string) {
    return this.prisma.chat.create({
      data: {
        userId,
        title,
      },
    });
  }

  async getChatsByUser(userId: string) {
    return this.prisma.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getChat(chatId: string) {
    return this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });
  }

  async createMessage(chatId: string, role: string, content: string) {
    const message = await this.prisma.message.create({
      data: {
        chatId,
        role,
        content,
      },
    });

    // Update chat's updatedAt
    await this.prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  async generateResponse(chatId: string, userMessage: string) {
    // Create user message
    await this.createMessage(chatId, 'user', userMessage);

    // Generate AI response
    const response = await this.llmProvider.generateCompletion(userMessage);

    // Create assistant message
    const assistantMessage = await this.createMessage(chatId, 'assistant', response);

    return assistantMessage;
  }

  async deleteChat(chatId: string) {
    return this.prisma.chat.delete({
      where: { id: chatId },
    });
  }
}
