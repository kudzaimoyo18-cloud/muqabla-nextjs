import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muqabla - AI-Powered Video Interviews',
  description: 'Find your dream job in GCC with intelligent matching, video profiles, and AI-powered insights. Like Instagram for jobs, with LinkedIn professionalism.',
  keywords: ['jobs', 'GCC', 'Dubai', 'AI', 'video interviews', 'matching', 'recruitment'],
  authors: [{ name: 'Muqabla' }],
  creator: 'Muqabla',
  publisher: 'Muqabla',
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL('https://muqabla.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muqabla.com',
    title: 'Muqabla - AI-Powered Video Interviews',
    description: 'Find your dream job with AI-powered matching',
    siteName: 'Muqabla',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muqabla - AI-Powered Video Interviews',
    description: 'Find your dream job with AI-powered matching',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-text`}>
        {children}
      </body>
    </html>
  );
}
