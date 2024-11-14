'use client';

import { useRownd } from '@rownd/next';
import Link from 'next/link';
import clsx from 'clsx';

export default function NavBar() {
  const { is_authenticated, user, requestSignIn, signOut, manageAccount, is_initializing } = useRownd();

  return (
    <nav className="bg-foreground/5 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link href="/" className="hover:text-foreground/80">Home</Link>
          <Link href="/dashboard" className="hover:text-foreground/80">Dashboard</Link>
        </div>
        <div className="flex items-center gap-4">
          {is_authenticated && (
            <>
              <span className="text-sm text-foreground/60">
                {user.data.email}
              </span>
              <button
                onClick={() => manageAccount()}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Profile
              </button>
            </>
          )}
          <button 
            onClick={() => is_authenticated ? signOut() : requestSignIn()}
            disabled={is_initializing}
            className={clsx(
              "text-white px-4 py-2 rounded transition-colors",
              {
                'bg-red-500 hover:bg-red-600': is_authenticated || is_initializing,
                'bg-blue-500 hover:bg-blue-600': !is_authenticated && !is_initializing
              }
            )}
          >
            {is_authenticated ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </div>
    </nav>
  );
} 