import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { Button } from '@classgpt/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>ClassGPT - Your Multilingual AI Study Assistant</title>
        <meta
          name="description"
          content="ClassGPT helps learners understand concepts in their native language"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to ClassGPT 🌍📚
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your Multilingual AI Study Assistant for Localized Education
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            ClassGPT bridges educational language barriers by providing
            AI-driven explanations, quizzes, and summaries in local languages
            including Hausa, Arabic, and English.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/chat">
              <Button variant="primary">Start Chatting</Button>
            </Link>
            <a
              href="https://github.com/MaAbumusAb/classgpt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">View on GitHub</Button>
            </a>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">🗣️ Multilingual</h3>
              <p className="text-gray-600">
                Learn in English, Hausa, Arabic, and more languages to come.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">🤖 AI-Powered</h3>
              <p className="text-gray-600">
                Leverage advanced AI to get instant, accurate explanations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">📚 Educational</h3>
              <p className="text-gray-600">
                Designed specifically for learners at all levels.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
