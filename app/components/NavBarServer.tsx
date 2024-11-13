import { getRowndUser } from '@rownd/next/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

export async function NavBarServer() {
  const user = await getRowndUser(cookies);
  const isAuthenticated = !!user?.data.user_id;

  return (
    <nav className="bg-foreground/5 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link href="/" className="hover:text-foreground/80">Home</Link>
          <Link href="/dashboard" className="hover:text-foreground/80">Dashboard</Link>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <span className="text-sm text-foreground/60">
              {user.data.email}
            </span>
          )}
          <button 
            className={`text-white px-4 py-2 rounded transition-colors ${
              isAuthenticated 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            data-auth-button
          >
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </div>
    </nav>
  );
}