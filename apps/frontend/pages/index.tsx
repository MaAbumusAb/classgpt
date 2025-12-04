import Head from 'next/head';
import Header from '@/components/Header';
import { Button } from '@classgpt/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>ClassGPT - AI Study Assistant</title>
        <meta name="description" content="Your multilingual AI study assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Welcome to ClassGPT
            </h1>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
              Your multilingual AI-powered educational assistant
            </p>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
              Get explanations, generate quizzes, and learn in your preferred language
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/chat">
                <Button variant="primary" size="lg">
                  Start Learning
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </main>
        <footer className="py-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 ClassGPT. Making education accessible for all.</p>
        </footer>
      </div>
    </>
  );
}
