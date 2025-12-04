import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import ChatUI from '@/components/ChatUI';

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      content: 'Hello! How can I help you learn today?',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: `I received your message: "${content}". This is a demo response.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Chat - ClassGPT</title>
        <meta name="description" content="Chat with your AI study assistant" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          <ChatUI messages={messages} onSendMessage={handleSendMessage} />
        </main>
      </div>
    </>
  );
}
