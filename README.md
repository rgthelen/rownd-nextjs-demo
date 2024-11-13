# Next.js + Rownd Authentication Demo

This project demonstrates how to implement authentication in a Next.js application using Rownd, deployed on Cloudflare Pages. It showcases server-side rendering, protected routes, and edge runtime capabilities.

## Features

- 🔐 Authentication with Rownd
- 🌐 Edge Runtime support
- 🛡️ Protected routes
- ⚡ Server-side rendering
- 📱 Responsive design
- 🔄 Automatic state management

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Rownd account and app key
- (Optional) Cloudflare account for deployment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/rownd-demo.git
cd rownd-demo
```

2. Install dependencies:
```bash
npm install
```
3. Get your Rownd app key from the [Rownd Dashboard](https://app.rownd.io).

4. Create a `.env.local` file with your Rownd app key:
```env
NEXT_PUBLIC_ROWND_APP_KEY=your_app_key_here
```
Note: Next.js requires environment variables that need to be accessible in the browser (client-side) to be prefixed with `NEXT_PUBLIC_`. This is why we use `NEXT_PUBLIC_ROWND_APP_KEY` instead of just `ROWND_APP_KEY`.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
rownd-demo/
├── app/
│   ├── components/         # Shared components
│   ├── dashboard/         # Protected dashboard page
│   ├── layout.tsx         # Root layout with Rownd provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── public/               # Static assets
└── middleware.ts        # Rownd authentication middleware
```

## Rownd Integration

### Setup

1. The Rownd provider is configured in `app/layout.tsx`:
```typescript
<RowndProvider appKey="your_app_key">
  {children}
</RowndProvider>
```

2. Protected routes use the `withRowndRequireSignIn` HOC:
```typescript
export default withRowndRequireSignIn(DashboardPage, cookies);
```

3. Middleware ensures authentication for specific routes:
```typescript
export const config = {
  matcher: [
    "/api/rownd-token-callback",
    '/dashboard/:path*',
  ]
};
```

### Key Features

- **Server Components**: Navigation and user profile are rendered server-side
- **Edge Runtime**: Pages run on Cloudflare's edge network
- **Protected Routes**: Automatic redirection for unauthenticated users
- **SSR**: Server-side rendering with authentication state

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to Cloudflare Pages

### Authentication Flow

1. Users click "Sign In" in the navigation
2. Rownd handles the authentication process
3. Upon success, the UI updates automatically
4. Protected routes become accessible
5. User data is available server-side via `getRowndUser`

## Deployment

### Cloudflare Pages

1. Install Wrangler:
```bash
npm i -g wrangler
```

2. Build and deploy:
```bash
npm run deploy
```

### Environment Variables

Required environment variables for deployment:
- `NEXT_PUBLIC_ROWND_APP_KEY`: Your Rownd app key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learn More

- [Rownd Documentation](https://docs.rownd.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages](https://pages.cloudflare.com)

## License

This project is licensed under the MIT License - see the LICENSE file for details.