import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { getBlog } from '@/lib/get-blogs';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import ViewCounter from '@/app/blog/views';
import { getViewsCount } from '@/lib/get-views';
import { increment } from '@/app/actions';

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

export default async function Blog({ params }: { params: any }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return notFound();
  }

  return (
    <div className='mx-auto mt-40 w-4/5'>
      <section>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: blog.metadata.title,
              datePublished: blog.metadata.publishedAt,
              dateModified: blog.metadata.publishedAt,
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
        <h1 className='title text-center sm:text-start text-2xl font-medium tracking-tighter'>{blog.metadata.title}</h1>
        <div className='mb-4 mt-2 flex items-center justify-between text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            <span className='flex flex-row items-center gap-2'>{blog.metadata.summary}</span>
          </p>
        </div>
        <div className='mb-8 mt-2 flex items-center justify-between text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            <span className='flex flex-row items-center gap-2'>
              <Calendar /> {formatDate(blog.metadata.publishedAt)}
            </span>
          </p>
          <Suspense fallback={<Skeleton className='h-4 w-12 rounded-full bg-slate-300 dark:bg-slate-100' />}>
            <Views slug={blog.slug} />
          </Suspense>
        </div>
        <hr />
        <article className='prose prose-zinc mx-auto my-10 max-w-none dark:prose-invert md:prose-lg lg:prose-xl prose-a:text-black dark:prose-a:text-white prose-a:no-underline'>
          <CustomMDX>{blog.content}</CustomMDX>
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
