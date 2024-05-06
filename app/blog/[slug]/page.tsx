import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';

import { CustomMDX } from '@/components/mdx/mdx';
import { getBlogs } from '@/lib/get-blogs';
import { formatDate } from '@/lib/utils';
import ViewCounter from '@/app/blog/views';
import { getViewsCount } from '@/lib/get-views';
import Progress from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { increment } from '@/app/actions';

// export function generateStaticParams() {
//   const blogs = getBlogs();
//   return blogs.map((blog) => ({ slug: blog.slug }));
// }

export async function generateMetadata({ params }: { params: any }): Promise<Metadata | undefined> {
  const blog = getBlogs().find((post) => post.slug === params.slug);

  if (!blog) {
    return notFound();
  }

  let { title, publishedAt: publishedTime, summary: description, image, tags } = blog.metadata;

  const newTags = tags ? tags.split(',') : [];

  let ogImage = image ? `https://patelvivek.dev${image}` : `https://patelvivek.dev/og?title=${title}`;

  return {
    title,
    description,
    keywords: newTags,
    openGraph: {
      title,
      description,
      type: 'article',
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
  };
}

// function to convert date from April 6, 2024 dateTime - 2024-04-06T08:00:00+08:00
function getDateTime(date: string) {
  return new Date(date);
}

export default function Blog({ params }: { params: any }) {
  const blog = getBlogs().find((post) => post.slug === params.slug);

  if (!blog) {
    return notFound();
  }

  return (
    <div className='mx-auto mt-16 sm:mt-40 w-11/12 sm:w-3/4'>
      <Progress />
      <section>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: blog.metadata.title,
              datePublished: getDateTime(blog.metadata.publishedAt!),
              dateModified: getDateTime(blog.metadata.publishedAt!),
              description: blog.metadata.summary!,
              image: blog.metadata.image
                ? `https://patelvivek.dev${blog.metadata.image}`
                : `https://patelvivek.dev/og?title=${blog.metadata.title}`,
              url: `https://patelvivek.dev/blog/${blog.slug}`,
              author: {
                '@type': 'Person',
                name: 'Vivek Patel',
                url: 'https://patelvivek.dev/',
              },
            }),
          }}
        />
        <div className='flex flex-col gap-4'>
          <Link href='/blog'>
            <Button
              variant='outline'
              className='
            mb-5 cursor-pointer text-lg font-semibold 
            border-neutral-800 text-neutral-800 hover:underline
            dark:border-neutral-300 dark:text-neutral-300'
            >
              &larr; Back to Blogs
            </Button>
          </Link>
          <h1 className='text-start text-2xl sm:text-4xl font-bold'>{blog.metadata.title}</h1>
          <h2 className='text-xl text-neutral-700 dark:text-neutral-300'>{blog.metadata.summary}</h2>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center justify-between'>
            <p className='text-base text-neutral-700 dark:text-neutral-300'>
              <span className='flex flex-row items-center gap-2'>
                <Suspense
                  fallback={
                    <>
                      <Calendar />
                      <p>---</p>
                    </>
                  }
                >
                  <Calendar /> {formatDate(blog.metadata.publishedAt!)} | {blog.readingTime}
                </Suspense>
              </span>
            </p>
            <Suspense fallback={<p>----</p>}>
              <Views slug={blog.slug} />
            </Suspense>
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
      </section>
    </div>
  );
}

let incrementViews = cache(increment);

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  incrementViews(slug);
  return <ViewCounter allViews={views} slug={slug} />;
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className={props.className} {...props} priority={true} />;
}
