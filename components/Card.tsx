import Image from 'next/image'
import Link from 'next/link'

const Card = ({
	title,
	description,
	image,
	link
}: {
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
	};
	link: string;
}) => {
	return (
		<div className="rounded-2xl max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20">
			<div className="z-50">
				<Link href={link}>
					<Image
						src={image.src}
						alt={image.alt}
						width={800}
						height={533}
						className="rounded-t-lg"
						priority={true}
					/>
				</Link>
				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{title}
					</h5>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{description}
					</p>
					<Link href={link} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Read more
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Card