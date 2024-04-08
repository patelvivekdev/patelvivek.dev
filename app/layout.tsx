import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://patelvivek.dev'),
  title: 'Vivek Patel',
  description: 'Personal website of Vivek Patel.',
  openGraph: {
    title: 'Vivek Patel',
    description: 'Full Stack Developer, writer, and photographer.',
    url: 'https://patelvivek.dev',
    siteName: 'Vivek Patel',
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
      <body className={cn('mx-auto min-h-screen font-sans antialiased bg-EEEEEE dark:bg-[#222831] ', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true}>
          <Navbar />
          <main>{children}</main>
          <Analytics />
          <SpeedInsights />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
