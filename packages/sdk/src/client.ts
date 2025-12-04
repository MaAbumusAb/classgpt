import type {
  User,
  Chat,
  Message,
  CreateChatRequest,
  CreateMessageRequest,
  ChatResponse,
} from './types';

export class ClassGPTClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // User endpoints
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/users/me');
  }

  // Chat endpoints
  async getChats(): Promise<Chat[]> {
    return this.request<Chat[]>('/api/chats');
  }

  async getChat(chatId: string): Promise<ChatResponse> {
    return this.request<ChatResponse>(`/api/chats/${chatId}`);
  }

  async createChat(data: CreateChatRequest): Promise<Chat> {
    return this.request<Chat>('/api/chats', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteChat(chatId: string): Promise<void> {
    await this.request<void>(`/api/chats/${chatId}`, {
      method: 'DELETE',
    });
  }

  // Message endpoints
  async getMessages(chatId: string): Promise<Message[]> {
    return this.request<Message[]>(`/api/chats/${chatId}/messages`);
  }

  async createMessage(data: CreateMessageRequest): Promise<Message> {
    return this.request<Message>('/api/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
