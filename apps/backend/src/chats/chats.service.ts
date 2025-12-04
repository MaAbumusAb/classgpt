import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createLLMProvider } from '../llm/llm.factory';

const prisma = new PrismaClient();

@Injectable()
export class ChatsService {
  private llmProvider = createLLMProvider();

  async createChat(userId: string, title?: string) {
    return prisma.chat.create({
      data: {
        title: title || 'New Chat',
        userId,
      },
      include: {
        messages: true,
      },
    });
  }

  async getChats(userId: string) {
    return prisma.chat.findMany({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getChat(chatId: string) {
    return prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async sendMessage(chatId: string, content: string) {
    // Create user message
    await prisma.message.create({
      data: {
        chatId,
        content,
        role: 'user',
      },
    });

    // Get chat history
    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
    });

    // Generate AI response
    const llmMessages = messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));

    const response = await this.llmProvider.generateResponse(llmMessages);

    // Save AI response
    const assistantMessage = await prisma.message.create({
      data: {
        chatId,
        content: response.content,
        role: 'assistant',
      },
    });

    // Update chat timestamp
    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    });

    return assistantMessage;
  }

  async deleteChat(chatId: string) {
    return prisma.chat.delete({
      where: { id: chatId },
    });
  }
}
