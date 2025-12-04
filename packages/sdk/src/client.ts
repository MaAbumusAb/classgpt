import { Chat, CreateChatRequest, SendMessageRequest, Message, ApiResponse } from './types';

export class ClassGptClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        return { error: error || response.statusText };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async createChat(request: CreateChatRequest): Promise<ApiResponse<Chat>> {
    return this.request<Chat>('/api/chats', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getChats(): Promise<ApiResponse<Chat[]>> {
    return this.request<Chat[]>('/api/chats');
  }

  async getChat(chatId: string): Promise<ApiResponse<Chat>> {
    return this.request<Chat>(`/api/chats/${chatId}`);
  }

  async sendMessage(request: SendMessageRequest): Promise<ApiResponse<Message>> {
    return this.request<Message>('/api/chats/message', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async deleteChat(chatId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/api/chats/${chatId}`, {
      method: 'DELETE',
    });
  }
}
