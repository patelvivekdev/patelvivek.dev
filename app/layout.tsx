import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'


export const metadata: Metadata = {
	title: 'Patel Vivek',
	description: 'Personal website of Patel Vivek.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' >
			<body className="bg-white dark:bg-black">
				<ThemeProvider attribute="class" defaultTheme="system">
					<Navbar />
					<main>
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
