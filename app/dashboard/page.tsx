import { withRowndRequireSignIn } from '@rownd/next';
import { getRowndUser } from '@rownd/next/server';
import { getRowndAccessToken } from '@rownd/next/server';
import { cookies } from 'next/headers';
import { NavBarServer } from '../components/NavBarServer';
import Link from 'next/link';

export const runtime = "edge";

function InfoCard({ title, value, description }: { 
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white break-all">{value}</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}

async function DashboardPage() {
  const user = await getRowndUser(cookies);
  const accessToken = await getRowndAccessToken(cookies);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <NavBarServer />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Protected Dashboard
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <InfoCard
            title="User ID"
            value={user?.data.user_id || 'Not available'}
            description="Your unique identifier in the system"
          />
          <InfoCard
            title="Email"
            value={user?.data.email || 'Not provided'}
            description="Your registered email address"
          />
        </div>

        {/* JWT Token section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Current JWT Token
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            This is your current JWT (JSON Web Token) used for authentication. Click inspect to view the decoded token data.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex justify-end items-center mb-2">
              <a
                href={`https://jwt.is/?value=${accessToken || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Inspect token
              </a>
            </div>
            <div className="overflow-x-auto">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all font-mono">
                {accessToken|| "No token available"}
              </pre>
            </div>
          </div>
        </div>

        {/* Raw Data section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            User Data
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>

        {/* How it Works section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How it Works
          </h2>
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <div className="grid gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">🌐 Edge Runtime</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Page runs on Cloudflare's edge network for faster response times worldwide
                </p>
                <pre className="mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm">
                  {`export const runtime = "edge";  // Enable edge runtime`}
                </pre>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">🔒 Server-Side Authentication</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  User data is fetched securely on the server using cookies, ensuring protected data remains private
                </p>
                <pre className="mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm">
                  {`async function DashboardPage() {
  const user = await getRowndUser(cookies);
  // Access user data securely
  const userId = user?.data.user_id;
  const email = user?.data.email;
}`}
                </pre>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">🛡️ Protected Route</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Automatically redirects unauthenticated users and shows loading states during auth checks
                </p>
                <pre className="mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm">
                  {`// Protect the entire page
export default withRowndRequireSignIn(DashboardPage, cookies, () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-lg">Loading...</div>
  </div>
));`}
                </pre>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">⚡ Server Components</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Navigation and user profile are rendered server-side for better performance and security
                </p>
                <pre className="mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm">
                  {`// Server component with type-safe user data
function InfoCard({ title, value, description }: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-6">
      <h3>{title}</h3>
      <p>{value}</p>
      <p>{description}</p>
    </div>
  );}`}
                </pre>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">📚 Additional Features</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Rownd provides additional features like account management and sign-out functionality:
                </p>
                <pre className="mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm">
                  {`// Client-side authentication hooks
const { signOut, manageAccount } = useRownd();

// Handle sign-out
<button onClick={signOut}>
  Sign out
</button>

// Open account management
<button onClick={manageAccount}>
  Manage Account
</button>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRowndRequireSignIn(DashboardPage, cookies, () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
    <div className="text-lg text-gray-700 dark:text-gray-300">Loading...</div>
  </div>
)); 