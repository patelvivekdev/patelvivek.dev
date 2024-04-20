import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { getBlog } from '@/lib/get-blogs';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import { Calendar, Import } from 'lucide-react';
import ViewCounter from '@/app/blog/views';
import { getViewsCount } from '@/lib/get-views';
import { increment } from '@/app/actions';
import Image from 'next/image';
import Progress from '../../../components/ui/progress';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata | undefined> {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return notFound();
  }

  let { title, publishedAt: publishedTime, summary: description, image, tags } = blog.metadata;

  tags = tags ? tags.split(',') : [];

  let ogImage = image ? `https://patelvivek.dev${image}` : `https://patelvivek.dev/og?title=${title}`;

  return {
    title,
    description,
    keywords: tags,
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

export default async function Blog({ params }: { params: any }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return notFound();
  }

  return (
    <div className='mx-auto mt-40 w-11/12 sm:w-3/4'>
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
              datePublished: getDateTime(blog.metadata.publishedAt),
              dateModified: getDateTime(blog.metadata.updatedAt),
              description: blog.metadata.summary,
              image: blog.metadata.image
                ? `https://patelvivek.dev${blog.metadata.image}`
                : `https://patelvivek.dev/og?title=${blog.metadata.title}`,
              url: `https://patelvivek.dev/blog/${blog.slug}`,
              author: {
                '@type': 'Person',
                name: 'Vivek Patel',
                url: 'https://patelvivek.dev/about',
              },
            }),
          }}
        />
        <h1 className='text-center sm:text-start text-xl sm:text-4xl font-bold'>{blog.metadata.title}</h1>
        <div className='mb-4 mt-2 flex items-center justify-between'>
          <p className='text-lg text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>{blog.metadata.summary}</span>
          </p>
        </div>
        <div className='mb-8 mt-2 flex items-center justify-between'>
          <p className='text-base text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>
              <Calendar /> {formatDate(blog.metadata.publishedAt)} | {blog.readingTime}
            </span>
          </p>
          <Suspense fallback={<p>---</p>}>
            <Views slug={blog.slug} published={blog.metadata.published} />
          </Suspense>
        </div>
        <hr />
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

async function Views({ slug, published }: { slug: string; published: boolean }) {
  let views = await getViewsCount();
  if (published) {
    incrementViews(slug);
  }

  return <ViewCounter allViews={views} slug={slug} />;
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className={props.className} {...props} priority={true} />;
}
