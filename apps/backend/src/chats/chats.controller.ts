import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';

interface CreateChatDto {
  userId: string;
  title: string;
}

interface CreateMessageDto {
  chatId: string;
  content: string;
}

@Controller('api/chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get(':userId')
  async getUserChats(@Param('userId') userId: string) {
    return this.chatsService.getChatsByUser(userId);
  }

  @Get(':id/messages')
  async getChat(@Param('id') id: string) {
    return this.chatsService.getChat(id);
  }

  @Post()
  async createChat(@Body() data: CreateChatDto) {
    return this.chatsService.createChat(data.userId, data.title);
  }

  @Post('messages')
  async createMessage(@Body() data: CreateMessageDto) {
    return this.chatsService.generateResponse(data.chatId, data.content);
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    return this.chatsService.deleteChat(id);
  }
}
