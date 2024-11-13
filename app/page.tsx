import { NavBarServer } from './components/NavBarServer';

export const runtime = 'edge'; 

export default function Home() {
  return (
    <div>
      <NavBarServer />
      <main className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Rownd + Next.js Demo</h1>
          <p className="text-xl text-foreground/80">
            Simple authentication demo showing Rownd integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-foreground/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Simple authentication flow</li>
              <li>Protected routes</li>
              <li>Server-side rendering support</li>
              <li>User profile access</li>
            </ul>
          </div>
          
          <div className="bg-foreground/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Try it out</h2>
            <p className="mb-4">
              Click the Sign In button in the navigation to get started.
              Once authenticated, you can access the dashboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 