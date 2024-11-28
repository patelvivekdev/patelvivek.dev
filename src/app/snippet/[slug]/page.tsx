import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';

import { CustomMDX } from '@/components/mdx/mdx';
import { getSnippets } from '@/lib/get-snippets';
// import ViewCounter from '@/components/views';
// import { getViewsCount } from '@/lib/get-views';
import Progress from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/server-utils';
// import { increment } from '@/app/actions';

export async function generateStaticParams() {
  const snippets = await getSnippets();
  return snippets.map((snippet) => ({ slug: snippet.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const slug = (await params).slug;
  const snippet = (await getSnippets()).find(
    (snippet) => snippet.slug === slug,
  );

  if (!snippet) {
    return notFound();
  }

  let {
    title,
    publishedAt: publishedTime,
    description,
    image,
    tags,
  } = snippet.metadata;

  let ogImage = image
    ? `https://patelvivek.dev${image}`
    : `https://patelvivek.dev/og?title=${title}`;

  return {
    metadataBase: new URL('https://patelvivek.dev/snippets'),
    title,
    description,
    keywords: tags ? tags : [],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://patelvivek.dev/snippets/${snippet.slug}`,
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
// function getDateTime(date: string) {
//   return new Date(date);
// }

export default async function Snippet({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const snippet = (await getSnippets()).find(
    (snippet) => snippet.slug === slug,
  );

  if (!snippet) {
    return notFound();
  }

  let publishedDate = await formatDate(snippet.metadata.publishedAt!);

  return (
    <div className='mx-auto mt-16 w-11/12 sm:mt-40'>
      <Progress />
      <div className='flex flex-col gap-4 border-b-4 border-neutral-800 dark:border-neutral-300'>
        <Link href='/snippet'>
          <Button
            variant='outline'
            className='mb-5 cursor-pointer border-neutral-800 text-lg font-semibold text-neutral-800 hover:border-indigo-700 hover:underline dark:border-neutral-300 dark:text-neutral-300 hover:dark:border-indigo-700'
          >
            &larr; Back to Snippets
          </Button>
        </Link>
        <h1 className='text-start text-2xl font-bold text-indigo-500 sm:text-4xl'>
          {snippet.metadata.title}
        </h1>
        <h2 className='text-xl text-neutral-700 dark:text-neutral-300'>
          {snippet.metadata.description}
        </h2>
        <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
          <p className='text-base text-neutral-700 dark:text-neutral-300'>
            <span className='flex flex-row items-center gap-2'>
              <Calendar />
              {publishedDate} | {snippet.readingTime}
            </span>
          </p>
          {/* <Suspense fallback={<p>----</p>}>
              <Views slug={snippet.slug} />
            </Suspense> */}
        </div>
        <div className='mb-5 flex flex-row flex-wrap gap-4'>
          {snippet.metadata.tags?.map((tag) => (
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
            RoundedImage: RoundedImage,
          }}
        >
          {snippet.content}
        </CustomMDX>
      </article>
    </div>
  );
}

// let incrementViews = cache(increment);

// async function Views({ slug }: { slug: string }) {
//   let views = await getViewsCount();
//   incrementViews(slug);
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
  );
}
