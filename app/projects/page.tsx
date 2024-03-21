import type { Metadata } from 'next'
import { HoverEffect } from "@/components/ui/card-hover-effect";

export const metadata: Metadata = {
	title: 'All Projects',
	description: 'All projects I have worked on.',
	keywords: 'projects, work, portfolio',
}

const ProjectPage = () => {

	const projects = [
		{
			id: 1,
			title: 'Project 1',
			description: 'This is the first project.',
			image: {
				src: 'https://firebasestorage.googleapis.com/v0/b/vivek-0206.appspot.com/o/images%2Fdefault.png?alt=media&token=d917a346-35fd-4e33-ac34-3c725b6f2769',
				alt: 'Market-hub logo',
			},
			link: '/projects/1',
		},
		{
			id: 2,
			title: 'Project 2',
			description: 'This is the second project.',
			image: {
				src: 'https://firebasestorage.googleapis.com/v0/b/vivek-0206.appspot.com/o/images%2Fdefault.png?alt=media&token=d917a346-35fd-4e33-ac34-3c725b6f2769',
				alt: 'Market-hub logo',
			},
			link: '/projects/2',
		},
		{
			id: 3,
			title: 'Project 3',
			description: 'This is the third project.',
			image: {
				src: 'https://firebasestorage.googleapis.com/v0/b/vivek-0206.appspot.com/o/images%2Fdefault.png?alt=media&token=d917a346-35fd-4e33-ac34-3c725b6f2769',
				alt: 'Market-hub logo',
			},
			link: '/projects/3',
		},
		{
			id: 4,
			title: 'Project 4',
			description: 'This is the fourth project.',
			image: {
				src: 'https://firebasestorage.googleapis.com/v0/b/vivek-0206.appspot.com/o/images%2Fdefault.png?alt=media&token=d917a346-35fd-4e33-ac34-3c725b6f2769',
				alt: 'Market-hub logo',
			},
			link: '/projects/4',
		}
	]

	return (
		<div className='flex flex-col items-center mt-40'>
			<h1 className='text-4xl' >Projects</h1>
			<HoverEffect items={projects} />
		</div>
	)
}

export default ProjectPage