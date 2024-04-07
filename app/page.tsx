import BlogPost from '@/components/BlogPost';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getLatestBlogs } from '@/lib/get-blogs';

export default async function Home() {
  const blogs = await getLatestBlogs();

  return (
    <div className='relative flex w-full  text-[#31363F] dark:text-[#EEEEEE]  flex-col items-center gap-3 bg-dot-black/[0.8] dark:bg-dot-white/[0.5] sm:gap-5'>
      {/* <div className="absolute pointer-events-none inset-0 flex items-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div> */}
      <Hero />
      <h3 className='text-center text-2xl font-bold tracking-tight md:text-4xl'>
        Latest Project
        <hr />
      </h3>
      <div className='grid w-4/5 grid-cols-1 gap-4 p-5 sm:p-10'>
        <ProjectCard
          title='Market-hub'
          description="Market-hub is a MERN-powered platform for buying and selling computer items. Vendors can easily manage their products, while users enjoy a smooth shopping experience. It's a user-friendly solution for tech enthusiasts and sellers alike."
          link='projects/market-hub'
          tags={['MERN', 'React', 'Nodejs', 'Express', 'MongoDB', 'FullStack']}
        />
        <ProjectCard
          title='Acme Auth'
          description='Acme Auth is a learning project focused on integrating third-party authentication APIs. It covers registration, login, logout, password recovery, and email verification. With a responsive design and efficient routing, it showcases modern web development practices using Next.js server actions and Tailwind CSS. '
          link='projects/acme-auth'
          tags={[
            'Nextjs',
            'AppRouter',
            'ShadcnUI',
            'TailwindCSS',
            'Authentication',
            'FreeAPI',
            'RESTAPI',
            'ServerActions',
            'TypeScript',
          ]}
        />
      </div>

      <Link href='/projects'>
        <Button
          variant='outline'
          className='
          mb-5 cursor-pointer text-lg font-semibold 
          border-gray-500  bg-gray-300 text-gray-800 hover:bg-gray-600 hover:text-gray-300 
          dark:border-gray-500 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-200'
        >
          View all projects &rarr;
        </Button>
      </Link>

      {/* Most viewed Blogs */}
      <h3 className='text-center text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl'>
        Recent Blog
        <hr />
      </h3>
      <div className='grid w-4/5 grid-cols-1 gap-4 p-5 sm:p-10'>
        {/* Show no blogs if there are no blogs */}

        {blogs.length === 0 ? (
          <p className='bg-gradient-to-b from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-center text-xl text-transparent'>
            No blogs found
          </p>
        ) : (
          blogs.map((blog) => (
            <BlogPost
              key={blog.slug}
              title={blog.metadata.title}
              summary={blog.metadata.summary}
              publishedAt={blog.metadata.publishedAt}
              slug={blog.slug}
              tags={blog.metadata.tags}
            />
          ))
        )}
      </div>

      <Link href='/blog'>
        <Button
          variant='outline'
          className='
          mb-5 cursor-pointer text-lg font-semibold 
          border-gray-500  bg-gray-300 text-gray-800 hover:bg-gray-600 hover:text-gray-300 
          dark:border-gray-500 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-200'
        >
          View all Blogs &rarr;
        </Button>
      </Link>
    </div>
  );
}
