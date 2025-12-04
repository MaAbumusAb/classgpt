export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface CreateChatRequest {
  title: string;
}

export interface CreateMessageRequest {
  chatId: string;
  content: string;
}

export interface ChatResponse {
  chat: Chat;
  messages: Message[];
}
