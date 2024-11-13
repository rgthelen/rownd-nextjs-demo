import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RowndProvider } from '@rownd/next';
import { AuthButtonHandler } from './components/AuthButtonHandler';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rownd Demo App",
  description: "Demo app showing Rownd integration with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('Environment variables:', {
    NEXT_PUBLIC_ROWND_APP_KEY: process.env.NEXT_PUBLIC_ROWND_APP_KEY,
  });

  const rowndAppKey = process.env.NEXT_PUBLIC_ROWND_APP_KEY;

  if (!rowndAppKey) {
    console.error('NEXT_PUBLIC_ROWND_APP_KEY is not defined');
    return (
      <html lang="en">
        <body>
          <div className="p-4 bg-red-100 text-red-700">
            Error: NEXT_PUBLIC_ROWND_APP_KEY is not defined. 
            Please check your .env.local file.
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RowndProvider appKey={rowndAppKey}>
          <AuthButtonHandler />
          {children}
        </RowndProvider>
      </body>
    </html>
  );
}