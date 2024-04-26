import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://patelvivek.dev'),
  title: {
    default: 'Vivek Patel',
    template: '%s | Vivek Patel',
  },
  description: 'Personal website of Vivek Patel.',
  openGraph: {
    title: 'Vivek Patel',
    description: 'Full Stack Developer, writer, and photographer.',
    url: 'https://patelvivek.dev',
    siteName: 'Vivek Patel',
    images: [
      {
        url: 'https://patelvivek.dev/og?title=Vivek%20Patel',
        width: 1200,
        height: 630,
        alt: 'Vivek Patel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Vivek Patel',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Script defer src='https://us.umami.is/script.js' data-website-id='aa7603cb-3e5d-474c-b1a5-f92e18751e5c' />
      </head>
      <body className={cn('mx-auto font-sans antialiased bg-neutral-100 dark:bg-neutral-900 ', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
          <Navbar />
          <main>{children}</main>
          <Analytics />
          <SpeedInsights />
          <Footer />
          <ScrollToTopButton />
          <Toaster position='top-right' />
        </ThemeProvider>
      </body>
    </html>
  );
}
