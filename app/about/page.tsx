import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'About Me',
	description: 'About me.',
	keywords: 'about, me, bio, resume',
}

const AboutPage = () => {
	return (
		<div className='h-screen flex flex-col items-center mt-40'>
			<h1 className='text-4xl' >About Me Page</h1>
		</div>
	)
}

export default AboutPage