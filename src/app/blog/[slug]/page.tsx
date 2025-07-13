/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { Link } from 'react-transition-progress/next'
// import { Link } from 'next-view-transitions';
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar } from 'lucide-react'

import { CustomMDX } from '@/components/mdx/mdx'
import { getBlogs } from '@/lib/get-blogs'
import { formatDate } from '@/lib/server-utils'
// import ViewCounter from '@/components/views';
// import { getViewsCount } from '@/lib/get-views';
import Progress from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import SimilarPost, { SkeletonSimilarPost } from '@/components/SimilarPost'
import { Suspense } from 'react'

// import { increment } from '@/app/actions';

export async function generateStaticParams() {
  const blogs = await getBlogs()
  return blogs.map((blog) => ({ slug: blog.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const slug = (await params).slug
  const blogs = await getBlogs()
  const blog = blogs.find((post) => post.slug === slug)

  if (!blog) {
    return notFound()
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    tags,
  } = blog.metadata

  const ogImage = image
    ? `https://patelvivek.dev${image}`
    : `https://patelvivek.dev/og?title=${title}`

  return {
    title,
    metadataBase: new URL('https://patelvivek.dev/blog'),
    description,
    keywords: tags ? tags : [],
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Vivek Patel | patelvivek.dev',
      publishedTime,
      url: `https://patelvivek.dev/blog/${blog.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const blogs = await getBlogs()
  const blog = blogs.find((post) => post.slug === slug)

  if (!blog) {
    return notFound()
  }
  const publishedDate = await formatDate(blog.metadata.publishedAt!)

  return (
    <div className='flex flex-col gap-4 lg:flex-row'>
      <div className='mx-auto mt-16 w-11/12 flex-1 overflow-y-auto sm:mt-40'>
        <Progress />
        <div className='flex flex-col gap-4'>
          <Link href='/blog'>
            <Button
              variant='outline'
              className='mb-5 cursor-pointer border-neutral-800 text-lg font-semibold text-neutral-800 hover:border-indigo-700 hover:underline dark:border-neutral-300 dark:text-neutral-300 hover:dark:border-indigo-700'
            >
              &larr; Back to Blogs
            </Button>
          </Link>
          <h1 className='text-start text-2xl font-bold text-indigo-500 sm:text-4xl'>
            {blog.metadata.title}
          </h1>
          <h2 className='text-xl text-neutral-700 dark:text-neutral-300'>
            {blog.metadata.summary}
          </h2>
          <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
            <p className='text-base text-neutral-700 dark:text-neutral-300'>
              <span className='flex flex-row items-center gap-2'>
                <Calendar />
                {publishedDate}| {blog.readingTime}
              </span>
            </p>
            {/* <Suspense fallback={<p>----</p>}>
              <Views slug={blog.slug} />
              </Suspense> */}
          </div>
          <div className='mb-5 flex flex-row flex-wrap gap-4'>
            {blog.metadata.tags?.map((tag) => (
              <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                <Button
                  variant='outline'
                  className='cursor-pointer border-2 border-indigo-500 text-lg font-semibold hover:underline'
                >
                  {tag}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <article className='prose prose-zinc mx-auto my-10 max-w-none dark:prose-invert md:prose-lg lg:prose-xl'>
          <CustomMDX
            components={{
              img: RoundedImage,
            }}
          >
            {blog.content}
          </CustomMDX>
        </article>
      </div>
      <aside className='sticky top-16 mx-auto h-screen w-11/12 overflow-y-auto sm:top-40 md:w-1/4'>
        <Suspense fallback={<SkeletonSimilarPost />}>
          <SimilarPost slug={slug} content={blog.content} type='blog' />
        </Suspense>
      </aside>
    </div>
  )
}

// let incrementViews = cache(increment);

// async function Views({ slug }: { slug: string }) {
//   let views = await getViewsCount();
//   await incrementViews(slug);
//   return <ViewCounter allViews={views} slug={slug} />;
// }

function RoundedImage(props: any) {
  return (
    <Image
      alt={props.alt}
      className='mx-auto max-h-96 w-full rounded-lg object-cover object-left-top shadow-lg shadow-slate-800 dark:shadow-white'
      {...props}
      priority={true}
      width={props.width}
      height={props.height}
    />
  )
}
