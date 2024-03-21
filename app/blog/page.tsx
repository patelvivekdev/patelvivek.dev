import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'All Blogs',
	description: 'All blogs I have written.',
	keywords: 'blogs, writing, articles',
}

const BlogPage = () => {
	return (
		<div className='h-screen flex flex-col items-center mt-40'>
			<h1 className='text-4xl' >Blog Page</h1>
		</div>
	)
}

export default BlogPage