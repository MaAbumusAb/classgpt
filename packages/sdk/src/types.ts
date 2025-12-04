export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateChatRequest {
  title?: string;
}

export interface SendMessageRequest {
  content: string;
  chatId: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
