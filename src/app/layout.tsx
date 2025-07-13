import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { ThemeToggle } from '@/components/ThemeToggle'
// import { ViewTransitions } from 'next-view-transitions';
import { ProgressBar, ProgressBarProvider } from 'react-transition-progress'
import { Toaster } from '@/components/ui/sonner'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <ViewTransitions>
    <html lang='en' suppressHydrationWarning>
      <head>
        {process.env.APP_ENV !== 'development' && (
          <Script
            defer
            src='https://us.umami.is/script.js'
            data-website-id='aa7603cb-3e5d-474c-b1a5-f92e18751e5c'
          />
        )}
      </head>
      <body
        className={cn(
          'mx-auto bg-neutral-100 font-sans antialiased dark:bg-neutral-900',
          fontSans.variable,
        )}
      >
        <ProgressBarProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem={true}
            disableTransitionOnChange
            scriptProps={{ 'data-cfasync': 'false' }}
          >
            <ProgressBar className='fixed top-0 h-1 bg-sky-500 shadow-lg shadow-sky-500/20' />
            <Navbar />
            <main className='mx-auto max-w-6xl'>
              {children}
              <ScrollToTopButton />
              <ThemeToggle />
              <Toaster />
              <Footer />
            </main>
            {process.env.APP_ENV !== 'development' && (
              <>
                <Analytics />
                <SpeedInsights />
              </>
            )}
          </ThemeProvider>
        </ProgressBarProvider>
      </body>
    </html>
    // </ViewTransitions>
  )
}
