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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RowndProvider appKey="key_jujf27ehwpeq41po66xogr5h">
          <AuthButtonHandler />
          {children}
        </RowndProvider>
      </body>
    </html>
  );
}