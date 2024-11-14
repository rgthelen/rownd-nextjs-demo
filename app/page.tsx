import { NavBarServer } from './components/NavBarServer';

export const runtime = 'edge';

function FeatureCard({ title, icon, children }: { 
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
        {icon} {title}
      </h3>
      <div className="mt-2 text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <NavBarServer />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            Rownd + Next.js Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A production-ready authentication implementation using Rownd with Next.js, 
            Server Components, and Edge Runtime.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard title="Edge Runtime" icon="🌐">
            <p>Deployed on Cloudflare's global network for optimal performance and low latency worldwide.</p>
          </FeatureCard>
          
          <FeatureCard title="Server Components" icon="⚡">
            <p>Built with React Server Components for improved performance and reduced client-side JavaScript.</p>
          </FeatureCard>
          
          <FeatureCard title="Authentication" icon="🔒">
            <p>Secure authentication flow with protected routes and server-side session management.</p>
          </FeatureCard>
          
          <FeatureCard title="Type Safety" icon="🛡️">
            <p>Full TypeScript support with type-safe authentication hooks and user data handling.</p>
          </FeatureCard>
          
          <FeatureCard title="Dark Mode" icon="🌙">
            <p>Built-in dark mode support with consistent styling across all components.</p>
          </FeatureCard>
        </div>
      </main>
    </div>
  );
} 