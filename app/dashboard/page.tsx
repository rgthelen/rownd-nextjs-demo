import { withRowndRequireSignIn } from '@rownd/next';
import { getRowndUser } from '@rownd/next/server';
import { cookies } from 'next/headers';
import { NavBarServer } from '../components/NavBarServer';

//for Cloudflare Pages
export const runtime = "edge";

async function DashboardPage() {
  const user = await getRowndUser(cookies);
  
  return (
    <div>
      <NavBarServer />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Protected Dashboard</h1>
        <div className="grid gap-6">
          <div className="bg-foreground/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">How It Works</h2>
            <div className="space-y-4 text-sm text-foreground/80">
              <p>
                This dashboard demonstrates server-side authentication and rendering using Rownd in Next.js:
              </p>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-bold">🌐 Edge Runtime</h3>
                  <p>Page runs on Cloudflare's edge network for faster response times</p>
                </div>
                <div>
                  <h3 className="font-bold">🔒 Server-Side Authentication</h3>
                  <p>User data is fetched securely on the server using cookies, ensuring protected data remains private</p>
                </div>
                <div>
                  <h3 className="font-bold">🛡️ Protected Route</h3>
                  <p>Automatically redirects unauthenticated users and shows loading states during auth checks</p>
                </div>
                <div>
                  <h3 className="font-bold">⚡ Server Components</h3>
                  <p>Navigation and user profile are rendered server-side for better performance</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-foreground/5 p-6 rounded-lg">
            <h2 className="text-xl mb-4">User Profile</h2>
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-foreground/60">Email</label>
                <div className="font-mono">{user?.data.email || 'Not provided'}</div>
              </div>
              <div>
                <label className="text-sm text-foreground/60">User ID</label>
                <div className="font-mono">{user?.data.user_id || 'Not available'}</div>
              </div>
              <div>
                <label className="text-sm text-foreground/60">Raw Data</label>
                <pre className="bg-background p-4 rounded overflow-auto text-sm">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRowndRequireSignIn(DashboardPage, cookies, () => <div>Loading...</div>); 