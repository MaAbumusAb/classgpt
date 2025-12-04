import React from 'react';

export interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp?: Date;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  timestamp,
}) => {
  const isUser = sender === 'user';
  const bubbleStyles = isUser
    ? 'bg-blue-600 text-white ml-auto'
    : 'bg-gray-200 text-gray-800';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${bubbleStyles}`}>
        <p className="text-sm">{message}</p>
        {timestamp && (
          <p className="text-xs opacity-70 mt-1">
            {timestamp.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
};
