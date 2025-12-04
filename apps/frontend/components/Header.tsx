import Link from 'next/link';
import { Button } from '@classgpt/ui';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            📚 ClassGPT
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/chat">
            <Button variant="primary" size="sm">
              Chat
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  );
}
