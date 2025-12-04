import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(@Body() body: { title?: string; userId: string }) {
    // TODO: Get userId from authenticated session instead of body
    return this.chatsService.createChat(body.userId, body.title);
  }

  @Get()
  async getChats(@Body() body: { userId: string }) {
    // TODO: Get userId from authenticated session
    return this.chatsService.getChats(body.userId);
  }

  @Get(':id')
  async getChat(@Param('id') id: string) {
    return this.chatsService.getChat(id);
  }

  @Post('message')
  async sendMessage(@Body() body: { chatId: string; content: string }) {
    return this.chatsService.sendMessage(body.chatId, body.content);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteChat(@Param('id') id: string) {
    await this.chatsService.deleteChat(id);
  }
}
