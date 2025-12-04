import React from 'react';

export interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp?: Date;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, timestamp }) => {
  const isUser = sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message}</p>
        {timestamp && (
          <span className="text-xs opacity-70 mt-1 block">
            {timestamp.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};
