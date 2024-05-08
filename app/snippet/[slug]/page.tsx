import type { Metadata } from 'next';
import { Suspense, cache } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';

import { CustomMDX } from '@/components/mdx/mdx';
import { getSnippets } from '@/lib/get-snippets';
import { formatDate } from '@/lib/utils';
import ViewCounter from '@/app/blog/views';
import { getViewsCount } from '@/lib/get-views';
import Progress from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { increment } from '@/app/actions';

// export function generateStaticParams() {
//   const snippets = getSnippets();
//   return snippets.map((snippet) => ({ slug: snippet.slug }));
// }

export async function generateMetadata({ params }: { params: any }): Promise<Metadata | undefined> {
  const snippet = getSnippets().find((snippet) => snippet.slug === params.slug);

  if (!snippet) {
    return notFound();
  }

  let { title, publishedAt: publishedTime, description, image, tags } = snippet.metadata;

  let ogImage = image ? `https://patelvivek.dev${image}` : `https://patelvivek.dev/og?title=${title}`;

  return {
    title,
    description,
    keywords: tags ? tags : [],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://patelvivek.dev/blog/${snippet.slug}`,
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
  const snippet = getSnippets().find((snippet) => snippet.slug === params.slug);

  if (!snippet) {
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
              headline: snippet.metadata.title,
              datePublished: getDateTime(snippet.metadata.publishedAt!),
              dateModified: getDateTime(snippet.metadata.publishedAt!),
              description: snippet.metadata.description!,
              image: snippet.metadata.image
                ? `https://patelvivek.dev${snippet.metadata.image}`
                : `https://patelvivek.dev/og?title=${snippet.metadata.title}`,
              url: `https://patelvivek.dev/snippet/${snippet.slug}`,
              author: {
                '@type': 'Person',
                name: 'Vivek Patel',
                url: 'https://patelvivek.dev/',
              },
            }),
          }}
        />
        <div className='flex flex-col gap-4 border-b-4 border-neutral-800 dark:border-neutral-300'>
          <Link href='/snippet'>
            <Button
              variant='outline'
              className='
                mb-5 cursor-pointer text-lg font-semibold 
                border-neutral-800 text-neutral-800 hover:underline
                dark:border-neutral-300 dark:text-neutral-300
                hover:border-indigo-700 hover:dark:border-indigo-700'
            >
              &larr; Back to Snippets
            </Button>
          </Link>
          <h1 className='text-start text-indigo-500 text-2xl sm:text-4xl font-bold'>{snippet.metadata.title}</h1>
          <h2 className='text-xl text-neutral-700 dark:text-neutral-300'>{snippet.metadata.description}</h2>
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
                  <Calendar /> {formatDate(snippet.metadata.publishedAt!)} | {snippet.readingTime}
                </Suspense>
              </span>
            </p>
            <Suspense fallback={<p>----</p>}>
              <Views slug={snippet.slug} />
            </Suspense>
          </div>
          <div className='flex flex-row flex-wrap gap-4 mb-5'>
            {snippet.metadata.tags?.map((tag) => (
              <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                <Button
                  variant='outline'
                  className='cursor-pointer text-lg font-semibold border-2 border-indigo-500 hover:underline'
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
              RoundedImage: RoundedImage,
            }}
          >
            {snippet.content}
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
  return (
    <Image
      alt={props.alt}
      className='rounded-lg shadow-lg dark:shadow-white shadow-slate-800 mx-auto'
      {...props}
      priority={true}
      width={props.width}
      height={props.height}
    />
  );
}
